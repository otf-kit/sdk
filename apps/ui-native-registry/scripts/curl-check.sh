#!/usr/bin/env bash
# curl-check.sh <base-url> — checks the live or local registry: every in-scope <slug>.json is valid JSON served as
# application/json with its own name; registry.json lists exactly the in-scope slugs plus shockwave; an unknown
# slug returns 404. Run locally against dist/ before a deploy, and against https://r.otf-kit.dev after it.
set -euo pipefail
BASE="${1:?usage: curl-check.sh <base-url>}"
BASE="${BASE%/}"
APP_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SLUGS_FILE="$APP_ROOT/scripts/ui-slugs.json"

python3 - "$BASE" "$SLUGS_FILE" <<'PY'
import json, subprocess, sys, uuid
base, slugs_file = sys.argv[1], sys.argv[2]
slugs = [e["slug"] for e in json.load(open(slugs_file))]
fails = []

def get(path):
    out = subprocess.run(["curl", "-s", "-m", "20", "-o", "-", "-w", "\n%{http_code} %{content_type}", f"{base}/{path}"],
                         capture_output=True, text=True).stdout
    body, _, meta = out.rpartition("\n")
    code, _, ctype = meta.partition(" ")
    return code, ctype, body

for slug in slugs:
    code, ctype, body = get(f"{slug}.json")
    if code != "200": fails.append(f"{slug}.json status {code}"); continue
    if "application/json" not in ctype: fails.append(f"{slug}.json content-type {ctype}"); continue
    try:
        item = json.loads(body)
    except ValueError:
        fails.append(f"{slug}.json is not valid JSON"); continue
    if item.get("name") != slug or not item.get("files"): fails.append(f"{slug}.json has the wrong name or no files")

code, ctype, body = get("registry.json")
if code != "200": fails.append(f"registry.json status {code}")
else:
    listed = sorted(json.loads(body).get("components", {}).keys())
    want = sorted(slugs + ["shockwave"])
    if listed != want:
        extra = sorted(set(listed) - set(want)); missing = sorted(set(want) - set(listed))
        fails.append(f"registry.json differs: extra {extra[:5]}, missing {missing[:5]}")

code, _, _ = get(f"does-not-exist-{uuid.uuid4().hex[:8]}.json")
if code != "404": fails.append(f"unknown slug returned {code}, want 404")

if fails:
    print("✘ curl-check failed:"); [print("  -", f) for f in fails]; sys.exit(1)
print(f"✓ curl-check: {len(slugs)} items are valid JSON with application/json; registry.json lists exactly these plus shockwave; unknown slug 404.")
PY
