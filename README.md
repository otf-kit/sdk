<h1 align="center">@otfdashkit</h1>

<p align="center">
  Cross-platform UI component SDK for React &amp; React Native &mdash; one API, web and native.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@otfdashkit/ui" target="_blank">
    <img src="https://img.shields.io/npm/v/@otfdashkit/ui?style=flat-square&color=000&label=%40otfdashkit%2Fui" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@otfdashkit/ui-native" target="_blank">
    <img src="https://img.shields.io/npm/v/@otfdashkit/ui-native?style=flat-square&color=000&label=%40otfdashkit%2Fui-native" alt="npm version (native)">
  </a>
  <a href="./LICENSE" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="MIT License">
  </a>
  <img src="https://img.shields.io/badge/platforms-Web%20%7C%20iOS%20%7C%20Android-000?style=flat-square" alt="platforms">
  <img src="https://img.shields.io/badge/React-19-000?style=flat-square" alt="React 19">
  <img src="https://img.shields.io/badge/Tailwind-v4-000?style=flat-square" alt="Tailwind v4">
</p>

---

## Preview

Two production-grade reference apps built end-to-end with the SDK &mdash; same primitives, same tokens, two completely different products.

<table>
  <tr>
    <th align="center" width="50%">SaaS Dashboard</th>
    <th align="center" width="50%">Fitness App</th>
  </tr>
  <tr>
    <td align="center">
      <a href="https://saas.otf-kit.dev/" target="_blank">
        <img src="https://api.microlink.io/?url=https%3A%2F%2Fsaas.otf-kit.dev%2F&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=3000" alt="SaaS dashboard preview" width="100%" />
      </a>
    </td>
    <td align="center">
      <a href="https://fitness-preview.otf-kit.dev/" target="_blank">
        <img src="https://api.microlink.io/?url=https%3A%2F%2Ffitness-preview.otf-kit.dev%2F&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=3000" alt="Fitness app preview" width="100%" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://saas.otf-kit.dev/"><b>saas.otf-kit.dev</b></a><br/>
      <sub>Analytics, billing, settings, command palette &mdash; built on <code>@otfdashkit/ui</code>.</sub>
    </td>
    <td align="center">
      <a href="https://fitness-preview.otf-kit.dev/"><b>fitness-preview.otf-kit.dev</b></a><br/>
      <sub>Workouts, progress, onboarding &mdash; same components, fitness theme.</sub>
    </td>
  </tr>
</table>

> [!IMPORTANT]
> The two demos above use the **same component library** &mdash; they only differ in theme tokens and composition. Swap palette, ship a new product.

> [!NOTE]
> `@otfdashkit/ui` targets the web (Next.js / Vite / any React 19 app). `@otfdashkit/ui-native` targets iOS &amp; Android via Expo with Tamagui under the hood. Both share the `@otfdashkit/tokens` design language.

## Packages

