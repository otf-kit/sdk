# `@otfdashkit/ui-native` showcase

Expo-web shell that exercises every primitive, block, layout, and pattern in [`@otfdashkit/ui-native`](https://www.npmjs.com/package/@otfdashkit/ui-native) — every prop variant on every palette in light + dark.

## Live

- **[native-preview.otf-kit.dev](https://native-preview.otf-kit.dev/)** — phone-frame wrapper with a per-component QR. Scan and land on the same component on a real iOS / Android device via the OTF preview app.
- **[native.otf-kit.dev](https://native.otf-kit.dev/)** — the bare showcase (no phone frame, no QR).

## What's here

- `app/` — Expo Router routes. One screen per primitive.
- `components/` — `ShowcaseFrame`, `ThemePicker`, `CategorySidebar`, `ThemeContext`, and the `catalog.ts` registry
- `wrangler.toml` — Cloudflare Pages config (project `otf-ui-native-storybook`, SPA fallback for deep links)

## Run locally

```bash
bun install
bun run dev               # web   → http://localhost:3010
bun run dev:native        # iOS / Android via Expo Dev Tools
```

Web-only is enough for catalog work; native is for verifying platform-specific renderers (e.g. `Pressable` on iOS).

## Add a new entry

1. **Drop a screen** at `app/<category>/<slug>.tsx`. Use `ShowcaseFrame` + `Section` from `../../components/ShowcaseFrame`. Import primitives only from `@otfdashkit/ui-native` — never raw Tamagui.

2. **Register it** in `components/catalog.ts`:

   ```ts
   {
     slug: 'my-new-thing',
     title: 'My New Thing',
     description: 'One line that fits on a sidebar row.',
     status: 'ready', // or 'stub' | 'coming-soon'
   }
   ```

3. **Confirm the sidebar** picks it up (`bun run dev`) and that every prop variant has its own `<Section>` block.

The route is auto-discovered by Expo Router; the sidebar reads from the catalog.

### Screen template

```tsx
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'
import { Chip, XStack } from '@otfdashkit/ui-native'

export default function MyShowcase() {
  return (
    <ShowcaseFrame title="My Component" description="One sentence on what it is.">
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

The header has a palette dropdown + light/dark toggle (`components/ThemePicker.tsx`). Selection persists in `localStorage` on web. Currently uses the 8 Tamagui-shipped accent themes (`gray`, `blue`, `green`, `red`, `purple`, `orange`, `yellow`, `pink`) from `@tamagui/config/v5`. Wiring `getOtfThemePalettes()` through `createThemes()` from `@tamagui/theme-builder` is a follow-up.

## Build for production

```bash
bun run build:web   # → dist/  (static HTML/JS/CSS via expo export)
```

## Deploy

Auto-deploys on push to `main` via GitHub Actions (`.github/workflows/deploy-ui-native-showcase.yml`). Ships to Cloudflare Pages project `otf-ui-native-storybook` → `https://native.otf-kit.dev`. The phone-frame wrapper at `https://native-preview.otf-kit.dev/` (project `otf-ui-native-storybook-preview`) iframes this URL and adds the per-component QR card.

Manual deploy (after sourcing `CLOUDFLARE_ACCOUNT_ID` + `CLOUDFLARE_API_TOKEN`):

```bash
bun run deploy
```

First-time Pages project setup (one-shot):

```bash
npx wrangler pages project create otf-ui-native-storybook
```

## Works with

- **Claude Code**, **Cursor**, **Lovable**, **Bolt** — every showcase route mirrors how feature code should consume `@otfdashkit/ui-native` (no raw Tamagui imports).

## Community

**[discord.gg/gpXyu7SqNZ](https://discord.gg/gpXyu7SqNZ)** — questions, bugs, feature requests.

## License

MIT — see [LICENSE](./LICENSE).

---

Project home: [OTF — kits and open SDK](https://otf-kit.dev). Pricing, docs, and the full component catalog.
