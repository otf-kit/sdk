#!/usr/bin/env bash
# Publish a new JS bundle to the `preview` channel on EAS Update.
#
# Why this script exists:
# The OTF Native UI preview app (built once via `eas build --profile
# preview --platform all`) ships installed on testers' phones. JS-only
# changes don't need a rebuild — `eas update --channel preview` pushes
# the new bundle and every installed preview app picks it up on next
# launch.
#
# This is the auto-update path the storybook-preview shell points at:
#   https://qr.expo.dev/eas-update?projectId=...&channel=preview
# That URL stays the same forever; what changes is which bundle the
# channel points at. This script flips that pointer.
#
# Usage:
#   ./scripts/publish-eas-update.sh "Add Shockwave native-only fallback"
#   ./scripts/publish-eas-update.sh                # auto-message from git
#
# Requires: EAS CLI logged in (`eas login`) — see `npx eas-cli whoami`.

set -euo pipefail

APP_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$APP_ROOT"

# Default message: short git-log summary of last commit on this branch.
DEFAULT_MSG="$(git log -1 --pretty=format:'%s' 2>/dev/null || echo 'Update bundle')"
MESSAGE="${1:-$DEFAULT_MSG}"

# Make sure local SDK packages are fresh inside node_modules — this is
# what the showcase runs against, since pnpm-workspace excludes us.
bash scripts/install-workspace-deps.sh

# eas-cli is invoked via npx so we don't need to install it as a dep.
echo "→ Publishing to channel=preview with message:"
echo "  \"$MESSAGE\""
echo ""

npx eas-cli@latest update \
  --channel preview \
  --message "$MESSAGE" \
  --non-interactive

echo ""
echo "✓ Update published. The QR at"
echo "    https://qr.expo.dev/eas-update?...&channel=preview"
echo "  will load this bundle next time it's scanned."
