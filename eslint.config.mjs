import otfDesign from './packages/config/eslint-plugin-otf-design.mjs'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/storybook-static/**',
      '**/.expo/**',
    ],
  },
  // TypeScript parser for all TS/TSX files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },
  // OTF design rules — enforce token usage in apps/ and kits/
  {
    files: ['apps/**/*.{ts,tsx}', 'kits/**/*.{ts,tsx}'],
    plugins: {
      'otf-design': otfDesign,
    },
    rules: {
      'otf-design/no-hex-colors': 'warn',
      'otf-design/no-default-tailwind-colors': 'warn',
    },
  },
]
