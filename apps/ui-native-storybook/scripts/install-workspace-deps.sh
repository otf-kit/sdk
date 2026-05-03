#!/usr/bin/env bash
# Physically copy the OTF workspace packages into this app's node_modules.
#
# Why: the showcase is isolated from the pnpm workspace (see top-level
# pnpm-workspace.yaml `!apps/ui-native-storybook`) so it runs its own
# React + Tamagui stack. But package.json declares `@otf/ui-native` and
# `@otf/tokens` as `file:../../packages/<name>` which npm materialises as
# symlinks. Metro's resolver can't follow those symlinks without pointing
# `watchFolders` at the monorepo root — which in turn leaks the root pnpm
# store and causes "Incompatible React versions" mismatches.
#
# Copying the packages physically lets Metro resolve them without any
# watchFolder gymnastics, AND keeps the app cleanly isolated from the
# root workspace.
#
# Run automatically via the `predev` and `prebuild:web` package.json
# lifecycle scripts. Safe to run repeatedly — overwrites the same paths.

set -euo pipefail

APP_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MONO_ROOT="$(cd "$APP_ROOT/../.." && pwd)"
TARGET="$APP_ROOT/node_modules/@otf"

mkdir -p "$TARGET"

for pkg in tokens ui-native; do
  src="$MONO_ROOT/packages/$pkg"
  dst="$TARGET/$pkg"

  if [ ! -d "$src" ]; then
    echo "  ✘ source missing: $src" >&2
    exit 1
  fi

  # Build the package's dist/ if missing (tsup outputs).
  if [ ! -d "$src/dist" ]; then
    echo "  → building @otf/$pkg…"
    (cd "$src" && bun run build >/dev/null 2>&1) || true
  fi

  # Replace any existing target (symlink or directory).
  if [ -e "$dst" ] || [ -L "$dst" ]; then
    rm -rf "$dst"
  fi

  # Copy the package contents excluding noisy paths. We copy the whole
  # package (not just dist/) because Tailwind / metro may scan src/.
  rsync -a \
    --exclude 'node_modules' \
    --exclude '.turbo' \
    --exclude '.expo' \
    --exclude '__tests__' \
    --exclude '*.test.*' \
    "$src/" "$dst/"

  echo "  ✓ installed @otf/$pkg → node_modules/@otf/$pkg"
done
