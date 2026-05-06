<h1 align="center">@otfdashkit/ui</h1>

<p align="center">
  Production-quality React component library &mdash; 98 primitives + blocks + layouts + charts.<br/>
  Radix UI under the hood, Tailwind v4 on top, AI-coding-tool-native by design.
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

## Live demo

Two production apps, same component library, two completely different products:

- **[saas.otf-kit.dev](https://saas.otf-kit.dev/)** &mdash; Linear-style SaaS dashboard
- **[fitness-preview.otf-kit.dev](https://fitness-preview.otf-kit.dev/)** &mdash; Apple-Fitness-style mobile-first wellness app
- **[ui.otf-kit.dev](https://ui.otf-kit.dev/)** &mdash; full Storybook (every component, every variant, every state)

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

## What's included

- **98 primitives** &mdash; Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Command, ContextMenu, Dialog, Drawer, DropdownMenu, Form, HoverCard, Input, InputOtp, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, Radio, Resizable, ScrollArea, Select, Separator, Sheet, Skeleton, Slider, Sonner, Spinner, Switch, Table, Tabs, Textarea, Toast, Toggle, Tooltip, &hellip; (full list in [`src/primitives/`](https://github.com/otf-kit/sdk/tree/main/packages/ui/src/primitives))
- **App-shell layouts** &mdash; AppShell, Sidebar, NavigationMenu, CommandPalette
- **Blocks** &mdash; DataGrid, DataTable, Banner, Breadcrumb, EmptyState, Hotkeys, IconBadge, LoadingOverlay, Persona, PropertyList, Stat, Stepper, StructuredList, Timeline, Toaster
- **Charts** &mdash; BarChart, LineChart, AreaChart, BarList, Sparkline, Heatmap, ActivityHeatmap (recharts under the hood)
- **17 themes** out of the box from [`@otfdashkit/tokens`](https://www.npmjs.com/package/@otfdashkit/tokens)

## Theming

Pick a theme by setting an attribute &mdash; tokens cascade to every component:

```html
<html data-theme="ocean-teal" class="dark">
```

Or write `localStorage('otf-theme')` and the floating theme picker (in the SaaS demo) updates live.

## AI-coding-tool-native

Every component ships with structured JSDoc and tested prompts. Cursor, Claude Code, Copilot, and Lovable all generate correct usage on the first try without bespoke prompting.

```ts
import { Button } from '@otfdashkit/ui'

// JSDoc on Button:
//   variant: 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline'
//   size:    'sm' | 'md' | 'lg'
//   See ai/prompts/add-button.md for tested usage patterns.
```

## Lint your design system

Pair with [`@otfdashkit/eslint-plugin-otf-design`](https://www.npmjs.com/package/@otfdashkit/eslint-plugin-otf-design) to reject hex literals and default Tailwind palette classes (`gray-500`, `blue-600`, etc.) at lint time. Tokens or it doesn't ship.

## Live demos + Storybook

- **Web Storybook**: https://ui.otf-kit.dev (every component, every variant)
- **SaaS dashboard**: [saas.otf-kit.dev](https://saas.otf-kit.dev/) ([source](https://github.com/otf-kit/saas-dashboard))
- **Fitness app**: [fitness-preview.otf-kit.dev](https://fitness-preview.otf-kit.dev/) ([source](https://github.com/otf-kit/fitness-kit))

## Related packages

- [`@otfdashkit/ui-native`](https://www.npmjs.com/package/@otfdashkit/ui-native) &mdash; mobile counterpart, same component API, Tamagui under the hood
- [`@otfdashkit/tokens`](https://www.npmjs.com/package/@otfdashkit/tokens) &mdash; the design tokens this package consumes
- [`@otfdashkit/eslint-plugin-otf-design`](https://www.npmjs.com/package/@otfdashkit/eslint-plugin-otf-design) &mdash; design-system lint rules

## Status

`v0.1.x` &mdash; alpha. APIs may change before `1.0`. Pin exact versions if you ship to production.

## License

MIT &copy; otfdashkit
