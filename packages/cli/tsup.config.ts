import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'node18',
  outDir: 'dist',
  clean: true,
  dts: false,
  splitting: false,
  sourcemap: false,
  minify: false,
  shims: true,
  // Keep CLI deps external — they're declared in package.json#dependencies,
  // so npm resolves them at install time. Bundling them would force users to
  // upgrade alongside our pinned versions (and would balloon the published
  // tarball for no benefit).
  external: ['commander', 'chalk', 'ora', 'prompts', 'fs-extra'],
  banner: {
    js: '#!/usr/bin/env node',
  },
})