| Package | Platform | Foundation | Description |
|---|---|---|---|
| [`@otfdashkit/ui`](https://www.npmjs.com/package/@otfdashkit/ui) | Web | Radix UI + Tailwind v4 | 98 primitives + blocks, layouts, charts |
| [`@otfdashkit/ui-native`](https://www.npmjs.com/package/@otfdashkit/ui-native) | Mobile | Tamagui-core | Native primitives with parity APIs |
| [`@otfdashkit/tokens`](https://www.npmjs.com/package/@otfdashkit/tokens) | Both | CSS vars + Tamagui tokens | 17 themes, shared scales, dark mode |
| [`@otfdashkit/eslint-plugin-otf-design`](https://www.npmjs.com/package/@otfdashkit/eslint-plugin-otf-design) | Tooling | ESLint plugin | Bans hex / default Tailwind classes |

## Install

```bash
# Web
pnpm add @otfdashkit/ui @otfdashkit/tokens

# Native (Expo)
pnpm add @otfdashkit/ui-native @otfdashkit/tokens
```

## Quick start

```tsx
// app/layout.tsx (Next.js)
import '@otfdashkit/tokens/web.css'
import '@otfdashkit/ui/styles'

import { Button, Card, Input } from '@otfdashkit/ui'

export default function Page() {
  return (
    <Card>
      <Input placeholder="Email" />
      <Button variant="primary" size="lg">Continue</Button>
    </Card>
  )
}
```

```tsx
// React Native (Expo)
import { Button, Card, Input } from '@otfdashkit/ui-native'

export default function Screen() {
  return (
    <Card>
      <Input placeholder="Email" />
      <Button variant="primary" size="lg" onPress={handlePress}>
        Continue
      </Button>
    </Card>
  )
}
```

The same component names, props, and variants work on both platforms.

## Theming

Pick one of 17 design themes (or define your own) by setting a single attribute &mdash; tokens cascade to every component.

```tsx
<html data-theme="ocean-teal">
```

Built-in themes: `mono`, `ocean-teal`, `warm-amber`, `rose-coral`, `lavender`, `glacier`, `forest`, `obsidian`, `solar`, `orchid`, `indigo`, `cosmic-night`, `soft-pop`, `neo-brutalism`, `vintage-paper`, `modern-minimal`, `bubblegum`.

## Live demos

<table>
  <tr>
    <td><a href="https://saas.otf-kit.dev/">SaaS dashboard</a></td>
    <td>Full app: analytics, billing, team, settings, search.</td>
  </tr>
  <tr>
    <td><a href="https://fitness-preview.otf-kit.dev/">Fitness app</a></td>
    <td>Same SDK, fitness theme &mdash; workouts, progress, onboarding.</td>
  </tr>
  <tr>
    <td><a href="https://ui.otf-kit.dev/">Web Storybook</a></td>
    <td>Every component, every variant, every state.</td>
  </tr>
  <tr>
    <td><a href="https://native.otf-kit.dev/">Native showcase</a></td>
    <td>iOS / Android primitives running in a single Expo app.</td>
  </tr>
</table>

## Why otfdashkit

- **One API, two platforms.** Web and native components share names, props, and variants. Port a screen by changing the import.
- **17 themes out of the box.** SaaS, fitness, fintech, e-commerce &mdash; reskin without touching components.
- **AI-coding-tool-native.** Every component ships with structured JSDoc and tested prompts, so Cursor / Claude / Copilot generate correct usage on the first try.
- **Lint your design system.** `@otfdashkit/eslint-plugin-otf-design` rejects hex colors and default Tailwind palette classes &mdash; tokens or it doesn't ship.
- **Two real apps, not snippets.** [saas.otf-kit.dev](https://saas.otf-kit.dev/) and [fitness-preview.otf-kit.dev](https://fitness-preview.otf-kit.dev/) are the proof.

> [!WARNING]
> `@otfdashkit/*` is **alpha**. APIs may change before `1.0`. Pin exact versions if you ship to production.

## Documentation

<table>
  <tr>
    <td><a href="./packages/ui/README.md">@otfdashkit/ui</a></td>
    <td>Web primitives, blocks, layouts, charts.</td>
  </tr>
  <tr>
    <td><a href="./packages/ui-native/README.md">@otfdashkit/ui-native</a></td>
    <td>Native primitives, Expo setup, parity notes.</td>
  </tr>
  <tr>
    <td><a href="./packages/tokens/README.md">@otfdashkit/tokens</a></td>
    <td>Theme list, CSS vars, Tamagui tokens, dark mode.</td>
  </tr>
  <tr>
    <td><a href="./packages/eslint-plugin-otf-design/README.md">eslint-plugin-otf-design</a></td>
    <td>Rules, severity, fixable autofixes.</td>
  </tr>
</table>

## License

MIT &copy; otfdashkit &mdash; see [LICENSE](LICENSE).
