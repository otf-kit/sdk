# @otf/ui-native showcase

The "Storybook home" for `@otf/ui-native` — a custom Expo-web shell that
exercises every primitive, interface block, layout, and pattern with all
of their prop variants on every palette in light + dark.

> Why custom and not `@storybook/react-native`?
> See the ADR: `docs/adr/2026-05-03-mobile-primitives-decisions.md` (sec. 5).
> Short version: Storybook RN's web export is brittle and we already run a
> custom shell at `apps/storybook-web/` for `@otf/ui` — same approach, native
> flavor.

## What's here

- `app/` — Expo Router routes. One screen per primitive.
- `components/` — `ShowcaseFrame`, `ThemePicker`, `CategorySidebar`,
  `ThemeContext`, and the `catalog.ts` registry.
- `server/static.ts` — Bun static-file server for the deployed demo.
- `scripts/deploy-railway.sh` — local-build deploy script (mirrors fitness-kit).
- `Dockerfile` — slim runner for the deployed dist/.

## Run locally

From the repo root:

```bash
pnpm install                                        # workspace-wide
pnpm --filter @otf/tokens    build                  # one-time
pnpm --filter @otf/ui-native build                  # one-time
pnpm --filter @otf/ui-native-storybook dev          # web -> http://localhost:3010
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
   Import primitives only from `@otf/ui-native` — never raw Tamagui.

2. **Register it** in `components/catalog.ts`:

   ```ts
   {
     slug: 'my-new-thing',
     title: 'My New Thing',
     description: 'One line that fits on a sidebar row.',
     status: 'ready', // or 'stub' | 'coming-soon'
   }
   ```

3. **Confirm the sidebar** picks it up (`pnpm --filter @otf/ui-native-storybook dev`)
   and that every prop variant has a `<Section>` block.

That's it — the route is auto-discovered by Expo Router and the sidebar reads
from the catalog.

### Screen template

```tsx
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'
import { Chip, XStack } from '@otf/ui-native'

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
bun run build      # expo export -> dist/, server bundle -> dist/server/static.js
bun run start      # serves dist/ on PORT (default 3001)
```

## Deploy

```bash
bash scripts/deploy-railway.sh
```

Provision the Railway project + service first, then either export
`RAILWAY_PROJECT_ID` / `RAILWAY_SERVICE_NAME` or hardcode them in the script.
The deploy mirrors `kits/fitness-kit/scripts/deploy-railway.sh` exactly:

1. Build `@otf/tokens` + `@otf/ui-native` (workspace deps the bundler reads).
2. `bun run build` -> `dist/` (web export + server bundle).
3. `railway up --detach --ci` ships the slim Bun runtime.

## Out of scope for v1

- Code/Preview tab toggle (preview only for now).
- Automatic prop-table introspection (each Section is hand-authored).
- Search across primitives (sidebar filter only).

These ride on top of the same shell once they're needed.
