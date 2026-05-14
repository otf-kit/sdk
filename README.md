<h1 align="center">@otfdashkit</h1>

<p align="center">
  Production code your AI agent can ship. Cross-platform React + React Native SDK and full-stack starter kits — owned, not generated.
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

## The pitch

Sandboxed agents (Lovable, Bolt, v0) spin up an MVP. They can't follow you to production — can't read your repo, follow your conventions, hook into your MCP servers, or use your custom skills.

OTF kits **are** that production code. Full source. `CLAUDE.md` + `.cursorrules` + 20+ tested prompts at `ai/prompts/` baked in. Your file-system agent (Claude Code, Cursor) reads the kit like docs and extends it cleanly. Buy once, own the code.

The free SDK underneath those kits — `@otfdashkit/ui` (web) and `@otfdashkit/ui-native` (mobile) — is what you'd reach for even without the kits.

## Live demos (click before you install)

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
      <sub>11 screens, real Postgres, optimistic CRUD, command palette.</sub>
    </td>
    <td align="center">
      <a href="https://fitness-preview.otf-kit.dev/"><b>fitness-preview.otf-kit.dev</b></a><br/>
      <sub>Apple-Fitness-style mobile app — iOS, Android, web from one codebase.</sub>
    </td>
  </tr>
</table>

Plus: [`ui.otf-kit.dev`](https://ui.otf-kit.dev/) (web Storybook, every component) and [`native-preview.otf-kit.dev`](https://native-preview.otf-kit.dev/) (native showcase in a phone frame with per-route Expo Go QR — scan and land on the same component on a real device).

## What you get

**SDK (free, MIT):**

| Package | Platform | Foundation |
|---|---|---|
| [`@otfdashkit/ui`](packages/ui/) | Web | Radix UI + Tailwind v4 — Button, Card, Form, Dialog, Sheet, Drawer, Command, Toast, Calendar, DataTable, BarChart, AreaChart, Tiptap editor, ImageCrop, and 130+ more |
| [`@otfdashkit/ui-native`](packages/ui-native/) | iOS / Android | Tamagui-core — same component names and props as web; 80 primitives |
| [`@otfdashkit/tokens`](packages/tokens/) | Both | 17 themes (Slate / Warm / Cosmic / Terminal + 13 more), CSS vars on web, Tamagui tokens on native |
| [`@otfdashkit/cli`](packages/cli/) | Mobile | Registry installer for heavy-peer components (Skia shaders, Reanimated, MMKV) — copies source, no forced peers |
| [`@otfdashkit/eslint-plugin-otf-design`](packages/eslint-plugin-otf-design/) | Tooling | Rejects hex literals and default Tailwind blues / purples / grays at lint time |

**Kits (commercial, you own the source):**

- **SaaS Dashboard** — `$149`. Vite + React + Hono + Postgres + Drizzle + Better Auth + Stripe. 11 screens. Live: [`saas.otf-kit.dev`](https://saas.otf-kit.dev/)
- **Fitness Kit** — `$149`. Expo SDK 54 + Hono + Postgres + Drizzle + Better Auth. One codebase ships iOS, Android, web. Live: [`fitness-preview.otf-kit.dev`](https://fitness-preview.otf-kit.dev/)
- **Bundle** — `$249` founding price (both kits). Price goes up after every 100 sales.

## Install (free SDK)

```bash
# Web
pnpm add @otfdashkit/ui @otfdashkit/tokens

# Native (Expo)
pnpm add @otfdashkit/ui-native @otfdashkit/tokens
```

```tsx
// Web — app/layout.tsx (Next.js) or src/main.tsx (Vite)
import '@otfdashkit/tokens/web.css'
import '@otfdashkit/ui/styles'
import { Button, Card, Input } from '@otfdashkit/ui'

export default function SignInCard() {
  return (
    <Card>
      <Input placeholder="Email" />
      <Button variant="primary" size="lg">Continue</Button>
    </Card>
  )
}
```

```tsx
// Native — same component names, same props
import { Button, Card, Input } from '@otfdashkit/ui-native'
```

Pick a theme by setting one attribute: `<html data-theme="ocean-teal">` (web) or via the Tamagui provider (native). 17 themes ship in the box.

## Works with

Built and tested with the agents that can actually read source:

- **Claude Code** — every kit ships `CLAUDE.md` with full architecture context
- **Cursor** — `.cursorrules` mirrors the same context
- **Lovable**, **Bolt** — `lovable.md` config for sandbox-style flows
- 20+ tested prompts at `ai/prompts/` per kit (`add-entity.md`, `add-screen.md`, `add-chart.md`, …)

## Repo layout

```
internal/                ← this monorepo (master, private)
├── packages/            ← SDK packages (mirrored to otf-kit/sdk, MIT)
│   ├── ui/              ← web component library
│   ├── ui-native/       ← mobile component library
│   ├── tokens/          ← design tokens
│   ├── cli/             ← heavy-peer registry installer
│   └── eslint-plugin-otf-design/
├── kits/                ← commercial kits (one private buyer repo each)
│   ├── saas-dashboard/
│   └── fitness-kit/
└── apps/                ← landing site, storybooks, showcase
```

## Community

**Discord — [`discord.gg/gpXyu7SqNZ`](https://discord.gg/gpXyu7SqNZ)** — buyer support, feature requests, bug reports, release announcements.

## Status

`v0.1.x` — alpha. APIs may change before `1.0`. Pin exact versions if you ship to production.

## License

MIT for the SDK packages. You own the source. Eject any time.

Kits ship under a commercial per-developer license (`LICENSE-KIT.md`) — also full source, also yours to fork. The license only covers redistribution.

Copyright &copy; otfdashkit — see [LICENSE](LICENSE).
