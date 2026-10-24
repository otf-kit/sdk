#!/usr/bin/env node
// build-ui-slugs.mjs — per-slug shadcn items for the public, free @otfdashkit/ui components (OTFDA-958 E23).
//
// Scope (Mira's rulings, 24 Oct): only slugs listed in ui-slugs.json. Each slug maps to one source file in the
// published @otfdashkit/ui tarball (UI_VERSION below), chosen by the package's root export (or by an exact export
// name match). File contents come only from that tarball, plus the relative imports that file needs (its closure),
// and a folder component's index.ts. Any note in the list is copied into the item's meta. Other slugs 404.
// ui-native is out of scope, and so is the existing shockwave entry, which stays untouched in the manifest.
//
//   node scripts/build-ui-slugs.mjs <dist-dir> [ui-slugs.json]
//
// Writes dist/components/<slug>/<files> (raw source), dist/<slug>.json (shadcn registry item), and merges the
// in-scope slugs into dist/registry.json next to the existing shockwave entry. Exits non-zero on any mismatch.

import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, dirname, join, normalize, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const UI_VERSION = '0.1.12'
const PACKAGE = '@otfdashkit/ui'
const SHOCKWAVE = 'shockwave'

const [, , distArg, slugsArg] = process.argv
if (!distArg) {
  console.error('usage: build-ui-slugs.mjs <dist-dir> [ui-slugs.json]')
  process.exit(2)
}
const dist = resolve(distArg)
const slugsFile = resolve(slugsArg ?? join(dirname(fileURLToPath(import.meta.url)), 'ui-slugs.json'))

