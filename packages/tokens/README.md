<h1 align="center">@otfdashkit/tokens</h1>

<p align="center">
  17 themes, dark mode, web + native parity. CSS variables on the web, Tamagui tokens on iOS / Android.
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

## What you get

- `web.css` — full CSS-variable definitions for all 17 themes (light + dark)
- `tailwindPreset` — Tailwind v4 preset wired to the tokens
- `otfTamaguiConfig` — Tamagui config object for React Native
- `OTF_DESIGN_THEMES`, `OtfDesignThemeId`, `OtfColorPalette`, `OtfDesignTheme` — types

Used by both [`@otfdashkit/ui`](https://www.npmjs.com/package/@otfdashkit/ui) and [`@otfdashkit/ui-native`](https://www.npmjs.com/package/@otfdashkit/ui-native).

## Install

```bash
pnpm add @otfdashkit/tokens
# or:  npm install @otfdashkit/tokens
# or:  bun add @otfdashkit/tokens
```

## Web (CSS variables)

```tsx
// app/layout.tsx (Next.js) or src/main.tsx (Vite)
import '@otfdashkit/tokens/web.css'
```

Pick a theme by setting an attribute on `<html>`:

```html
<html data-theme="ocean-teal" class="dark">
```

Every component, every Tailwind utility class that reads `hsl(var(--*))`, every chart color now resolves through this token set.

## Tailwind v4 preset

```ts
// tailwind.config.ts
import { tailwindPreset } from '@otfdashkit/tokens/tailwind'

export default {
  presets: [tailwindPreset],
}
```

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

## Live demos

- **[saas.otf-kit.dev](https://saas.otf-kit.dev/)** — floating theme picker switches palette live
- **[ui.otf-kit.dev](https://ui.otf-kit.dev/)** — every component on every theme

## Works with

- **Claude Code**, **Cursor**, **Lovable**, **Bolt** — feature code uses `bg-primary`, `text-foreground`, `border-border` so agents produce theme-safe output by default

## Related packages

- [`@otfdashkit/ui`](https://www.npmjs.com/package/@otfdashkit/ui) — web component library that consumes these tokens
- [`@otfdashkit/ui-native`](https://www.npmjs.com/package/@otfdashkit/ui-native) — native counterpart, same token language
- [`@otfdashkit/eslint-plugin-otf-design`](https://www.npmjs.com/package/@otfdashkit/eslint-plugin-otf-design) — lint rule that rejects hex literals and default Tailwind palette classes

## Community

**[discord.gg/gpXyu7SqNZ](https://discord.gg/gpXyu7SqNZ)** — questions, bugs, feature requests.

## License

MIT. You own the source. Eject any time. Copyright &copy; otfdashkit.
