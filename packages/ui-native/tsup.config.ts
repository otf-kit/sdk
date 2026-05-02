import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  // dts emit disabled — Tamagui's React 18-pinned types collide with the kit's
  // hoisted React 19 (Expo SDK 54 requirement). Consumers in this monorepo
  // resolve types from src/ via the "types" entry in package.json. SDK's
  // npm package ships prebuilt dts because it builds in a uniform React 18
  // sandbox; we ship the JS bundle (identical) and source types.
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'es2022',
  outDir: 'dist',
  external: [
    'react',
    'react-native',
    'tamagui',
    '@tamagui/core',
    '@tamagui/web',
    '@tamagui/config',
    '@tamagui/colors',
    '@tamagui/animations-react-native',
    '@tamagui/get-token',
    '@tamagui/create-theme',
    '@tamagui/theme-builder',
    '@tamagui/toast',
    '@tamagui/alert-dialog',
    '@tamagui/lucide-icons',
    '@tamagui/portal',
    'react-native-svg',
  ],
  esbuildOptions(options) {
    options.jsx = 'automatic'
  },
})
