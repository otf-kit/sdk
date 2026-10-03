# Contributing to the OTF SDK

Thanks for helping improve the packages in this repository.

## Report an issue

Search [existing issues](https://github.com/otf-kit/sdk/issues) first. For a bug, include the package and version, a small reproduction, expected and actual behavior, and the relevant web or native environment. Remove secrets and personal data from logs and screenshots.

## Make a change

```bash
git clone https://github.com/otf-kit/sdk.git
cd sdk
pnpm install
```

Create a branch from `main` and keep the change focused. Update the relevant package README or example when behavior changes. Before opening a pull request, run the checks that apply to your change:

```bash
pnpm type-check
pnpm lint
pnpm test
```

In the pull request, describe the behavior change, link the issue if there is one, and state which checks you ran. For a visual change, include a screenshot or a short recording. A maintainer will review the PR before merge.

Package-specific guidance lives in [`packages/ui`](packages/ui/README.md), [`packages/ui-native`](packages/ui-native/README.md), and [`packages/tokens`](packages/tokens/README.md).
