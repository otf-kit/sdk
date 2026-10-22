# `apps/ui-native-registry`

Tiny static-site wrapper around `packages/ui-native/registry/` so the OTF CLI registry can be served from Cloudflare Pages at `https://r.otf-kit.dev`.

## What it ships

```
dist/
├── registry.json                              # the manifest (= packages/ui-native/registry/registry.json)
├── components/
│   └── shockwave/
│       ├── index.tsx
│       ├── types.ts
│       ├── conf.ts
│       ├── shader.ts
│       └── utils.ts
└── index.html                                 # tiny landing page
```

That's it. No bundler, no React. The CLI fetches `/registry.json` to enumerate components, then `GET`s each `<component.path>/<file>` as plain text and writes it into the user's project.

## Layout choice

`registry.json` lives at `packages/ui-native/registry/registry.json` (same root as `components/`) so a single `rsync` produces the deployed tree. The `path` field on each component entry is **relative to the deploy root**: `"components/shockwave"`, NOT `"registry/components/shockwave"`.

## Build + deploy

```bash
# Local build (sanity check)
pnpm --filter @otfdashkit/ui-native-registry run build
ls dist/

# Verify only — re-runs the file-existence check without rebuilding
pnpm --filter @otfdashkit/ui-native-registry run verify

# Deploy (run by hand; nothing deploys on push)
set -a && source ../../.env && set +a
pnpm --filter @otfdashkit/ui-native-registry run deploy
```

## Deploys

Nothing deploys automatically: after a change to `packages/ui-native/registry/**` or this app, run the deploy command above by hand. It needs `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` in the environment.

## First-time project setup (do once)

```bash
npx wrangler pages project create otf-ui-native-registry
# Then in the CF dashboard: Custom domains → add r.otf-kit.dev
```

After that, every deploy is the hand-run deploy command above.

## Verifying the live registry

```bash
curl https://r.otf-kit.dev/registry.json
curl https://r.otf-kit.dev/components/shockwave/index.tsx
```

Both should return the source files verbatim.
