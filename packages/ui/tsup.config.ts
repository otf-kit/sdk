import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  // dts disabled: src/index.ts re-exports cause name clashes
  // (CommandItem, Form*, PageHeader between primitives vs blocks vs
  // layouts). Runtime is fine because JS modules pick a winner; tsup
  // .d.ts emit refuses ambiguity. TODO: replace `export *` with
  // explicit named re-exports for the colliding modules and re-enable.
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  treeshake: true,
  target: 'es2022',
  outDir: 'dist',
  external: [
    'react',
    'react-dom',
    'tailwindcss',
    '@tanstack/react-table',
    '@dnd-kit/core',
    '@dnd-kit/sortable',
    'recharts',
    'react-hook-form',
    'zod',
    'date-fns',
  ],
  esbuildOptions(options) {
    options.jsx = 'automatic'
  },
})
