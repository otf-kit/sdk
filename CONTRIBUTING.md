# Contributing to OTF

## Setup

```bash
git clone https://github.com/otf-kit/sdk.git
cd sdk
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

Two of these do not yet check what the comments say: `pnpm test` currently fails (it points at a test file that does not exist, and the UI tests are not run; see issue #13), and `pnpm lint` runs zero tasks and exits 0 (see issue #9). `pnpm build` and `pnpm type-check` are the reliable checks today.

## Pull Requests

1. Branch from `main`: `git checkout -b feat/your-feature`
2. Make changes, run `pnpm type-check && pnpm lint`
3. Open a PR. No GitHub Actions run on this repository, so run `pnpm build` and `pnpm type-check` yourself and paste the result in the PR description.
4. A maintainer reviews every PR.

## How an accepted change lands

This repository is published from a source repository that we maintain. A pull request opened here is read and discussed here. When it is accepted, a maintainer applies the change to the source repository with you as the commit author, then closes your PR with a link to that commit. Your PR will show as Closed, not Merged, even when your change was accepted; the commit in the source repository, published here with you as its author, is the record. A change merged only on this repository would be overwritten by the next publish, so we do not merge here.

## Package structure

| Package | Description |
|---------|-------------|
| `@otfdashkit/tokens` | CSS variables + Tamagui tokens + design themes |
| `@otfdashkit/ui` | Web components (Radix UI + Tailwind) |
| `@otfdashkit/ui-native` | Mobile components (Tamagui) |
| `@otfdashkit/config` | Shared ESLint / Prettier / Tailwind configs |
| `@otfdashkit/cli` | CLI that adds OTF components to your project; heavy-peer components ship as source (`npx @otfdashkit/cli add <name>`) |
| `@otfdashkit/eslint-plugin-otf-design` | ESLint rules that ban hex literals and default Tailwind palette classes so code uses design tokens |
