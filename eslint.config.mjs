import otfDesign from './packages/config/eslint-plugin-otf-design.mjs'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/storybook-static/**',
      '**/.expo/**',
      // landing-pack templates (kits/*-landing) are standalone Vite + bun
      // apps with their own design system — not subject to the monorepo's
      // OTF design lint (same rationale as the pnpm-workspace exclusion).
      'kits/*-landing/**',
    ],
  },
  // TypeScript parser for all TS/TSX files. The plugin is registered so eslint-disable comments
  // for its rules (e.g. kits/saas-dashboard/server/request.ts) resolve instead of erroring.
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
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
