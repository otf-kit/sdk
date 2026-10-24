#!/usr/bin/env bash
set -euo pipefail
APP_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
# The shockwave entry is compared with the source registry, the same file build.sh passes (verify.mjs:98).
SRC_REGISTRY="$APP_ROOT/../../packages/ui-native/registry/registry.json"
node "$APP_ROOT/scripts/verify.mjs" "$APP_ROOT/dist" "$SRC_REGISTRY"
