# `@otfdashkit/ui-native` showcase

Custom Expo-web shell that exercises every primitive, interface block, layout,
and pattern in [`@otfdashkit/ui-native`](https://www.npmjs.com/package/@otfdashkit/ui-native)
with all of their prop variants on every palette in light + dark.

> **Best browsing experience** &mdash; visit
> [`https://native-preview.otf-kit.dev/`](https://native-preview.otf-kit.dev/),
> the phone-frame wrapper that iframes this showcase with a per-component QR
> code on the side. Each route gets its own QR so visitors can scan and land
> on the same component on a real iOS / Android device via the OTF preview app.
>
> The bare showcase app (no phone frame, no QR) lives at
> [`https://native.otf-kit.dev/`](https://native.otf-kit.dev/).

> Why a custom shell instead of `@storybook/react-native`?
> Storybook RN's web export is brittle. We already run a parallel custom
> shell for the web `@otfdashkit/ui` library — same approach, native flavor.

## What's here

- `app/` — Expo Router routes. One screen per primitive.
- `components/` — `ShowcaseFrame`, `ThemePicker`, `CategorySidebar`,
  `ThemeContext`, and the `catalog.ts` registry.
- `wrangler.toml` — Cloudflare Pages config. Project name
  `otf-ui-native-storybook`, output `dist/`, with
  `not_found_handling = "single-page-application"` so Expo Router deep-links
  survive a hard refresh.

## Run locally

From this directory:

```bash
bun install
bun run dev               # web   → http://localhost:3010
bun run dev:native        # iOS / Android via Expo Dev Tools
```

Web-only is enough for catalog work; native is for verifying
platform-specific renderers (e.g. `Pressable` on iOS).

<details>
<summary><b>Optional · experimental:</b> stable HTTPS preview at <code>https://showcase.localhost</code></summary>

Skip this unless `localhost:3010` is actually getting in your way. `bun run dev` is the supported path.

```bash
npx portless trust    # one-time: local CA + port 443 (asks for sudo)
npx portless           # → https://showcase.localhost
```

Caveats: sudo prompt on first run, portless is pre-1.0, fully reversible via `npx portless clean`.

</details>

## Add a new entry

1. **Drop a screen** at `app/<category>/<slug>.tsx`.
   Use `ShowcaseFrame` + `Section` from `../../components/ShowcaseFrame`.
   Import primitives only from `@otfdashkit/ui-native` — never raw Tamagui.

2. **Register it** in `components/catalog.ts`:

   ```ts
   {
     slug: 'my-new-thing',
     title: 'My New Thing',
     description: 'One line that fits on a sidebar row.',
     status: 'ready', // or 'stub' | 'coming-soon'
   }
   ```

3. **Confirm the sidebar** picks it up (`bun run dev`) and that every prop
   variant has its own `<Section>` block.

That's it — the route is auto-discovered by Expo Router and the sidebar
reads from the catalog.

### Screen template

```tsx
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'
import { Chip, XStack } from '@otfdashkit/ui-native'

export default function MyShowcase() {
  return (
    <ShowcaseFrame
      title="My Component"
      description="One sentence on what it is."
    >
      <Section title="Variants">
        <XStack gap="$2">
          <Chip label="A" />
          <Chip label="B" selected />
        </XStack>
      </Section>
    </ShowcaseFrame>
  )
}
```

## Theme + palette switching

The header has a palette dropdown + light/dark toggle (see
`components/ThemePicker.tsx`). Selection persists in `localStorage` on web.

The picker uses the 8 Tamagui-shipped accent themes (`gray`, `blue`, `green`,
`red`, `purple`, `orange`, `yellow`, `pink`) from `@tamagui/config/v5`.
Switching to OTF's full design themes (`mono`, `ocean-teal`, `warm-amber`, …)
requires wiring `getOtfThemePalettes()` through `createThemes()` from
`@tamagui/theme-builder` — left as a follow-up.

## Build for production

```bash
bun run build:web   # → dist/  (static HTML/JS/CSS via expo export)
```

## Deploy

Production deploys are automated via GitHub Actions: every push to `main`
that touches the showcase rebuilds and ships to Cloudflare Pages
(project `otf-ui-native-storybook`, alias `https://native.otf-kit.dev`).
The phone-frame wrapper at `https://native-preview.otf-kit.dev/`
(project `otf-ui-native-storybook-preview`) iframes this URL and adds
the per-component QR card &mdash; that's the URL we share with visitors.

For an emergency manual deploy (after sourcing
`CLOUDFLARE_ACCOUNT_ID` + `CLOUDFLARE_API_TOKEN` into your shell):

```bash
bun run deploy
```

First-time setup of the Pages project — only ever needed once:

```bash
npx wrangler pages project create otf-ui-native-storybook
```

## License

MIT — see [LICENSE](./LICENSE).
