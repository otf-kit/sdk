#!/usr/bin/env node
// verify.mjs — sanity-check that every file declared in registry.json
// actually exists in the built dist/ tree. Catches typos in component
// `files` arrays before they reach Cloudflare.

import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = resolve(process.argv[2] ?? './dist')
const manifestPath = join(dist, 'registry.json')

if (!existsSync(manifestPath)) {
  console.error(`✘ registry.json missing at ${manifestPath}`)
  process.exit(1)
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
let missing = 0
let checked = 0

for (const [name, component] of Object.entries(manifest.components ?? {})) {
  for (const file of component.files ?? []) {
    const fullPath = join(dist, component.path, file)
    if (!existsSync(fullPath)) {
      console.error(`✘ ${name}: missing file ${component.path}/${file}`)
      missing++
    }
    checked++
  }
}

if (missing > 0) {
  console.error(`\n✘ ${missing} of ${checked} registry files missing in dist/. Refusing to deploy.`)
  process.exit(1)
}
console.log(`✓ All ${checked} registry-declared files present in dist/.`)

// E23: the per-slug items. Every slug in ui-slugs.json must have a valid <slug>.json, and registry.json may list only
// those slugs plus the existing shockwave entry.
const slugsPath = join(dirname(fileURLToPath(import.meta.url)), 'ui-slugs.json')
const slugs = JSON.parse(readFileSync(slugsPath, 'utf8')).map((e) => e.slug)
const listed = new Set(Object.keys(manifest.components ?? {}))
const allowed = new Set([...slugs, 'shockwave'])
let itemProblems = 0
for (const slug of slugs) {
  const itemPath = join(dist, `${slug}.json`)
  if (!existsSync(itemPath)) {
    console.error(`✘ ${slug}: missing ${slug}.json`)
    itemProblems++
    continue
  }
  try {
    const item = JSON.parse(readFileSync(itemPath, 'utf8'))
    if (item.name !== slug || !Array.isArray(item.files) || item.files.length === 0) throw new Error('bad shape')
    for (const f of item.files) if (typeof f.content !== 'string') throw new Error(`no content for ${f.path}`)
    // Drift: the item must agree with its manifest entry, file for file and dependency for dependency.
    const entry = manifest.components?.[slug]
    const itemFiles = item.files.map((f) => f.path.replace(`components/${slug}/`, '')).sort()
    if (!entry || JSON.stringify([...entry.files].sort()) !== JSON.stringify(itemFiles)) {
      throw new Error('files differ from the manifest entry')
    }
    if (JSON.stringify(entry.dependencies) !== JSON.stringify(item.dependencies)) {
      throw new Error('dependencies differ from the manifest entry')
    }
    for (const dep of item.dependencies) {
      if (/^(react|react-dom)(@|$)/.test(dep)) throw new Error(`host peer ${dep} must not be emitted`)
    }
  } catch (err) {
    console.error(`✘ ${slug}: ${slug}.json is not a valid item (${err.message})`)
    itemProblems++
  }
  if (!listed.has(slug)) {
    console.error(`✘ ${slug}: in ui-slugs.json but not listed in registry.json`)
    itemProblems++
  }
}
for (const name of listed) {
  if (!allowed.has(name)) {
    console.error(`✘ registry.json lists ${name}, which is outside the E23 scope`)
    itemProblems++
  }
}
// The existing shockwave entry must stay, and the root may hold only the in-scope items plus registry.json.
if (!listed.has('shockwave')) {
  console.error('✘ registry.json lost the shockwave entry')
  itemProblems++
}
// The shockwave entry must be exactly the source registry's. build.sh passes that file as the second argument.
const sourceRegistry = process.argv[3] ? resolve(process.argv[3]) : null
if (sourceRegistry) {
  const source = JSON.parse(readFileSync(sourceRegistry, 'utf8')).components?.shockwave
  if (JSON.stringify(source) !== JSON.stringify(manifest.components?.shockwave)) {
    console.error('✘ the shockwave entry differs from the source registry')
    itemProblems++
  }
} else {
  console.error('✘ no source registry given: the shockwave entry cannot be compared')
  itemProblems++
}
const rootJson = readdirSync(dist).filter((f) => f.endsWith('.json'))
for (const f of rootJson) {
  const name = f.slice(0, -'.json'.length)
  if (f !== 'registry.json' && !allowed.has(name)) {
    console.error(`✘ ${f} is an extra root item outside the E23 scope`)
    itemProblems++
  }
}
if (itemProblems > 0) {
  console.error(`\n✘ ${itemProblems} per-slug item problem(s). Refusing to deploy.`)
  process.exit(1)
}
console.log(`✓ ${slugs.length} per-slug items valid; registry.json lists exactly these plus shockwave.`)
