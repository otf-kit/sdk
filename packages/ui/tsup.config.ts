import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  // Declarations ship with the package; scripts/check-types-consumer.sh proves they resolve.
  dts: true,
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
