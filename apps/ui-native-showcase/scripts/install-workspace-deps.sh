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

  # Build dist/ if missing — Metro resolves via package.json `main`/`exports`
  # which point at dist/index.mjs, so a fresh checkout needs this.
  if [ ! -d "$src/dist" ]; then
    echo "  → building @otfdashkit/$pkg…"
    (cd "$src" && bun run build >/dev/null 2>&1) || true
  fi

  # Replace any existing target (symlink or directory).
  if [ -e "$dst" ] || [ -L "$dst" ]; then
    rm -rf "$dst"
  fi

  # Copy package contents (not just dist/) — Metro/Tailwind may scan src/.
  rsync -a \
    --exclude 'node_modules' \
    --exclude '.turbo' \
    --exclude '.expo' \
    --exclude '__tests__' \
    --exclude '*.test.*' \
    "$src/" "$dst/"

  echo "  ✓ installed @otfdashkit/$pkg → node_modules/@otfdashkit/$pkg"
done
