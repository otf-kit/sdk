# Contributing to OTF

## Setup

```bash
git clone https://github.com/your-org/otf.git
cd otf
pnpm install
```

## Development

```bash
pnpm dev          # start all packages in watch mode
pnpm build        # build all packages
pnpm type-check   # run TypeScript across workspace
pnpm lint         # run ESLint across workspace
pnpm test         # run all tests
```

## Pull Requests

1. Branch from `main`: `git checkout -b feat/your-feature`
2. Make changes, run `pnpm type-check && pnpm lint`
3. Open a PR — CI runs lint, type-check, and rebrand-verify automatically
4. One approval required to merge

## Package structure

| Package | Description |
|---------|-------------|
| `@otf/tokens` | CSS variables + Tamagui tokens + design themes |
| `@otf/ui` | Web components (Radix UI + Tailwind) |
| `@otf/ui-native` | Mobile components (Tamagui) |
| `@otf/config` | Shared ESLint / Prettier / Tailwind configs |
