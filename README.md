<div align="center">

<a href="https://ui.otf-kit.dev"><img src="https://cdn.otf-kit.dev/readme/sdk-2610/hero-270.gif" alt="The same OTF components (Button, Card, Input, Tabs, Accordion) rendered live on the web in Storybook and on a phone in the native showcase" width="100%" /></a>

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

**270+ components: 190+ web and 85+ native.** We count component modules: `.tsx` files in `packages/ui/src` and `packages/ui-native/src` that export at least one component, leaving out stories and tests (192 web + 86 native on `main`, October 2026). Of these, the [component gallery](https://otf-kit.dev/components) documents **109 installable components** one by one (90 web and 19 React Native), each with its own install steps.

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
    <td width="50%"><a href="https://otf-kit.dev/components"><img src="https://cdn.otf-kit.dev/readme/sdk-2610/gallery-eventcalendar.jpg" alt="Event calendar, month view, web" width="100%" /></a></td>
    <td width="50%"><a href="https://otf-kit.dev/components"><img src="https://cdn.otf-kit.dev/readme/sdk-2610/gallery-colorpicker.jpg" alt="Color picker with swatches, web" width="100%" /></a></td>
  </tr>
  <tr>
    <td width="50%"><a href="https://otf-kit.dev/components"><img src="https://cdn.otf-kit.dev/readme/sdk-2610/gallery-advanceddatagrid.jpg" alt="Data grid with sortable columns, web" width="100%" /></a></td>
    <td width="50%"><a href="https://otf-kit.dev/blocks"><img src="https://cdn.otf-kit.dev/readme/sdk-2610/gallery-sidebar-dashboard.jpg" alt="Dashboard sidebar block, web" width="100%" /></a></td>
  </tr>
  <tr>
    <td width="50%"><a href="https://native-preview.otf-kit.dev"><img src="https://cdn.otf-kit.dev/readme/sdk-2610/gallery-date-picker.jpg" alt="Date picker on iOS and Android" width="100%" /></a></td>
    <td width="50%"><a href="https://native-preview.otf-kit.dev"><img src="https://cdn.otf-kit.dev/readme/sdk-2610/gallery-chat-bubble.jpg" alt="Chat bubbles on iOS and Android" width="100%" /></a></td>
  </tr>
</table>

Every image above is a screenshot of the live [Storybook](https://ui.otf-kit.dev) or [native showcase](https://native-preview.otf-kit.dev). The [component gallery](https://otf-kit.dev/components) lists all 109 installable components with install steps for each one. Blocks (full page sections) and patterns (motion and effects) are listed separately at [/blocks](https://otf-kit.dev/blocks) and [/patterns](https://otf-kit.dev/patterns).

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

- **Agent Skills.** `npx skills add otf-kit/skills` installs the `otf-ui`, `otf-ui-native`, `otf-tokens` and `otf-cross-platform-ui` skills for Claude Code, Cursor, Codex and other skills-compatible agents. Source: [`otf-kit/skills`](https://github.com/otf-kit/skills).
- **Component conventions.** [`packages/ui-native/AGENTS.md`](packages/ui-native/AGENTS.md) says where components live, the authoring rules, and what belongs in the SDK.
- **`llms.txt`.** [otf-kit.dev/llms.txt](https://otf-kit.dev/llms.txt) indexes every docs and component page for LLMs.
- **Markdown mirror.** Any page on the site is plain Markdown if you add `/md/` and `.md` to the path, for example [otf-kit.dev/md/docs.md](https://otf-kit.dev/md/docs.md).
- **Design lint.** [`eslint-plugin-otf-design`](packages/eslint-plugin-otf-design/) stops generated code from adding hard-coded colors.

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

The SDK is free and works on its own. If you want auth, a database, payments and deploy scripts already wired, [**OTF kits**](https://otf-kit.dev) are complete apps built on this SDK. Each one ships an `ai/` folder your agent reads. You can open the live demos before you buy.

## Contributing

Bug reports, missing variants and accessibility fixes are welcome. Start with an issue labelled [`good first issue`](https://github.com/otf-kit/sdk/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22), then read [`CONTRIBUTING.md`](./CONTRIBUTING.md). Questions and ideas go to [Discord](https://discord.gg/gpXyu7SqNZ).

If OTF UI saves you time, a star helps other builders find it.

<a href="https://star-history.com/#otf-kit/sdk&Date"><img src="https://api.star-history.com/svg?repos=otf-kit/sdk&type=Date&theme=dark" alt="Star history for otf-kit/sdk" width="600" /></a>

## Status

`v0.x`, alpha. APIs may change before `1.0`, so pin exact versions if you ship to production.

## License

[MIT](./LICENSE) for every SDK package: [`@otfdashkit/ui`](https://www.npmjs.com/package/@otfdashkit/ui) · [`@otfdashkit/ui-native`](https://www.npmjs.com/package/@otfdashkit/ui-native) · [`@otfdashkit/tokens`](https://www.npmjs.com/package/@otfdashkit/tokens) · [`@otfdashkit/cli`](https://www.npmjs.com/package/@otfdashkit/cli) · [`@otfdashkit/eslint-plugin-otf-design`](https://www.npmjs.com/package/@otfdashkit/eslint-plugin-otf-design). The paid OTF kits use a per-developer license, described at [otf-kit.dev](https://otf-kit.dev).