const RELATIVE = /(?:from|import)\s*\(?\s*['"](\.{1,2}\/[^'"]+)['"]/g
const EXTERNAL = /(?:from|import)\s*\(?\s*['"]((?:@[^'"/]+\/)?[^'"./][^'"]*)['"]/g

function isFile(p) {
  return existsSync(p) && statSync(p).isFile()
}

function resolveImport(fromFile, spec) {
  const base = normalize(join(dirname(fromFile), spec))
  const candidates = [`${base}.tsx`, `${base}.ts`, join(base, 'index.tsx'), join(base, 'index.ts'), base]
  return candidates.find(isFile) ?? null
}

// Walks the relative-import closure of one source file. Returns the absolute files, or throws on an unresolved import.
function closureOf(entryFile) {
  const seen = new Set()
  const stack = [entryFile]
  const externals = new Set()
  while (stack.length) {
    const file = stack.pop()
    if (seen.has(file)) continue
    seen.add(file)
    const text = readFileSync(file, 'utf8')
    for (const [, spec] of text.matchAll(EXTERNAL)) {
      if (spec.startsWith('.')) continue
      externals.add(spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0])
    }
    for (const [, spec] of text.matchAll(RELATIVE)) {
      const next = resolveImport(file, spec)
      if (!next) throw new Error(`unresolved import "${spec}" in ${relative(process.cwd(), file)}`)
      stack.push(next)
    }
  }
  return { files: [...seen].sort(), externals: [...externals].sort() }
}

function main() {
  const work = mkdtempSync(join(tmpdir(), 'ui-slugs-'))
  try {
    build(work)
  } finally {
    // The npm pack tarball and its extracted package are scratch: remove them whether or not the build passed.
    rmSync(work, { recursive: true, force: true })
  }
}

function build(work) {
  const slugs = JSON.parse(readFileSync(slugsFile, 'utf8'))
  const tgzName = execFileSync('npm', ['pack', `${PACKAGE}@${UI_VERSION}`, '--pack-destination', work], {
    encoding: 'utf8',
  }).trim().split('\n').pop()
  execFileSync('tar', ['xzf', join(work, tgzName), '-C', work])
  const pkgRoot = join(work, 'package')
  const srcRoot = join(pkgRoot, 'src')

  const manifestPath = join(dist, 'registry.json')
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  const components = manifest.components ?? {}
  if (!components[SHOCKWAVE]) throw new Error('existing shockwave entry missing from registry.json')

  // Dependencies. A bare name takes npm's latest, so a shadcn install takes the consumer's own versions, with these rules:
  //  - react and react-dom are host-provided peers. Emitting them would pin the consumer's React (P1, #1055 review).
  //  - @tanstack/react-table is pinned to the v8 major: v9 drops useReactTable, which data-table and data-grid use.
  //  - @hookform/resolvers is pinned to the v5 major that ui 0.1.12 declares (^5.2.2). Bare, npm takes 6.0.0, which
  //    fails the buyer's peer check (#1055 review, approved by Mira 24 Oct).
  //  - Any other bare name whose latest is a major ahead of the range ui 0.1.12 declares (a minor ahead for a 0.x range)
  //    emits that declared range verbatim: the version set the components were built and tested against (Mira, 24 Oct).
  // The check: the locked part of every pin (its major, or major.minor for 0.x) must equal the one ui declares, or the
  // build fails. A bare name is emitted only when its latest has the declared locked part, so it cannot resolve past it.
  // Any spec that is not a plain name or a caret range fails the build: the CLI prints these unquoted.
  const HOST_PEERS = new Set(['react', 'react-dom'])
  const MAJOR_PINS = { '@tanstack/react-table': '^8', '@hookform/resolvers': '^5' }
  // Tested bare (Mira, 24 Oct, decision c): ui 0.1.12 renders, type-checks and class-merges the same against these majors
  // as against the ones it declares (OTFDA-958 test). They emit bare, so the buyer's install resolves the latest. A newer
  // major than these fails the build until ui is tested against it, then this map is raised.
  const TESTED_MAJOR = { 'lucide-react': 1, 'tailwind-merge': 3 }
  const SAFE = /^(@[a-z0-9-]+\/)?[a-z0-9._-]+(@\^\d+(\.\d+){0,2})?$/
  const UI_DECLARED = JSON.parse(readFileSync(join(pkgRoot, 'package.json'), 'utf8')).dependencies ?? {}
  const bareVersion = (range) => range.replace(/^\^/, '')
  const locked = (version) => {
    const parts = version.split('.')
    return Number(parts[0]) === 0 ? parts.slice(0, 2).join('.') : parts[0]
  }
  const latestMemo = new Map()
  const latestOf = (name) => {
    if (!latestMemo.has(name)) {
      latestMemo.set(name, execFileSync('npm', ['view', name, 'dist-tags.latest'], { encoding: 'utf8' }).trim())
    }
    return latestMemo.get(name)
  }
  const withRanges = (names) =>
    names
      .filter((n) => !HOST_PEERS.has(n))
      .map((n) => {
        const range = UI_DECLARED[n]
        if (!range || !/^\^\d/.test(range)) throw new Error(`${n} has no caret range in ${PACKAGE}@${UI_VERSION}`)
        const declared = bareVersion(range)
        let spec
        if (n in TESTED_MAJOR) {
          const latest = latestOf(n)
          if (Number(latest.split('.')[0]) > TESTED_MAJOR[n]) {
            throw new Error(`${n} latest ${latest} is past the tested major ${TESTED_MAJOR[n]}: test ${PACKAGE}@${UI_VERSION} against it, then raise TESTED_MAJOR`)
          }
          spec = n
        } else if (MAJOR_PINS[n]) {
          spec = `${n}@${MAJOR_PINS[n]}`
          if (locked(bareVersion(MAJOR_PINS[n])) !== locked(declared)) {
            throw new Error(`pin ${spec} does not match the ${range} that ${PACKAGE}@${UI_VERSION} declares`)
          }
        } else if (locked(latestOf(n)) === locked(declared)) {
          spec = n
        } else {
          spec = `${n}@${range}`
        }
        if (!SAFE.test(spec)) throw new Error(`dependency spec "${spec}" is not a plain name or a caret range`)
        return spec
      })

  let count = 0
  for (const entry of slugs) {
    const { slug, category, description, source, note } = entry
    const entryFile = join(pkgRoot, source)
    if (!isFile(entryFile)) throw new Error(`${slug}: ${source} is not in ${PACKAGE}@${UI_VERSION}`)
    const { files: ownFiles, externals: ownExternals } = closureOf(entryFile)
    let files = ownFiles
    let externals = ownExternals
    // A folder component (X/X.tsx) also ships its folder's index.ts, the barrel the package's exports go through.
    const folderName = basename(dirname(entryFile))
    if (basename(entryFile).replace(/\.(tsx|ts)$/, '') === folderName) {
      const barrel = ['index.ts', 'index.tsx'].map((n) => join(dirname(entryFile), n)).find(isFile)
      if (barrel) {
        const extra = closureOf(barrel)
        files = [...new Set([...files, ...extra.files])].sort()
        externals = [...new Set([...externals, ...extra.externals])].sort()
      }
    }
    const rels = files.map((f) => relative(srcRoot, f))
    if (rels.some((r) => r.startsWith('..'))) throw new Error(`${slug}: an import leaves src/`)

    const folder = join(dist, 'components', slug)
    const items = []
    for (const abs of files) {
      const rel = relative(srcRoot, abs)
      const dest = join(folder, rel)
      mkdirSync(dirname(dest), { recursive: true })
      copyFileSync(abs, dest)
      items.push({ path: `components/${slug}/${rel}`, type: 'registry:component', content: readFileSync(abs, 'utf8') })
    }

    const item = {
      $schema: 'https://ui.shadcn.com/schema/registry-item.json',
      name: slug,
      type: 'registry:component',
      description,
      dependencies: withRanges(externals),
      registryDependencies: [],
      files: items,
      meta: { package: PACKAGE, version: UI_VERSION, license: 'MIT', source, ...(note ? { note } : {}) },
    }
    writeFileSync(join(dist, `${slug}.json`), `${JSON.stringify(item, null, 2)}\n`)

    components[slug] = {
      name: slug,
      category,
      description,
      path: `components/${slug}`,
      folders: [],
      files: rels,
      dependencies: withRanges(externals),
      registryDependencies: [],
      platform: 'web-only',
    }
    count += 1
  }

  manifest.components = components
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`✓ ${count} per-slug items from ${PACKAGE}@${UI_VERSION}; registry.json lists ${Object.keys(components).length} (incl. ${SHOCKWAVE})`)
}

main()
