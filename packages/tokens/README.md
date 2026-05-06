<h1 align="center">@otfdashkit/tokens</h1>

<p align="center">
  Shared design tokens for the otfdashkit SDK &mdash; CSS variables on the web,<br/>
  Tamagui tokens on native. 17 themes, dark mode, parity across React + React Native.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@otfdashkit/tokens" target="_blank">
    <img src="https://img.shields.io/npm/v/@otfdashkit/tokens?style=flat-square&color=000" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@otfdashkit/tokens" target="_blank">
    <img src="https://img.shields.io/npm/dm/@otfdashkit/tokens?style=flat-square&color=000" alt="npm downloads">
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="MIT License">
  <img src="https://img.shields.io/badge/platforms-Web%20%7C%20iOS%20%7C%20Android-000?style=flat-square" alt="platforms">
</p>

---

## Install

```bash
pnpm add @otfdashkit/tokens
# or:  npm install @otfdashkit/tokens
# or:  bun add @otfdashkit/tokens
```

## Web (CSS variables)

Import the tokens stylesheet once at the root of your app:

```tsx
// app/layout.tsx (Next.js) or src/main.tsx (Vite)
import '@otfdashkit/tokens/web.css'
```

Then pick a theme by setting an attribute on `<html>`:

```html
<html data-theme="ocean-teal" class="dark">
```

All 17 themes are immediately available — every otfdashkit component, every Tailwind utility class that reads `hsl(var(--*))`, every chart color now resolves through this token set.

## Native (Tamagui)

```tsx
import { TamaguiProvider, createTamagui } from '@tamagui/core'
import { otfTamaguiConfig } from '@otfdashkit/tokens'

const config = createTamagui(otfTamaguiConfig)

export default function App() {
  return (
    <TamaguiProvider config={config}>
      {/* your app */}
    </TamaguiProvider>
  )
}
```

## Built-in themes

| Theme | Use case |
|---|---|
| `mono` | Black/white neutral baseline |
| `ocean-teal` | SaaS, fintech, healthcare |
| `warm-amber` | E-commerce, food, hospitality |
| `rose-coral` | Lifestyle, wellness, beauty |
| `lavender` | Productivity, journaling |
| `glacier` | Cool minimalism, data tools |
| `forest` | Eco, outdoor, sustainability |
| `obsidian` | Premium dark-first |
| `solar` | Energy, fitness, alerts |
| `orchid` | Creative, fashion |
| `indigo` | Engineering, dev tools |
| `cosmic-night` | Gaming, music |
| `soft-pop` | Consumer, social |
| `neo-brutalism` | Editorial, contrarian |
| `vintage-paper` | Books, longform |
| `modern-minimal` | Default-clean SaaS |
| `bubblegum` | Kids, casual gaming |

Switch at runtime by writing to `document.documentElement.dataset.theme` (web) or by swapping the Tamagui config (native).

## What's exported

- `web.css` &mdash; full CSS-variable definitions for all 17 themes (light + dark)
- `OTF_DESIGN_THEMES` &mdash; TypeScript record of theme metadata
- `OtfDesignThemeId` / `OtfColorPalette` / `OtfDesignTheme` &mdash; types
- `tailwindPreset` &mdash; Tailwind v4 preset wired to the tokens
- `otfTamaguiConfig` &mdash; Tamagui config object

## Tailwind v4 preset

```ts
// tailwind.config.ts
import { tailwindPreset } from '@otfdashkit/tokens/tailwind'

export default {
  presets: [tailwindPreset],
  // your overrides...
}
```

After this, every Tailwind utility class that reads `hsl(var(--primary))` etc. picks up the active theme automatically &mdash; no per-file overrides.

## Related packages

- [`@otfdashkit/ui`](https://www.npmjs.com/package/@otfdashkit/ui) &mdash; web component library that consumes these tokens
- [`@otfdashkit/ui-native`](https://www.npmjs.com/package/@otfdashkit/ui-native) &mdash; native counterpart, same token language
- [`@otfdashkit/eslint-plugin-otf-design`](https://www.npmjs.com/package/@otfdashkit/eslint-plugin-otf-design) &mdash; lints feature code to enforce token usage (no hex, no default Tailwind palette)

## License

MIT &copy; otfdashkit
