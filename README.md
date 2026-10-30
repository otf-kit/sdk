<div align="center">

<a href="https://ui.otf-kit.dev"><img src="https://cdn.otf-kit.dev/readme/sdk-1017r/hero.gif" alt="Screen recording: a cursor types into Input, switches Tabs, opens an Accordion item and a Dialog, first in the live web Storybook and then in the live native showcase, shown in a phone frame" width="100%" /></a>

<sub>A real screen recording of <a href="https://ui.otf-kit.dev">ui.otf-kit.dev</a> and the <a href="https://native-preview.otf-kit.dev">native showcase</a> (its web build, from the same Expo code that runs on iOS and Android). Frames, title cards and the cursor were added on top. <a href="https://cdn.otf-kit.dev/readme/sdk-1017r/hero.mp4">Watch it as MP4</a>.</sub>

# OTF UI

### One component set for web, iOS and Android. Free, MIT, and easy for your AI agent to build on.

**[Storybook](https://ui.otf-kit.dev)** · **[Native showcase](https://native-preview.otf-kit.dev)** · **[Android APK](https://otf-kit.dev/download)** · **[Component gallery](https://otf-kit.dev/components)** · **[Docs](https://otf-kit.dev/docs)**

<p>
  <a href="https://www.npmjs.com/package/@otfdashkit/ui"><img src="https://img.shields.io/npm/v/@otfdashkit/ui?style=flat-square&color=000&label=%40otfdashkit%2Fui" alt="@otfdashkit/ui on npm"></a>
  <a href="https://www.npmjs.com/package/@otfdashkit/ui-native"><img src="https://img.shields.io/npm/v/@otfdashkit/ui-native?style=flat-square&color=000&label=%40otfdashkit%2Fui-native" alt="@otfdashkit/ui-native on npm"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-000?style=flat-square" alt="MIT license"></a>
  <a href="https://discord.gg/gpXyu7SqNZ"><img src="https://img.shields.io/badge/Discord-join-000?style=flat-square&logo=discord&logoColor=white" alt="Discord"></a>
</p>

</div>

`<Button>` from `@otfdashkit/ui` on the web and `<Button>` from `@otfdashkit/ui-native` on iOS and Android share a name and one set of design tokens. You import the same component names on every platform. Each package keeps the props that suit its platform, so check a component's page when you port a screen.

**240+ components: 150+ web and 85+ native.** At least 240, counting only components exported from the npm packages (`@otfdashkit/ui` and `@otfdashkit/ui-native`), leaving out stories and tests. Of these, the [component gallery](https://otf-kit.dev/components) documents **109 installable components** one by one (90 web and 19 React Native), each with its own install steps.

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

## What you get

<table>
  <tr>
    <td width="50%" valign="top"><a href="https://ui.otf-kit.dev/?path=/story/data-eventcalendar--month-view"><img src="https://cdn.otf-kit.dev/readme/sdk-1017r/g-ev.gif" alt="Recording: Event calendar, paging to next month and back to today" width="100%" /></a><br /><sub><b>EventCalendar</b>: page months, jump back to today (web) · <a href="https://cdn.otf-kit.dev/readme/sdk-1017r/g-ev.mp4">MP4</a></sub></td>
    <td width="50%" valign="top"><a href="https://ui.otf-kit.dev/?path=/story/advanced--kanban-story"><img src="https://cdn.otf-kit.dev/readme/sdk-1017r/g-kb.gif" alt="Recording: dragging cards between Kanban columns" width="100%" /></a><br /><sub><b>Kanban</b>: drag cards between columns (web) · <a href="https://cdn.otf-kit.dev/readme/sdk-1017r/g-kb.mp4">MP4</a></sub></td>
  </tr>
  <tr>
    <td width="50%" valign="top"><a href="https://ui.otf-kit.dev/?path=/story/data-advanceddatagrid--with-selection"><img src="https://cdn.otf-kit.dev/readme/sdk-1017r/g-dg.gif" alt="Recording: sorting the data grid by name and selecting rows" width="100%" /></a><br /><sub><b>AdvancedDataGrid</b>: sort a column, select rows (web) · <a href="https://cdn.otf-kit.dev/readme/sdk-1017r/g-dg.mp4">MP4</a></sub></td>
    <td width="50%" valign="top"><a href="https://ui.otf-kit.dev/?path=/story/forms-colorpicker--with-swatches"><img src="https://cdn.otf-kit.dev/readme/sdk-1017r/g-cp-v2.gif" alt="Recording: picking a swatch, dragging saturation and hue in the color picker" width="100%" /></a><br /><sub><b>ColorPicker</b>: swatches, saturation and hue (web) · <a href="https://cdn.otf-kit.dev/readme/sdk-1017r/g-cp.mp4">MP4</a></sub></td>
  </tr>
  <tr>
    <td width="50%" valign="top"><a href="https://native-preview.otf-kit.dev"><img src="https://cdn.otf-kit.dev/readme/sdk-1017r/g-dp.gif" alt="Recording: picking dates and paging months in the native date picker, shown in a phone frame" width="100%" /></a><br /><sub><b>DatePicker</b>: pick a date, page months (<code>ui-native</code> for iOS and Android, recorded in the showcase's web build) · <a href="https://cdn.otf-kit.dev/readme/sdk-1017r/g-dp.mp4">MP4</a></sub></td>
    <td width="50%" valign="top"><a href="https://native-preview.otf-kit.dev"><img src="https://cdn.otf-kit.dev/readme/sdk-1017r/g-sw.gif" alt="Recording: tapping like and nope on the native swipe cards, shown in a phone frame" width="100%" /></a><br /><sub><b>SwipeCards</b>: like and nope through a deck (<code>ui-native</code> for iOS and Android, recorded in the showcase's web build) · <a href="https://cdn.otf-kit.dev/readme/sdk-1017r/g-sw.mp4">MP4</a></sub></td>
  </tr>
</table>

Every clip above is a screen recording of a real cursor using the live [Storybook](https://ui.otf-kit.dev) or [native showcase](https://native-preview.otf-kit.dev). Only the browser and phone frames, their labels and the cursor were added. The [component gallery](https://otf-kit.dev/components) lists all 109 installable components with install steps for each one. Blocks (full page sections) and patterns (motion and effects) are listed separately at [/blocks](https://otf-kit.dev/blocks) and [/patterns](https://otf-kit.dev/patterns).

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

## Need a full app?

The SDK is free and works on its own. If you want auth, a database, payments and deploy scripts already wired, [**OTF kits**](https://otf-kit.dev/templates) are complete apps built on this SDK. Each one ships an `ai/` folder your agent reads, and every demo below is live, so you can click through before you buy.

<table>
  <tr>
    <td width="50%" valign="top"><a href="https://ai-app.otf-kit.dev"><img src="https://cdn.otf-kit.dev/img/kits/ai-saas-kit/20261029-live/chat-dark.webp" alt="AI Agent kit: agent chat with a task list and credits panel, dark theme" width="100%" /></a><br /><sub><b><a href="https://otf-kit.dev/templates/ai-saas-kit">AI Agent</a></b>: an agent workspace with chat, tasks and credits (web) · <a href="https://ai-app.otf-kit.dev">live demo</a></sub></td>
    <td width="50%" valign="top"><a href="https://saas.otf-kit.dev"><img src="https://cdn.otf-kit.dev/img/kits/20261025b/saas/dashboard-dark.webp" alt="SaaS Dashboard kit: overview dashboard with charts, dark theme" width="100%" /></a><br /><sub><b><a href="https://otf-kit.dev/templates/saas-dashboard">SaaS Dashboard</a></b>: analytics, issues, inbox and team (web) · <a href="https://saas.otf-kit.dev">live demo</a></sub></td>
  </tr>
</table>
<table>
  <tr>
    <td width="25%" valign="top"><a href="https://fitness-preview.otf-kit.dev"><img src="https://cdn.otf-kit.dev/img/kits/20261025d/fitness/summary-dark.webp" alt="Fitness kit: daily summary with activity rings on a phone" width="100%" /></a><br /><sub><b><a href="https://otf-kit.dev/templates/fitness-kit">Fitness</a></b>: workouts, nutrition, progress · <a href="https://fitness-preview.otf-kit.dev">live demo</a></sub></td>
    <td width="25%" valign="top"><a href="https://booking-preview.otf-kit.dev"><img src="https://cdn.otf-kit.dev/img/kits/20261025d/booking/discover-dark.webp" alt="Booking kit: discover screen on a phone" width="100%" /></a><br /><sub><b><a href="https://otf-kit.dev/templates/booking-kit">Booking</a></b>: discover and book · <a href="https://booking-preview.otf-kit.dev">live demo</a></sub></td>
    <td width="25%" valign="top"><a href="https://arcade-preview.otf-kit.dev"><img src="https://cdn.otf-kit.dev/img/kits/20261025b/arcade/store-dark.webp" alt="Arcade kit: game store screen on a phone" width="100%" /></a><br /><sub><b><a href="https://otf-kit.dev/templates/arcade-kit">Arcade</a></b>: discover games, play instantly · <a href="https://arcade-preview.otf-kit.dev">live demo</a></sub></td>
    <td width="25%" valign="top"><a href="https://marketplace-preview.otf-kit.dev"><img src="https://cdn.otf-kit.dev/img/kits/20261025d/marketplace/home-dark.webp" alt="Marketplace kit: home screen on a phone" width="100%" /></a><br /><sub><b><a href="https://otf-kit.dev/templates/marketplace-kit">Marketplace</a></b>: browse and hire, seller workspace · <a href="https://marketplace-preview.otf-kit.dev">live demo</a></sub></td>
  </tr>
</table>

<sub>The first two are web apps. The other four are Expo apps for iOS, Android and the web, from one codebase.</sub>

## Contributing

Bug reports, missing variants and accessibility fixes are welcome. Start with an issue labelled [`good first issue`](https://github.com/otf-kit/sdk/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22), then read [`CONTRIBUTING.md`](./CONTRIBUTING.md). Questions and ideas go to [Discord](https://discord.gg/gpXyu7SqNZ).

## Status

Live on npm and in production: all six OTF kits (AI Agent, SaaS Dashboard, Fitness, Booking, Arcade, Marketplace) are built on it. Versions follow semver; while on `0.x`, a minor release can change an API, so pin exact versions in production.

## License

[MIT](./LICENSE) for every SDK package: [`@otfdashkit/ui`](https://www.npmjs.com/package/@otfdashkit/ui) · [`@otfdashkit/ui-native`](https://www.npmjs.com/package/@otfdashkit/ui-native) · [`@otfdashkit/tokens`](https://www.npmjs.com/package/@otfdashkit/tokens) · [`@otfdashkit/cli`](https://www.npmjs.com/package/@otfdashkit/cli) · [`@otfdashkit/eslint-plugin-otf-design`](https://www.npmjs.com/package/@otfdashkit/eslint-plugin-otf-design). The paid OTF kits use a per-developer license, described at [otf-kit.dev](https://otf-kit.dev).
