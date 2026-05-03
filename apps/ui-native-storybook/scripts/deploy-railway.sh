#!/usr/bin/env bash
# Deploy ui-native-storybook to Railway.
#
# Local-build pattern (matches the Dockerfile, which just COPYs dist/).
# We build @otf/ui-native + @otf/tokens, then bun install (resolves
# workspace symlinks), then expo export — everything is webpack-bundled
# into dist/, so the Dockerfile doesn't need to install workspace deps.
#
# Requires RAILWAY_API_TOKEN in env (sourced from repo-root .env).
#
# NOTE — Railway project + service IDs are TBD. Fill them in once the
# Railway project is provisioned. Until then, this script will refuse
# to run (exit 1) at the railway link step.

set -euo pipefail

RAILWAY_PROJECT_ID="${RAILWAY_PROJECT_ID:-TBD}"
RAILWAY_ENVIRONMENT="${RAILWAY_ENVIRONMENT:-production}"
RAILWAY_SERVICE_NAME="${RAILWAY_SERVICE_NAME:-ui-native-storybook}"

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
REPO_ROOT="$(cd "$APP_DIR/../.." && pwd)"

if [ -f "$REPO_ROOT/.env" ]; then
  set -a; source "$REPO_ROOT/.env"; set +a
  echo "-> loaded .env from $REPO_ROOT"
fi

if [ -z "${RAILWAY_API_TOKEN:-}" ] && [ -n "${RAILWAY_TOKEN:-}" ]; then
  export RAILWAY_API_TOKEN="$RAILWAY_TOKEN"
fi

if [ -z "${RAILWAY_API_TOKEN:-}" ]; then
  echo "X  RAILWAY_API_TOKEN not set. Add it to $REPO_ROOT/.env"
  exit 1
fi

if [ "$RAILWAY_PROJECT_ID" = "TBD" ]; then
  echo "X  RAILWAY_PROJECT_ID is TBD. Provision a Railway project for ui-native-storybook"
  echo "   and either export RAILWAY_PROJECT_ID=... or hardcode it in this script."
  exit 1
fi

echo "-> building @otf/tokens + @otf/ui-native..."
cd "$REPO_ROOT"
pnpm --filter @otf/tokens    build
pnpm --filter @otf/ui-native build

echo "-> building ui-native-storybook (expo export + server bundle)..."
cd "$APP_DIR"
rm -rf dist
bun run build

cd "$APP_DIR"

echo "-> railway link -> $RAILWAY_PROJECT_ID / $RAILWAY_ENVIRONMENT / $RAILWAY_SERVICE_NAME ..."
railway link \
  --project "$RAILWAY_PROJECT_ID" \
  --environment "$RAILWAY_ENVIRONMENT" \
  --service "$RAILWAY_SERVICE_NAME" \
  >/dev/null

echo "-> railway up..."
echo "$(date +%s)" > .build-timestamp
railway up --service "$RAILWAY_SERVICE_NAME" --detach --ci

echo "OK deploy queued -- check status:"
echo "   railway status"
echo "   railway logs --service $RAILWAY_SERVICE_NAME"
