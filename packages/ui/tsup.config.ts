import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    compilerOptions: {
      skipLibCheck: true,
    },
  },
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
  ],
  esbuildOptions(options) {
    options.jsx = 'automatic'
  },
})
