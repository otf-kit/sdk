# `@otfdashkit/cli`

Add OTF UI Native components to your Expo / React Native project.

For lightweight components (Button, Card, Tabs, etc.) — install the npm package:

```bash
npm install @otfdashkit/ui-native
```

For **heavy-peer components** (Skia shaders, Lottie, MMKV, Notifee, etc.), the npm route forces every consumer to install peers they may not need. Use this CLI instead — it copies the source into your project so you only pay for what you use.

## Quick start

```bash
# 1. Initialize once per project
npx @otfdashkit/cli init

# 2. Add a component
npx @otfdashkit/cli add shockwave

# 3. Install the peer deps it prints
npm install @shopify/react-native-skia@2.2.12 react-native-reanimated@~4.1.0 react-native-worklets@0.5.1
```

That's it. The component source lives in your project (default: `src/components/<category>/<name>/`). You own the code — edit it freely.

## Commands

| Command | Description |
|---|---|
| `init` | Create `component.config.json` (asks for `outDir`) |
| `list` | List available components, optionally filter by `--category` |
| `add <name>` | Copy `<name>` into your project, prompt to install peers |
| `add` (no name) | Interactive autocomplete picker |

### `add` flags

| Flag | Description |
|---|---|
| `-o, --overwrite` | Replace existing files without confirmation |
| `-d, --dir <dir>` | Override `component.config.json` outDir |
| `-y, --yes` | Skip all confirmation prompts |

## Configuration

`component.config.json` (created by `init`):

```jsonc
{
  "outDir": "src/components",
  "registryUrl": "https://r.otf-kit.dev"  // optional override
}
```

Or set the registry via env: `OTF_REGISTRY_URL=https://staging.r.otf-kit.dev`.

## What's in the registry?

Source: [`packages/ui-native/registry/registry.json`](https://github.com/otf-kit/sdk/blob/main/packages/ui-native/registry/registry.json) — auto-deployed to `https://r.otf-kit.dev/registry.json` on every push to main.

| Component | Category | Platform |
|---|---|---|
| `shockwave` | patterns | native-only |

(One component shipped at v0.1.0 — more on the way.)

## Why a registry-based CLI?

Same model as [shadcn/ui](https://ui.shadcn.com/) and [reacticx](https://www.reacticx.com/) (the original Shockwave author). Heavy native peers don't bundle through npm cleanly — `peerDependenciesMeta.optional` is honored at install time but not at bundle time, so every consumer would pay for every peer. Source-distribution sidesteps that entirely. Full rationale: [`docs/sdk-design.md`](https://github.com/otf-kit/sdk/blob/main/docs/sdk-design.md#heavy-peer-components--cli-registry-only).

## License

MIT
