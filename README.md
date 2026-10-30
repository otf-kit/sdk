<div align="center">

<a href="https://otf-kit.dev"><img src="https://otf-kit.dev/logo.svg" alt="OTF logo" width="64" height="64" /></a>

# OTF UI

**One component set for web, iOS and Android.** Free, MIT, and easy for your AI agent to build on.

<p>
  <a href="https://www.npmjs.com/package/@otfdashkit/ui"><img src="https://img.shields.io/npm/v/@otfdashkit/ui?style=flat-square&color=000&label=%40otfdashkit%2Fui" alt="@otfdashkit/ui on npm"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-000?style=flat-square" alt="MIT license"></a>
</p>

**[Docs](https://otf-kit.dev/docs)** · **[Storybook](https://ui.otf-kit.dev)** · **[Native showcase](https://native-preview.otf-kit.dev)** · **[Components](https://otf-kit.dev/components)** · **[Kits](https://otf-kit.dev/templates)**

<br />

<a href="https://otf-kit.dev">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/hero-dark.gif" />
    <source media="(prefers-color-scheme: light)" srcset="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/hero-light.gif" />
    <img src="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/hero-dark.gif" alt="Recording of real apps built on OTF UI: in the AI Agent workspace a user asks the Writer agent for a follow-up email and the reply streams in, over a SaaS dashboard, while the Fitness and Arcade iPhones switch screens" width="100%" />
  </picture>
</a>

<sub>A recording of the live demos (the AI Agent loop is the one on <a href="https://otf-kit.dev">otf-kit.dev</a>), all built on this SDK: the <a href="https://ai-app.otf-kit.dev">AI Agent</a> and <a href="https://saas-app.otf-kit.dev">SaaS Dashboard</a> web apps, and the <a href="https://fitness-app.otf-kit.dev">Fitness</a> and <a href="https://arcade-app.otf-kit.dev">Arcade</a> apps for iOS and Android.</sub>

</div>

## What's inside

**240+ components: 150+ web and 85+ native.** At least 240, counting only components exported from the npm packages (`@otfdashkit/ui` and `@otfdashkit/ui-native`), leaving out stories and tests. Of these, the [component gallery](https://otf-kit.dev/components) documents **109 installable components** one by one (90 web and 19 React Native), each with its own install steps.

| Part | What you get |
|---|---|
| Web components | App shells, boards, data tables and charts, calendars, editors, menus and commands, messaging |
| Native components | The same names and design tokens, rendered natively on iOS and Android |
| Kits built on it | AI Agent, SaaS Dashboard, Fitness, Arcade, Booking, Marketplace |
| Agent files | Skills, `AGENTS.md` conventions, `llms.txt` and a Markdown mirror of the docs |

`<Button>` from `@otfdashkit/ui` on the web and `<Button>` from `@otfdashkit/ui-native` on iOS and Android share a name and one set of design tokens. You import the same component names on every platform. Each package keeps the props that suit its platform, so check a component's page when you port a screen.

## Quick start (30 seconds)

**Web** (Next.js, Vite, Remix)

```bash
npm install @otfdashkit/ui @otfdashkit/tokens
npm install -D tailwindcss@3 tailwindcss-animate postcss autoprefixer
```

The web components are styled with Tailwind CSS v3. Add the OTF preset, the animation plugin and the component sources to your Tailwind config:

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

Add a `postcss.config.mjs` with `export default { plugins: { tailwindcss: {}, autoprefixer: {} } }`, and keep the usual `@tailwind base; @tailwind components; @tailwind utilities;` lines in your global stylesheet. Then import the two stylesheets once and use the components:

```tsx
import '@otfdashkit/tokens/web.css'
import '@otfdashkit/ui/styles'
import { Button, Card, Input } from '@otfdashkit/ui'

export function SignInCard() {
  return (
    <Card>
      <Input placeholder="Email" />
      <Button size="lg">Continue</Button>
    </Card>
  )
}
```

**iOS and Android** (Expo)

```bash
npm install @otfdashkit/ui-native @otfdashkit/tokens
npx expo install react-native-svg react-native-safe-area-context
```

```tsx
import { OTFProvider, Button, Card, Input } from '@otfdashkit/ui-native'

export default function App() {
  return (
    <OTFProvider>
      <Card>
        <Input placeholder="Email" />
        <Button variant="primary" size="$4">Continue</Button>
      </Card>
    </OTFProvider>
  )
}
```

On native, one `<OTFProvider>` at the root is all the setup. On the web, it's the Tailwind preset above plus the two CSS imports; the [getting started guide](https://otf-kit.dev/docs/getting-started) covers theme switching.

## Real apps built with it

Every screen below is a live demo you can click through. They are the six [OTF kits](https://otf-kit.dev/templates), complete apps built on this SDK.

<table>
  <tr>
    <td width="50%" valign="top">
      <a href="https://ai-app.otf-kit.dev"><picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/g-ai-dark.webp" />
        <source media="(prefers-color-scheme: light)" srcset="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/g-ai-light.webp" />
        <img src="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/g-ai-dark.webp" alt="AI Agent workspace: agent list, a chat thread with an analyst reply, and the credits panel" width="100%" />
      </picture></a>
      <br /><b><a href="https://otf-kit.dev/templates/ai-saas-kit">AI agent workspace</a></b><br /><sub>Agents with skills, memory, tools and credits · <a href="https://ai-app.otf-kit.dev">live demo</a></sub>
    </td>
    <td width="50%" valign="top">
      <a href="https://saas-app.otf-kit.dev"><picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/g-saas-dark.webp" />
        <source media="(prefers-color-scheme: light)" srcset="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/g-saas-light.webp" />
        <img src="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/g-saas-dark.webp" alt="SaaS Dashboard: issue board with backlog, todo, in progress and review columns" width="100%" />
      </picture></a>
      <br /><b><a href="https://otf-kit.dev/templates/saas-dashboard">SaaS issue board</a></b><br /><sub>Board, backlog and dashboard on sample data · <a href="https://saas-app.otf-kit.dev">live demo</a></sub>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <a href="https://fitness-app.otf-kit.dev"><picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/g-fitness-dark.webp" />
        <source media="(prefers-color-scheme: light)" srcset="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/g-fitness-light.webp" />
        <img src="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/g-fitness-dark.webp" alt="Fitness app on two iPhones: daily summary with activity rings, and the ring detail" width="100%" />
      </picture></a>
      <br /><b><a href="https://otf-kit.dev/templates/fitness-kit">Fitness summary</a></b><br /><sub>Activity rings, stats and workouts, native · <a href="https://fitness-app.otf-kit.dev">live demo</a></sub>
    </td>
    <td width="50%" valign="top">
      <a href="https://arcade-app.otf-kit.dev"><picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/g-arcade-dark.webp" />
        <source media="(prefers-color-scheme: light)" srcset="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/g-arcade-light.webp" />
        <img src="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/g-arcade-dark.webp" alt="Arcade app on two iPhones: browse screen with a featured game, and a game detail page" width="100%" />
      </picture></a>
      <br /><b><a href="https://otf-kit.dev/templates/arcade-kit">Arcade store</a></b><br /><sub>Featured carousel, genres and game detail · <a href="https://arcade-app.otf-kit.dev">live demo</a></sub>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <a href="https://booking-app.otf-kit.dev"><picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/g-booking-dark.webp" />
        <source media="(prefers-color-scheme: light)" srcset="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/g-booking-light.webp" />
        <img src="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/g-booking-dark.webp" alt="Booking app on two iPhones: a session calendar, and the discover list of providers" width="100%" />
      </picture></a>
      <br /><b><a href="https://otf-kit.dev/templates/booking-kit">Booking calendar</a></b><br /><sub>Providers, availability and bookings · <a href="https://booking-app.otf-kit.dev">live demo</a></sub>
    </td>
    <td width="50%" valign="top">
      <a href="https://otf-kit.dev/blocks"><picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/g-blocks-dark.webp" />
        <source media="(prefers-color-scheme: light)" srcset="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/g-blocks-light.webp" />
        <img src="https://cdn.otf-kit.dev/readme/sdk-v4-20261030/g-blocks-dark.webp" alt="Dashboard blocks: revenue, orders and users metrics, a task board and a command menu" width="100%" />
      </picture></a>
      <br /><b><a href="https://otf-kit.dev/blocks">Dashboard blocks</a></b><br /><sub>Metrics, boards and a command menu to start from · <a href="https://otf-kit.dev/blocks">all blocks</a></sub>
    </td>
  </tr>
</table>

<sub>The first two and the blocks are web. Fitness, Arcade and Booking are Expo apps for iOS, Android and the web from one codebase; so is the <a href="https://marketplace-app.otf-kit.dev">Marketplace</a> kit.</sub>

## Packages

The [component gallery](https://otf-kit.dev/components) lists all 109 installable components with install steps for each one. Blocks (full page sections) and patterns (motion and effects) are listed separately at [/blocks](https://otf-kit.dev/blocks) and [/patterns](https://otf-kit.dev/patterns).

| Package | Platform | What |
|---|---|---|
| [`@otfdashkit/ui`](packages/ui/) | Web | 90 installable components, counted from the shared component registry: forms, overlays, data tables, charts, calendar, editor. |
| [`@otfdashkit/ui-native`](packages/ui-native/) | iOS · Android | 19 React Native components, with names and design tokens shared with web. One `<OTFProvider>` at the root. |
| [`@otfdashkit/tokens`](packages/tokens/) | Both | 17 palette definitions, CSS variables on web, native tokens on mobile. |
| [`@otfdashkit/cli`](packages/cli/) | Mobile | Copies heavy components (shaders, worklets) into your project as source, so you only install the native libraries you use. |
| [`@otfdashkit/eslint-plugin-otf-design`](packages/eslint-plugin-otf-design/) | Tooling | Flags hard-coded hex colors and stock blue, purple and gray utility classes at lint time. |

## Try it on your phone

- **Browser:** [native-preview.otf-kit.dev](https://native-preview.otf-kit.dev) shows the native showcase in a phone frame. Each screen has its own Expo Go QR code, so a scan opens the same component on your device.
- **Android:** install the showcase app from [otf-kit.dev/download](https://otf-kit.dev/download).

## Works with Claude Code and Cursor

Your agent reads the same files you do. These are in the repo or on the site today:

| What | Where | What it gives your agent |
|---|---|---|
| Agent Skills | `npx skills add otf-kit/skills` ([source](https://github.com/otf-kit/skills)) | The `otf-ui`, `otf-ui-native`, `otf-tokens` and `otf-cross-platform-ui` skills, for Claude Code, Cursor, Codex and other skills-compatible agents |
| Component conventions | [`packages/ui-native/AGENTS.md`](packages/ui-native/AGENTS.md) | Where components live, the authoring rules, and what belongs in the SDK |
| `llms.txt` | [otf-kit.dev/llms.txt](https://otf-kit.dev/llms.txt) | An index of every docs and component page |
| Markdown mirror | add `/md/` and `.md` to any path, e.g. [otf-kit.dev/md/docs.md](https://otf-kit.dev/md/docs.md) | Any page on the site as plain Markdown |
| Design lint | [`eslint-plugin-otf-design`](packages/eslint-plugin-otf-design/) | Stops generated code from adding hard-coded colors |

```text
Build a settings screen with a profile form, a danger zone and a theme picker.
Use @otfdashkit/ui on web and @otfdashkit/ui-native in the Expo app.
```

## Theming

`@otfdashkit/tokens` ships 17 palette definitions, including Mono, Ocean Teal, Warm Amber and Cosmic Night. On the web, four of them are ready-made CSS classes:

```html
<html class="theme-cosmic dark">   <!-- theme-slate | theme-warm | theme-cosmic | theme-terminal -->
```

On native, build themes from any of the 17 with `getOtfThemePalettes('ocean-teal')` from `@otfdashkit/ui-native`. See [`packages/tokens`](packages/tokens/).

## Contributing

Bug reports, missing variants and accessibility fixes are welcome. Start with an issue labelled [`good first issue`](https://github.com/otf-kit/sdk/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22), then read [`CONTRIBUTING.md`](./CONTRIBUTING.md). Questions and ideas go to [Discord](https://discord.gg/gpXyu7SqNZ).

## Status

Live on npm and in production: all six OTF kits (AI Agent, SaaS Dashboard, Fitness, Booking, Arcade, Marketplace) are built on it. Versions follow semver; while on `0.x`, a minor release can change an API, so pin exact versions in production.

## License

[MIT](./LICENSE) for every SDK package: [`@otfdashkit/ui`](https://www.npmjs.com/package/@otfdashkit/ui) · [`@otfdashkit/ui-native`](https://www.npmjs.com/package/@otfdashkit/ui-native) · [`@otfdashkit/tokens`](https://www.npmjs.com/package/@otfdashkit/tokens) · [`@otfdashkit/cli`](https://www.npmjs.com/package/@otfdashkit/cli) · [`@otfdashkit/eslint-plugin-otf-design`](https://www.npmjs.com/package/@otfdashkit/eslint-plugin-otf-design). The paid OTF kits use a per-developer license, described at [otf-kit.dev](https://otf-kit.dev).
