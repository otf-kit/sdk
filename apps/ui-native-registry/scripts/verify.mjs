#!/usr/bin/env node
// verify.mjs — sanity-check that every file declared in registry.json
// actually exists in the built dist/ tree. Catches typos in component
// `files` arrays before they reach Cloudflare.

import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

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
