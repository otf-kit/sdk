#!/usr/bin/env bash
set -euo pipefail
APP_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
node "$APP_ROOT/scripts/verify.mjs" "$APP_ROOT/dist"
