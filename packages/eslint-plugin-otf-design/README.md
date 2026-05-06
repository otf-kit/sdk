<h1 align="center">@otfdashkit/eslint-plugin-otf-design</h1>

<p align="center">
  ESLint rules for design-system token compliance.<br/>
  Rejects hex literals and default Tailwind palette classes &mdash; tokens or it doesn't ship.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@otfdashkit/eslint-plugin-otf-design" target="_blank">
    <img src="https://img.shields.io/npm/v/@otfdashkit/eslint-plugin-otf-design?style=flat-square&color=000" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@otfdashkit/eslint-plugin-otf-design" target="_blank">
    <img src="https://img.shields.io/npm/dm/@otfdashkit/eslint-plugin-otf-design?style=flat-square&color=000" alt="npm downloads">
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="MIT License">
  <img src="https://img.shields.io/badge/ESLint-9%2B-000?style=flat-square" alt="ESLint 9+">
</p>

---

## Install

```bash
pnpm add -D @otfdashkit/eslint-plugin-otf-design
# or:  npm install -D @otfdashkit/eslint-plugin-otf-design
# or:  bun add -d @otfdashkit/eslint-plugin-otf-design
```

## Why

Prevents token drift. Once a kit ships with `bg-blue-500` or `#3B82F6` baked in, palette switching at runtime is broken &mdash; that hex literal doesn't respond to `data-theme="ocean-teal"`. This plugin catches the drift at lint time, before review.

Pair with [`@otfdashkit/tokens`](https://www.npmjs.com/package/@otfdashkit/tokens) so feature code uses `bg-primary`, `text-foreground`, `border-border`, etc. instead.

## Rules

| Rule | Default | What it bans |
|---|---|---|
| `no-hex-colors` | `error` | Hardcoded `#RRGGBB` literals outside token-definition files |
| `no-default-tailwind-colors` | `warn` | Default Tailwind palette classes (`blue-500`, `purple-600`, `gray-200`, etc.) — use `primary`, `accent`, `muted` instead |

## Setup (ESLint flat config)

```js
// eslint.config.mjs
import otfDesign from '@otfdashkit/eslint-plugin-otf-design/src/index.js'

export default [
  {
    plugins: { '@otfdashkit/otf-design': otfDesign },
    rules: {
      ...otfDesign.configs.recommended.rules,

      // Allow hex in token-definition files
      '@otfdashkit/otf-design/no-hex-colors': [
        'error',
        { allowFiles: ['theme.ts', 'tokens.ts', '*.test.ts'] },
      ],
    },
  },
]
```

## Example violations

```tsx
// ❌ no-hex-colors
<div style={{ background: '#3B82F6' }}>...</div>

// ❌ no-default-tailwind-colors
<button className="bg-blue-500 text-white">Save</button>

// ✅ both happy
<button className="bg-primary text-primary-foreground">Save</button>
```

## Related packages

- [`@otfdashkit/tokens`](https://www.npmjs.com/package/@otfdashkit/tokens) &mdash; the design tokens this rule-set protects
- [`@otfdashkit/ui`](https://www.npmjs.com/package/@otfdashkit/ui) &mdash; web component library (already token-compliant; this plugin protects YOUR feature code)
- [`@otfdashkit/ui-native`](https://www.npmjs.com/package/@otfdashkit/ui-native) &mdash; native counterpart

## License

MIT &copy; otfdashkit
