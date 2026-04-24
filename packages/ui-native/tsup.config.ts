import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'es2022',
  outDir: 'dist',
  external: ['react', 'react-native', 'tamagui', '@tamagui/core', '@tamagui/config'],
  esbuildOptions(options) {
    options.jsx = 'automatic'
  },
})
