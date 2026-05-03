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
    'react-native-reanimated',
    'react-native-svg',
    // Expo deps used by MultiStep / ListItem / AvatarUploader / etc — must be
    // marked external so tsup doesn't try to compile their JSX-in-.js files.
    'expo-router',
    'expo-haptics',
    'expo-image-picker',
    'expo-blur',
    'expo-linear-gradient',
    'lucide-react-native',
    /^@react-navigation\//,
  ],
  esbuildOptions(options) {
    options.jsx = 'automatic'
  },
})
