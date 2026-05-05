# @otfdashkit/eslint-plugin-otf-design

Local ESLint plugin that enforces OTF design system token compliance across all apps and kits.

## Rules

| Rule | Default | Description |
|------|---------|-------------|
| `no-hex-colors` | `error` | Bans hardcoded `#RRGGBB` hex literals outside token definition files |
| `no-default-tailwind-colors` | `warn` | Bans default Tailwind palette classes (blue-500, purple-600, etc.) |

## Setup (ESLint flat config)

```js
// eslint.config.mjs
import otfDesign from '@otfdashkit/eslint-plugin-otf-design/src/index.js'

export default [
  {
    plugins: { '@otfdashkit/otf-design': otfDesign },
    rules: {
      ...otfDesign.configs.recommended.rules,
      // Override: allow hex in test files
      '@otfdashkit/otf-design/no-hex-colors': ['error', { allowFiles: ['theme.ts', 'tokens.ts', '*.test.ts'] }],
    },
  },
]
```

## Why

Prevents token drift — ensures all colors in apps/kits are driven by the CSS custom property token system rather than hardcoded values that don't respond to palette switching.
