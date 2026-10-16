<h1 align="center">@otfdashkit/tokens</h1>

<p align="center">
  17 themes, dark mode, web + native parity. CSS variables on the web, native design tokens on iOS / Android.
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

| Import | What it is | Platform |
|---|---|---|
| `@otfdashkit/tokens/web.css` | CSS variables for the four web palettes (`theme-slate`, `theme-warm`, `theme-cosmic`, `theme-terminal`), light and dark | Web |
| `@otfdashkit/tokens/tailwind-preset` | `otfPreset`, a Tailwind CSS v3 preset that maps `bg-primary`, `text-foreground`, `border-border` and the rest to those variables. Safe in a web-only project: it never loads native code. | Web |
| `@otfdashkit/tokens` | `otfPreset` again, plus the native palettes (`slateDarkColors` … `terminalLightColors`, `otfThemes`), the native config `otfConfig`, `THEMES` / `getThemeClass`, and the 17 design-theme definitions (`OTF_DESIGN_THEMES`, `OtfDesignThemeId`, `OtfColorPalette`, `OtfDesignTheme`, `getOtfDesignTheme`) | Native (needs `tamagui` and `@tamagui/core`) |

On the web, import the preset from `@otfdashkit/tokens/tailwind-preset`, not from the package root. The root entry also loads the native config, which needs `tamagui` and `@tamagui/core`; a web-only install doesn't have them, so Tailwind stops with `Cannot find module '@tamagui/core'`.

Pairs with [`@otfdashkit/ui`](https://www.npmjs.com/package/@otfdashkit/ui) and [`@otfdashkit/ui-native`](https://www.npmjs.com/package/@otfdashkit/ui-native).

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

Pick one of the four CSS palettes by setting a class on `<html>`, and add `dark` for dark mode:

```html
<html class="theme-slate dark">
```

Switch at runtime by changing that class, for example `document.documentElement.className = 'theme-warm dark'`.

The CSS file ships only `theme-slate`, `theme-warm`, `theme-cosmic` and `theme-terminal`. The other ids in the table below are TypeScript design themes; they are not applied by the CSS file.

Every component, every Tailwind utility class that reads `hsl(var(--*))`, every chart color now resolves through this token set.

## Tailwind preset (Tailwind CSS v3)

`otfPreset` matches the Tailwind config the `@otfdashkit/ui` components are built with. Add the `tailwindcss-animate` plugin next to it for the dialog and menu animations:

```bash
npm install -D tailwindcss@3 tailwindcss-animate
```

```ts
// tailwind.config.ts
import animate from 'tailwindcss-animate'
import { otfPreset } from '@otfdashkit/tokens/tailwind-preset'

export default {
  presets: [otfPreset],
  plugins: [animate],
  content: ['./src/**/*.{ts,tsx}', './node_modules/@otfdashkit/ui/src/**/*.{ts,tsx}'],
}
```

A default import works too (`import otfPreset from '@otfdashkit/tokens/tailwind-preset'`), and so does CommonJS (`require('@otfdashkit/tokens/tailwind-preset').otfPreset`).

## Native (one provider, no config required)

[`@otfdashkit/ui-native`](https://www.npmjs.com/package/@otfdashkit/ui-native) needs no token setup: `<OTFProvider>` ships the default Tamagui-based `light` and `dark` themes. Wrap your app once:

```tsx
import { OTFProvider } from '@otfdashkit/ui-native'

export default function App() {
  return (
    <OTFProvider>
      {/* your app */}
    </OTFProvider>
  )
}
```

For advanced theming or custom config merging, see the [`@otfdashkit/ui-native` README → Advanced](https://www.npmjs.com/package/@otfdashkit/ui-native#advanced--custom-config).

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

On native, `<OTFProvider defaultTheme="dark">` picks light or dark; to theme native screens with the OTF palettes, build themes from `otfThemes` or the `*DarkColors` / `*LightColors` ramps. On the web, use the four `theme-*` classes above.

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
