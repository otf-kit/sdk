<h1 align="center">@otfdashkit/cli</h1>

<p align="center">
  Source-copy installer for heavy-peer OTF UI Native components. shadcn-style.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@otfdashkit/cli" target="_blank">
    <img src="https://img.shields.io/npm/v/@otfdashkit/cli?style=flat-square&color=000" alt="npm version">
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="MIT License">
</p>

---

## When to use this

For **lightweight components** (Button, Card, Tabs, …) — install the npm package:

```bash
npm install @otfdashkit/ui-native
```

For **heavy-peer components** (Skia shaders, Reanimated worklets, Lottie, MMKV, Notifee, …) the npm route would force every consumer to install peers they may not need. This CLI copies the source into your project so you only pay for what you use, and you own the code.

## Quick start

```bash
# 1. Initialize once per project
npx @otfdashkit/cli init

# 2. Add a component
npx @otfdashkit/cli add shockwave

# 3. Install the peer deps it prints
npm install @shopify/react-native-skia@2.2.12 react-native-reanimated@~4.1.0 react-native-worklets@0.5.1
```

The component source lives in your project (default: `src/components/<category>/<name>/`). Edit it freely — it's your code.

## Commands

| Command | What it does |
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

## What's in the registry

Source: [`packages/ui-native/registry/registry.json`](https://github.com/otf-kit/sdk/blob/main/packages/ui-native/registry/registry.json) — auto-deployed to `https://r.otf-kit.dev/registry.json` on every push to `main`.

| Component | Category | Platform |
|---|---|---|
| `shockwave` | patterns | native-only |

(One component at v0.1.0 — more on the way.)

## Why a registry-based CLI

Same model as [shadcn/ui](https://ui.shadcn.com/) and [reacticx](https://www.reacticx.com/) (the original Shockwave author). Heavy native peers don't bundle through npm cleanly — `peerDependenciesMeta.optional` is honored at install time but not at bundle time, so every consumer would pay for every peer. Source-distribution sidesteps that entirely. Full rationale: [`docs/sdk-design.md`](https://github.com/otf-kit/sdk/blob/main/docs/sdk-design.md#heavy-peer-components--cli-registry-only).

## Works with

- **Claude Code**, **Cursor**, **Lovable**, **Bolt** — each registry entry ships JSDoc + a `prompts.md` with tested usage patterns

## Community

**[discord.gg/gpXyu7SqNZ](https://discord.gg/gpXyu7SqNZ)** — questions, bugs, feature requests.

## License

MIT. You own the source. Eject any time. Copyright &copy; otfdashkit.
