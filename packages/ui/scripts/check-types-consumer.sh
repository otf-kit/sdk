#!/usr/bin/env bash
# Packs this package, installs the tarball in a throwaway project, and compiles against it the
# way a buyer would. Fails if the declarations are missing, broken, or too loose to catch misuse.
set -euo pipefail

PKG_DIR="$(cd "$(dirname "$0")/.." && pwd)"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

cd "$PKG_DIR"
[ -f dist/index.d.ts ] && [ -f dist/index.d.mts ] || { echo "FAIL: dist has no declarations; run the build first" >&2; exit 1; }
npm pack --silent --pack-destination "$WORK" >/dev/null
TARBALL="$(ls "$WORK"/*.tgz)"
# Listed once into a variable: `tar | grep -q` under pipefail fails when grep exits early.
LISTING="$(tar tzf "$TARBALL")"
for f in index.d.ts index.d.mts; do
  grep -qx "package/dist/$f" <<<"$LISTING" || { echo "FAIL: $f is not in the tarball" >&2; exit 1; }
done

cd "$WORK"
echo '{ "name": "consumer-check", "private": true, "type": "module" }' > package.json
npm install --no-audit --no-fund --silent "$TARBALL" react@19 react-dom@19 @types/react@19 @types/react-dom@19 typescript@5.6

cat > good.tsx <<'TSX'
import { Button, IconButton, AdvancedDataGrid, DataGrid, EmptyState, BarChart, ChartLegendContent, Form, type ButtonProps } from '@otfdashkit/ui'

const props: ButtonProps = { variant: 'shimmer', size: 'xl' }
export const a = <Button {...props}>Go</Button>
export const b = <IconButton icon={<span />} label="Close" />
export const c = <EmptyState title="None" action={{ label: 'Add', onClick: () => {} }} />
export const d = <AdvancedDataGrid columns={[]} data={[]} selectable virtual />
export const e = <BarChart data={[]} dataKey="v" xAxisKey="k" />
export const f = [DataGrid, ChartLegendContent, Form]
TSX

cat > bad.tsx <<'TSX'
import { Button, EmptyState } from '@otfdashkit/ui'
export const x = <Button variant="not-a-variant">Go</Button>
export const y = <EmptyState title="None" action={<span />} />
TSX

compile() { # file, moduleResolution, module
  printf '{ "compilerOptions": { "target": "ES2022", "module": "%s", "moduleResolution": "%s", "jsx": "react-jsx", "strict": true, "noEmit": true, "skipLibCheck": false }, "files": ["%s"] }\n' "$3" "$2" "$1" > tsconfig.json
  npx tsc -p . 2>&1 || true
}

for mode in "bundler ESNext" "node16 Node16"; do
  set -- $mode
  out="$(compile good.tsx "$1" "$2")"
  if grep -q 'error TS' <<<"$out"; then echo "FAIL: correct usage does not compile ($1)"; echo "$out" | head -20; exit 1; fi
  echo "ok: correct usage compiles with skipLibCheck off ($1)"
done

out="$(compile bad.tsx bundler ESNext)"
count="$(grep -c 'bad.tsx.*error TS' <<<"$out" || true)"
if [ "$count" != "2" ]; then echo "FAIL: misuse should produce 2 errors, got $count (types are missing or too loose)"; echo "$out" | head -20; exit 1; fi
echo "ok: misuse is rejected (2 errors)"
echo "PASS"
