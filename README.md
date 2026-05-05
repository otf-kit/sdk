# @otfdashkit/* — Cross-Platform UI Component SDK

A free, MIT-licensed UI component library for React + React Native, with parity APIs across web and mobile. Designed to be AI-coding-tool-native: every component ships with structured JSDoc and tested prompts.

> **Status**: Alpha. APIs are subject to change.

## Packages

| Package                                  | Platform | Foundation                | Description                         |
|------------------------------------------|----------|---------------------------|-------------------------------------|
| `@otfdashkit/ui`                         | Web      | Radix UI + Tailwind v4    | Primitives, components, layouts     |
| `@otfdashkit/ui-native`                  | Mobile   | Tamagui-core              | Same APIs, native + web rendering   |
| `@otfdashkit/tokens`                     | Both     | CSS vars + Tamagui tokens | Shared design tokens (5 palettes)   |
| `@otfdashkit/eslint-plugin-otf-design`   | Tooling  | ESLint plugin             | Enforces design-system token usage  |

## Install

```bash
pnpm add @otfdashkit/ui @otfdashkit/tokens
# or for mobile
pnpm add @otfdashkit/ui-native @otfdashkit/tokens
```

## Same component, web + native

```ts
// Web
import { Button } from '@otfdashkit/ui'

// Native
import { Button } from '@otfdashkit/ui-native'

<Button variant="primary" size="lg" onPress={handlePress}>
  Continue
</Button>
```

## Live demos

- Web Storybook: https://ui.otf-kit.dev
- Native Showcase: https://native.otf-kit.dev

## License

MIT — see [LICENSE](LICENSE)
