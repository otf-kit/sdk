# @otfdashkit/ui-native showcase

The "Storybook home" for `@otfdashkit/ui-native` — a custom Expo-web shell that
exercises every primitive, interface block, layout, and pattern with all
of their prop variants on every palette in light + dark.

> Why custom and not `@storybook/react-native`?
> See the ADR: `docs/adr/2026-05-03-mobile-primitives-decisions.md` (sec. 5).
> Short version: Storybook RN's web export is brittle and we already run a
> custom shell at `apps/storybook-web/` for `@otfdashkit/ui` — same approach, native
> flavor.

## What's here

- `app/` — Expo Router routes. One screen per primitive.
- `components/` — `ShowcaseFrame`, `ThemePicker`, `CategorySidebar`,
  `ThemeContext`, and the `catalog.ts` registry.
- `wrangler.toml` — Cloudflare Pages config. Project name
  `otf-ui-native-storybook`, output `dist/`, `not_found_handling =
  "single-page-application"` so Expo Router deep-links work on hard refresh.

## Run locally

From the repo root:

```bash
pnpm install                                        # workspace-wide
pnpm --filter @otfdashkit/tokens    build                  # one-time
pnpm --filter @otfdashkit/ui-native build                  # one-time
pnpm --filter @otfdashkit/ui-native-storybook dev          # web -> http://localhost:3010
```

Or from this directory:

```bash
bun install
bun run dev               # web -> http://localhost:3010
bun run dev:native        # iOS / Android via Expo Dev Tools
```

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

3. **Confirm the sidebar** picks it up (`pnpm --filter @otfdashkit/ui-native-storybook dev`)
   and that every prop variant has a `<Section>` block.

That's it — the route is auto-discovered by Expo Router and the sidebar reads
from the catalog.

### Screen template

```tsx
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'
import { Chip, XStack } from '@otfdashkit/ui-native'

export default function MyShowcase() {
  return (
    <ShowcaseFrame
      title="My Component"
      description="One sentence on what it is."
      docPath="packages/ui-native/src/patterns/MyComponent.tsx"
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
Switching to OTF's 16 design themes (`mono`, `ocean-teal`, `warm-amber`, ...)
requires wiring `getOtfThemePalettes()` through `createThemes()` from
`@tamagui/theme-builder` in this app's tamagui config — left for a follow-up.

## Build for production

```bash
bun run build      # expo export --platform web --output-dir dist
bun run preview    # local serve of dist/ for sanity check
```

## Deploy

Deployed to Cloudflare Pages, mirroring how `apps/storybook-web/` ships:

```bash
pnpm --filter @otfdashkit/ui-native-storybook deploy
# or from this directory
bun run deploy
```

The script `set -a && . ../../.env && set +a && pnpm build && npx wrangler
pages deploy dist --project-name otf-ui-native-storybook --commit-dirty=true`
sources Cloudflare credentials from the repo-root `.env`
(`CLOUDFLARE_ACCOUNT_ID` + `CLOUDFLARE_API_TOKEN`), runs the Expo web
export, and ships the static `dist/` to Cloudflare.

First-time setup: provision the Pages project once via
`npx wrangler pages project create otf-ui-native-storybook` (run from this
dir after sourcing `.env`). Subsequent deploys reuse the project.

Live URL after first deploy: `https://native.otf-kit.dev`.

## Out of scope for v1

- Code/Preview tab toggle (preview only for now).
- Automatic prop-table introspection (each Section is hand-authored).
- Search across primitives (sidebar filter only).

These ride on top of the same shell once they're needed.
