#!/usr/bin/env bash
# Physically copy the OTF workspace packages into this app's node_modules.
#
# WHY THIS EXISTS:
#
# The showcase is INTENTIONALLY isolated from the pnpm workspace (see
# top-level pnpm-workspace.yaml `!apps/ui-native-showcase`) so it runs
# its own React + Tamagui stack — sharing peer deps with the workspace
# caused "Incompatible React versions" crashes in the bundle.
#
# But package.json declares `@otf/ui-native` and `@otf/tokens` as
# `file:../../packages/<name>`, which `npm install` materialises as
# SYMLINKS in node_modules. Metro's default resolver in Expo SDK 54
# does NOT follow those symlinks reliably for nested-route imports
# (verified May 2026: bundle fails with "Unable to resolve '@otf/ui-native'
# from app/interface/dialog.tsx" even though the symlink resolves on the
# command line). The two known fixes both have downsides:
#
#   1. Set `metro.config.js` watchFolders to the monorepo root.
#      Side-effect: re-bridges the showcase to the root pnpm store and
#      brings back the dual-React mismatch we were specifically isolating from.
#
#   2. Use @tamagui/metro-plugin's resolver-aware withTamagui(config).
#      Side-effect: pulls Tamagui peer deps into the consumer, causing
#      duplicated Tamagui copies in the bundle and "Can't find Tamagui
#      configuration" runtime errors from `createTamagui` returning a
#      different singleton than the one the components were compiled against.
#
# Copying the packages physically (this script) avoids both. Metro sees
# real files at `node_modules/@otf/<name>` and resolves them like any
# regular npm package. The cost is that updates to packages/ui-native/src
# require re-running this script + rebuilding dist/ — that's what the
# `predev` and `prebuild:web` lifecycle hooks in package.json handle.
#
# Safe to run repeatedly — overwrites the same paths.

set -euo pipefail

APP_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MONO_ROOT="$(cd "$APP_ROOT/../.." && pwd)"
TARGET="$APP_ROOT/node_modules/@otfdashkit"

mkdir -p "$TARGET"

for pkg in tokens ui-native; do
  src="$MONO_ROOT/packages/$pkg"
  dst="$TARGET/$pkg"

  if [ ! -d "$src" ]; then
    echo "  ✘ source missing: $src" >&2
    exit 1
  fi

  # ALWAYS rebuild dist/ — Metro resolves via package.json `exports` /
  # `main` / `module` which point at `dist/`. A stale dist from a previous
  # branch could be silently reused. Build is ~30ms — cheap insurance.
  # Use pnpm if available (CI path), fall back to bun (local dev path).
  # Hard-fail if both fail — silently using stale dist masks broken SDK
  # changes until they surface as runtime errors in the bundle.
  echo "  → rebuilding @otfdashkit/$pkg…"
  built=0
  if command -v pnpm >/dev/null 2>&1; then
    if (cd "$src" && pnpm run build >/dev/null 2>&1); then built=1; fi
  fi
  if [ "$built" -eq 0 ] && command -v bun >/dev/null 2>&1; then
    if (cd "$src" && bun run build >/dev/null 2>&1); then built=1; fi
  fi
  if [ "$built" -eq 0 ]; then
    echo "  ✘ build failed for @otfdashkit/$pkg — re-run with verbose output:" >&2
    echo "    (cd $src && pnpm run build)  # or: bun run build" >&2
    exit 1
  fi

  # Replace any existing target (symlink or directory).
  if [ -e "$dst" ] || [ -L "$dst" ]; then
    rm -rf "$dst"
  fi

  # Copy package contents (not just dist/) — Metro/Tailwind may scan src/.
  # Exclude `registry/` — heavy-peer components live there and import Skia /
  # worklets / etc. at module top-level. They're consumed by the showcase
  # via a separate rsync below (registry → apps/ui-native-showcase/registry-local/),
  # NOT through the npm-style package copy. Including registry/ here would
  # mean the showcase's `node_modules/@otfdashkit/ui-native/registry/` has
  # the heavy-peer source — currently inert (metro doesn't traverse it via
  # `package.json#exports`) but a footgun for future bundler/scanner upgrades.
  rsync -a \
    --exclude 'node_modules' \
    --exclude '.turbo' \
    --exclude '.expo' \
    --exclude '__tests__' \
    --exclude '*.test.*' \
    --exclude 'registry' \
    "$src/" "$dst/"

  echo "  ✓ installed @otfdashkit/$pkg → node_modules/@otfdashkit/$pkg"
done

# ── Copy CLI-only registry components into the showcase's local source ─────
# Heavy-peer components (Shockwave, future Lottie/MMKV/etc.) are NOT shipped
# via the npm package — they ship as source via the shadcn CLI registry. The
# showcase IS a consumer, so it gets a local copy at `registry-local/<name>/`,
# exactly as a kit consumer would after `npx @otfdashkit/cli add <name>`.
#
# Target is `registry-local/`, NOT `components/`, so we don't have to gitignore
# components/<name>/ for every new heavy-peer component (`components/` is for
# the showcase's OWN code: ShowcaseFrame, ThemePicker, catalog, etc.). The
# whole `registry-local/` dir is gitignored — single ignore line, scales.
REGISTRY_LOCAL="$APP_ROOT/registry-local"
REGISTRY_SRC="$MONO_ROOT/packages/ui-native/registry/components"
if [ -d "$REGISTRY_SRC" ]; then
  mkdir -p "$REGISTRY_LOCAL"
  for comp_dir in "$REGISTRY_SRC"/*/; do
    [ -d "$comp_dir" ] || continue
    comp_name=$(basename "$comp_dir")
    dst="$REGISTRY_LOCAL/$comp_name"
    if [ -e "$dst" ] || [ -L "$dst" ]; then rm -rf "$dst"; fi
    rsync -a "$comp_dir" "$dst/"
    echo "  ✓ installed registry component '$comp_name' → registry-local/$comp_name"
  done
fi
