<h1 align="center">@otfdashkit/ui</h1>

<p align="center">
  137 React components for builders shipping production apps — Radix under the hood, Tailwind v4 on top, AI-agent-readable by design.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@otfdashkit/ui" target="_blank">
    <img src="https://img.shields.io/npm/v/@otfdashkit/ui?style=flat-square&color=000" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@otfdashkit/ui" target="_blank">
    <img src="https://img.shields.io/npm/dm/@otfdashkit/ui?style=flat-square&color=000" alt="npm downloads">
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="MIT License">
  <img src="https://img.shields.io/badge/React-19-000?style=flat-square" alt="React 19">
  <img src="https://img.shields.io/badge/Tailwind-v4-000?style=flat-square" alt="Tailwind v4">
</p>

---

## What you get

- **Primitives** — Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge, Button, Calendar, Card, Carousel, Checkbox, Collapsible, Command, ContextMenu, Dialog, Drawer, DropdownMenu, Form, HoverCard, Input, InputOtp, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, Radio, Resizable, ScrollArea, Select, Separator, Sheet, Skeleton, Slider, Sonner, Spinner, Switch, Table, Tabs, Textarea, Toast, Toggle, Tooltip — full Radix-backed set
- **App-shell layouts** — AppShell, Sidebar, NavigationMenu, CommandPalette (`⌘K` everywhere)
- **Blocks** — DataGrid, DataTable, Banner, Breadcrumb, EmptyState, Hotkeys, IconBadge, LoadingOverlay, Persona, PropertyList, Stat, Stepper, StructuredList, Timeline, Toaster
- **Charts** — BarChart, LineChart, AreaChart, BarList, Sparkline, Heatmap, ActivityHeatmap (recharts under the hood, token-driven colors)
- **Advanced** — Tiptap editor, ImageCrop, file uploaders, marquees, shiki-powered code blocks, video player
- **17 themes** out of the box from [`@otfdashkit/tokens`](https://www.npmjs.com/package/@otfdashkit/tokens) — swap palette by changing one attribute on `<html>`

137 components in [`src/`](src/). Full catalog at the Storybook below.

## Live demos

- **[ui.otf-kit.dev](https://ui.otf-kit.dev/)** — full Storybook: every component, every variant, every state
- **[saas.otf-kit.dev](https://saas.otf-kit.dev/)** — production SaaS app built end-to-end on this library
- **[fitness-preview.otf-kit.dev](https://fitness-preview.otf-kit.dev/)** — same component language, different theme

## Install

```bash
pnpm add @otfdashkit/ui @otfdashkit/tokens
# or:  npm install @otfdashkit/ui @otfdashkit/tokens
# or:  bun add @otfdashkit/ui @otfdashkit/tokens
```

## Quick start

```tsx
// app/layout.tsx (Next.js) or src/main.tsx (Vite)
import '@otfdashkit/tokens/web.css'
import '@otfdashkit/ui/styles'
```

```tsx
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

## Theming

```html
<html data-theme="ocean-teal" class="dark">
```

Tokens cascade to every component. Built-in themes: `mono`, `ocean-teal`, `warm-amber`, `rose-coral`, `lavender`, `glacier`, `forest`, `obsidian`, `solar`, `orchid`, `indigo`, `cosmic-night`, `soft-pop`, `neo-brutalism`, `vintage-paper`, `modern-minimal`, `bubblegum`.

## Works with

Every component ships structured JSDoc and tested prompts. These agents generate correct usage on the first try:

- **Claude Code**, **Cursor**, **Lovable**, **Bolt**, **Copilot**

Pair with [`@otfdashkit/eslint-plugin-otf-design`](https://www.npmjs.com/package/@otfdashkit/eslint-plugin-otf-design) to reject hex literals and default Tailwind palette classes (`gray-500`, `blue-600`, …) at lint time. Tokens or it doesn't ship.

## Related packages

- [`@otfdashkit/ui-native`](https://www.npmjs.com/package/@otfdashkit/ui-native) — mobile counterpart, same component API
- [`@otfdashkit/tokens`](https://www.npmjs.com/package/@otfdashkit/tokens) — design tokens (CSS vars + Tamagui config)
- [`@otfdashkit/cli`](https://www.npmjs.com/package/@otfdashkit/cli) — heavy-peer component installer (Skia, Reanimated, MMKV)

## Community

Questions, bugs, feature requests: **[discord.gg/gpXyu7SqNZ](https://discord.gg/gpXyu7SqNZ)**.

## Status

`v0.1.x` — alpha. APIs may change before `1.0`. Pin exact versions in production.

## License

MIT. You own the source. Eject any time. Copyright &copy; otfdashkit.
