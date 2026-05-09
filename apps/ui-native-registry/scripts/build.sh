#!/usr/bin/env bash
# Build the registry static site.
#
# Layout produced under `dist/`:
#   dist/registry.json                          # the registry manifest
#   dist/components/<name>/<files>              # raw source files served as text
#   dist/index.html                             # tiny landing page (so root isn't 404)
#
# Invariant: every file referenced by registry.json must exist in dist/. The
# verify.sh script enforces this end-to-end before deploy.

set -euo pipefail

APP_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MONO_ROOT="$(cd "$APP_ROOT/../.." && pwd)"
SRC="$MONO_ROOT/packages/ui-native/registry"
DIST="$APP_ROOT/dist"

if [ ! -d "$SRC" ]; then
  echo "ERROR: source registry missing at $SRC" >&2
  exit 1
fi
if [ ! -f "$SRC/registry.json" ]; then
  echo "ERROR: $SRC/registry.json missing" >&2
  exit 1
fi

echo "▸ Cleaning $DIST"
rm -rf "$DIST"
mkdir -p "$DIST"

echo "▸ Copying registry tree → dist/"
# rsync preserves the registry.json + components/ shape exactly.
rsync -a --exclude '.DS_Store' "$SRC/" "$DIST/"

# Drop a tiny landing page so visitors hitting the root get something useful
# instead of a 404. Cloudflare Pages serves index.html for `/` automatically.
cat > "$DIST/index.html" <<'HTML'
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>OTF UI Native — Component Registry</title>
  <meta name="description" content="Shadcn-style copy-paste registry for @otfdashkit/ui-native. Heavy-peer components (Skia, Lottie, etc.) shipped as source." />
  <style>
    :root { color-scheme: dark; }
    html, body { margin: 0; padding: 0; background: #0a0a0a; color: #f5f5f5; font: 16px/1.6 ui-sans-serif, system-ui, -apple-system; }
    main { max-width: 640px; margin: 6vh auto; padding: 0 24px; }
    h1 { font-size: 32px; font-weight: 700; margin: 0 0 12px; letter-spacing: -0.02em; }
    h2 { font-size: 18px; font-weight: 600; margin: 32px 0 8px; color: #fb923c; }
    p { color: #a3a3a3; }
    code, pre { font: 14px/1.5 ui-monospace, "SFMono-Regular", Menlo, monospace; background: #171717; border: 1px solid #262626; padding: 2px 6px; border-radius: 4px; }
    pre { padding: 14px; overflow-x: auto; }
    a { color: #fb923c; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .registry-link { display: inline-block; margin-top: 8px; }
  </style>
</head>
<body>
  <main>
    <h1>OTF UI Native Registry</h1>
    <p>Shadcn-style copy-paste registry. Heavy-peer components (Skia, Lottie, MMKV, Notifee, etc.) ship as source — the npm package <code>@otfdashkit/ui-native</code> stays peer-light.</p>
    <h2>Install a component</h2>
    <pre>npx @otfdashkit/cli init
npx @otfdashkit/cli add shockwave</pre>
    <h2>Browse the registry</h2>
    <p><a class="registry-link" href="/registry.json">/registry.json</a> · <a href="https://github.com/otf-kit/sdk">source on GitHub</a> · <a href="https://otf-kit.dev">otf-kit.dev</a></p>
  </main>
</body>
</html>
HTML

# Cloudflare Pages headers config. Pages reads `_headers` (NOT wrangler.toml's
# `[[headers]]` blocks — those are for Workers, ignored on Pages). We need:
#   - components served as `text/plain` so consumers can fetch + write the
#     source verbatim without browser parsing the .tsx as something else
#   - registry.json with CORS open (CLI uses `fetch` from any origin)
#   - short cache so manifest updates propagate quickly
#   - longer cache on component source (changes only on republish)
# Reference: https://developers.cloudflare.com/pages/configuration/headers/
cat > "$DIST/_headers" <<'HEADERS'
/registry.json
  Cache-Control: public, max-age=60, s-maxage=60
  Content-Type: application/json; charset=utf-8
  Access-Control-Allow-Origin: *

/components/*
  Cache-Control: public, max-age=300, s-maxage=300
  Content-Type: text/plain; charset=utf-8
  Access-Control-Allow-Origin: *
HEADERS

echo "▸ dist/ contents:"
find "$DIST" -type f | sed "s|^$DIST/|  |" | sort

# Final invariant check — every registry-listed file must exist in dist/.
node "$APP_ROOT/scripts/verify.mjs" "$DIST"

echo "✓ Build complete: $DIST"
