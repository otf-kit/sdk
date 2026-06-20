<div align="center">

<a href="https://otf-kit.dev"><img src="https://cdn.otf-kit.dev/readme/hero.png" alt="OTF — one component API for web, iOS, and Android" width="100%" /></a>

# otf-ui

### One component API for web, iOS, and Android.

**Stop burning AI tokens on broken UI code.** Pre-built, accessible, production-tested components your coding agent extends — instead of regenerating the same buttons, forms, and dialogs (half of them broken) on every prompt. `<Button>` from **`@otfdashkit/ui`** (React · Radix · Tailwind v4) and `<Button>` from **`@otfdashkit/ui-native`** (Expo · Tamagui) share the same name, props, and look. Build once, ship to the browser and to the App Store.

<p>
  <a href="https://www.npmjs.com/package/@otfdashkit/ui"><img src="https://img.shields.io/npm/v/@otfdashkit/ui?style=flat-square&color=000&label=%40otfdashkit%2Fui" alt="@otfdashkit/ui version"></a>
  <a href="https://www.npmjs.com/package/@otfdashkit/ui-native"><img src="https://img.shields.io/npm/v/@otfdashkit/ui-native?style=flat-square&color=000&label=%40otfdashkit%2Fui-native" alt="@otfdashkit/ui-native version"></a>
  <a href="https://www.npmjs.com/package/@otfdashkit/ui"><img src="https://img.shields.io/npm/dm/@otfdashkit/ui?style=flat-square&color=000&label=downloads" alt="npm downloads"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="MIT License"></a>
  <a href="https://discord.gg/gpXyu7SqNZ"><img src="https://img.shields.io/badge/Discord-join-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord"></a>
</p>

<p>
  <img src="https://img.shields.io/badge/platforms-Web%20%C2%B7%20iOS%20%C2%B7%20Android-000?style=flat-square" alt="platforms">
  <img src="https://img.shields.io/badge/React-19-000?style=flat-square" alt="React 19">
  <img src="https://img.shields.io/badge/Tailwind-v4-000?style=flat-square" alt="Tailwind v4">
  <img src="https://img.shields.io/badge/Expo-SDK%2054-000?style=flat-square" alt="Expo SDK 54">
</p>

[**Storybook**](https://ui.otf-kit.dev) · [**Live native showcase**](https://native-preview.otf-kit.dev) · [**Component gallery**](https://otf-kit.dev/components) · [**Docs**](https://otf-kit.dev/docs)

</div>

---

The tool that spun up your MVP — Lovable, Bolt, v0, Replit, Rork — keeps regenerating the same components on every prompt, and the bill grows as the project does. **otf-ui** is the component layer your agent should build on instead: one opinionated, accessible API that renders **truly native** on every platform — no `Platform.select`, no second design system, no `createTamagui` boilerplate. Wrap [Radix](https://www.radix-ui.com/) + [Tailwind v4](https://tailwindcss.com/) on the web and [Tamagui](https://tamagui.dev/) on native, import the same names everywhere.

## Features

- 🧩 **One API, three platforms** — identical component names and props on web, iOS, and Android. Learn it once.
- 📦 **215+ components** — 137 web (Button → Dialog → DataTable → charts → a Tiptap editor) + 80 native primitives, all keyboard- and screen-reader-accessible.
- 🎨 **17 themes, zero config** — flip a single attribute. Shared design tokens are CSS variables on web and native tokens on mobile.
- ⚡ **Copy-paste *or* `npm install`** — `pnpm add @otfdashkit/ui`, or copy the source via the CLI registry. Your code either way.
- 🪶 **Wrap, don't reinvent** — opinionated APIs on top of battle-tested primitives, not yet-another-from-scratch widget set.
- 🤖 **Built for AI coding agents** — structured JSDoc + tested prompts so Claude Code and Cursor scaffold real screens instead of guessing.
- 🆓 **MIT** — own the source, eject anytime, no lock-in.

## See it live

Everything below is open and clickable — no signup, no install required to look around.

<a href="https://otf-kit.dev" target="_blank"><img src="https://cdn.otf-kit.dev/readme/motion.gif" alt="OTF — the live experience at otf-kit.dev" width="100%" /></a>

<table>
  <tr>
    <th align="center" width="60%">Storybook — every component, every variant</th>
    <th align="center" width="40%">Native showcase — on a real phone</th>
  </tr>
  <tr>
    <td align="center">
      <a href="https://ui.otf-kit.dev/" target="_blank">
        <img src="https://api.microlink.io/?url=https%3A%2F%2Fui.otf-kit.dev%2F&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=3000" alt="otf-ui Storybook" width="100%" />
      </a>
    </td>
    <td align="center">
      <a href="https://native-preview.otf-kit.dev/" target="_blank">
        <img src="https://api.microlink.io/?url=https%3A%2F%2Fnative-preview.otf-kit.dev%2F&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=4000" alt="otf-ui native showcase" width="100%" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://ui.otf-kit.dev/"><b>ui.otf-kit.dev</b></a><br/>
      <sub>The full web component library — props, variants, and a11y states, live.</sub>
    </td>
    <td align="center">
      <a href="https://native-preview.otf-kit.dev/"><b>native-preview.otf-kit.dev</b></a><br/>
      <sub>Phone-framed showcase with a per-screen Expo Go QR — scan and land on the same component on your device.</sub>
    </td>
  </tr>
</table>

Prefer browsing by category? The [**component gallery**](https://otf-kit.dev/components) has all 215+ with copy-paste install per component.

## Quick start

```bash
# Web (Next.js / Vite)
pnpm add @otfdashkit/ui @otfdashkit/tokens

# Native (Expo)
pnpm add @otfdashkit/ui-native @otfdashkit/tokens
```

```tsx
// Web — app/layout.tsx (Next.js) or src/main.tsx (Vite)
import '@otfdashkit/tokens/web.css'
import '@otfdashkit/ui/styles'
import { Button, Card, Input } from '@otfdashkit/ui'

export function SignInCard() {
  return (
    <Card>
      <Input placeholder="Email" />
      <Button variant="primary" size="lg">Continue</Button>
    </Card>
  )
}
```

```tsx
// Native — same names, same props. That's the whole point.
import { Button, Card, Input } from '@otfdashkit/ui-native'
```

Wrap the app root once (`<OTFProvider>` on native, the CSS imports on web) and you're done. No `createTamagui` config, no token wiring.

## Theming

17 themes ship in the box — Slate, Warm, Cosmic, Terminal, and 13 more. Switch with one attribute:

```tsx
<html data-theme="cosmic">                  // web
<OTFProvider defaultTheme="cosmic">         // native
```

Tokens live in [`@otfdashkit/tokens`](packages/tokens/) and resolve to CSS variables on web and native design tokens on mobile — the same palette, both targets.

## Built for AI coding agents

otf-ui is designed to be *read* by the agents you already code with. Every component ships structured JSDoc and a `prompts.md` with tested prompts, so Claude Code, Cursor, and friends generate working screens instead of hallucinating props.

```
"Build a settings page with a profile form, a danger zone, and a theme picker — use @otfdashkit/ui."
```

…produces real, accessible components with correct props, because the model can read the source and the prompt library.

## What's in the box

| Package | Platform | What |
|---|---|---|
| [`@otfdashkit/ui`](packages/ui/) | Web | 137 components — Button, Card, Form, Dialog, Sheet, Drawer, Command palette, Toast, Calendar, DataTable, BarChart/AreaChart, Tiptap editor, ImageCrop, and 120+ more. Built on Radix + Tailwind v4. |
| [`@otfdashkit/ui-native`](packages/ui-native/) | iOS · Android | 80 primitives — same names and props as web, one `<OTFProvider>` at the root. |
| [`@otfdashkit/tokens`](packages/tokens/) | Both | 17 themes — CSS vars on web, native tokens on mobile. |
| [`@otfdashkit/cli`](packages/cli/) | Mobile | Registry installer for heavy-peer components (Skia, Reanimated, MMKV) — copies source, no forced peer deps. |
| [`@otfdashkit/eslint-plugin-otf-design`](packages/eslint-plugin-otf-design/) | Tooling | Catches hex literals and default Tailwind blues/purples/grays at lint time. |

Component categories: **Layout · Forms & inputs · Overlays (dialog/sheet/drawer/popover) · Data (tables, trees, charts) · Navigation · Feedback · Media · Editors**. Browse them all in [Storybook](https://ui.otf-kit.dev) or the [gallery](https://otf-kit.dev/components).

## Documentation

- 📖 **Docs** — [otf-kit.dev/docs](https://otf-kit.dev/docs)
- 🧪 **Storybook (web)** — [ui.otf-kit.dev](https://ui.otf-kit.dev)
- 📱 **Native showcase** — [native-preview.otf-kit.dev](https://native-preview.otf-kit.dev)
- 🗂 **Component gallery** — [otf-kit.dev/components](https://otf-kit.dev/components)

## Contributing

Issues, ideas, and PRs are welcome. Found a missing variant or an a11y gap? Open an issue or send a PR — see [`CONTRIBUTING.md`](./CONTRIBUTING.md). Every component ships the same contract: implementation + Storybook story + a11y test + `prompts.md` + README + export.

If otf-ui saves you time, a ⭐ helps other builders find it.

## Community

Join the **[Discord](https://discord.gg/gpXyu7SqNZ)** for help, feature requests, bug reports, and release announcements.

## Status

`v0.1.x` — alpha. APIs may shift before `1.0`; pin exact versions if you ship to production.

## Building a whole app?

The SDK is free, MIT, and stands entirely on its own — that's the point. If you'd rather not wire the backend from scratch, OTF also offers optional **full-stack kits** (a SaaS dashboard, a fitness app, a booking app): the same SDK dropped into a complete, owned starting point — auth, database, payments, deploy scripts, and an `ai/` config your agent reads to extend it.

<table>
  <tr>
    <td align="center" width="58%"><a href="https://saas.otf-kit.dev" target="_blank"><img src="https://cdn.otf-kit.dev/readme/kits-web.png" alt="OTF SaaS Dashboard kit — web" width="100%" /></a></td>
    <td align="center" width="42%"><a href="https://fitness-preview.otf-kit.dev" target="_blank"><img src="https://cdn.otf-kit.dev/readme/kits-mobile.png" alt="OTF Fitness kit — iOS, Android, and web from one codebase" width="100%" /></a></td>
  </tr>
  <tr>
    <td align="center"><sub>SaaS Dashboard — live at <a href="https://saas.otf-kit.dev">saas.otf-kit.dev</a></sub></td>
    <td align="center"><sub>Fitness — iOS · Android · web, one codebase, at <a href="https://fitness-preview.otf-kit.dev">fitness-preview.otf-kit.dev</a></sub></td>
  </tr>
</table>

Live demos and details at **[otf-kit.dev](https://otf-kit.dev)**.

## License

**[MIT](./LICENSE)** — free forever for every SDK package. You own the source; eject anytime.

- [`@otfdashkit/ui`](https://www.npmjs.com/package/@otfdashkit/ui) · [`@otfdashkit/ui-native`](https://www.npmjs.com/package/@otfdashkit/ui-native) · [`@otfdashkit/tokens`](https://www.npmjs.com/package/@otfdashkit/tokens) · [`@otfdashkit/cli`](https://www.npmjs.com/package/@otfdashkit/cli) · [`@otfdashkit/eslint-plugin-otf-design`](https://www.npmjs.com/package/@otfdashkit/eslint-plugin-otf-design)

The commercial **OTF kits** ship under a per-developer license — details at [otf-kit.dev](https://otf-kit.dev).

<div align="center">
  <sub>Built by <a href="https://otf-kit.dev">otf-kit.dev</a> — the cross-platform SDK + kits for builders who ship with AI agents.</sub>
</div>
