<h1 align="center">@otfdashkit/ui-native</h1>

<p align="center">
  React Native + Expo component library &mdash; same component API as <code>@otfdashkit/ui</code> (web).<br/>
  Tamagui under the hood, parity primitives, tokens shared with the web SDK.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@otfdashkit/ui-native" target="_blank">
    <img src="https://img.shields.io/npm/v/@otfdashkit/ui-native?style=flat-square&color=000" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@otfdashkit/ui-native" target="_blank">
    <img src="https://img.shields.io/npm/dm/@otfdashkit/ui-native?style=flat-square&color=000" alt="npm downloads">
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="MIT License">
  <img src="https://img.shields.io/badge/platforms-iOS%20%7C%20Android-000?style=flat-square" alt="platforms">
  <img src="https://img.shields.io/badge/Expo-SDK%2054-000?style=flat-square" alt="Expo SDK 54">
</p>

---

## Live demo

- **[native.otf-kit.dev](https://native.otf-kit.dev/)** &mdash; full storybook in a phone-frame, with an Expo Go QR for real-device preview
- **[fitness-preview.otf-kit.dev](https://fitness-preview.otf-kit.dev/)** &mdash; production fitness app built end-to-end with this package

## Install

```bash
pnpm add @otfdashkit/ui-native @otfdashkit/tokens
# or:  npm install @otfdashkit/ui-native @otfdashkit/tokens
# or:  bun add @otfdashkit/ui-native @otfdashkit/tokens

npx expo install react-native-svg react-native-safe-area-context
```

## Quick start

```tsx
// App.tsx
import { TamaguiProvider, createTamagui } from '@tamagui/core'
import { otfTamaguiConfig } from '@otfdashkit/tokens'
import { Button, Card, Input } from '@otfdashkit/ui-native'

const config = createTamagui(otfTamaguiConfig)

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <Card>
        <Input placeholder="Email" />
        <Button variant="primary" size="lg" onPress={handlePress}>
          Continue
        </Button>
      </Card>
    </TamaguiProvider>
  )
}
```

The same component names, props, and variants work on web (`@otfdashkit/ui`) and native &mdash; port a screen by changing the import.

## Cross-platform parity

| Component | Web (`@otfdashkit/ui`) | Native (`@otfdashkit/ui-native`) |
|---|---|---|
| `<Button>` | Radix primitive | Tamagui primitive |
| `<Card>` | Tailwind v4 | Tamagui tokens |
| `<Input>` | Radix Form | Tamagui Input |
| `<Avatar>` | Radix Avatar | Tamagui Avatar |
| `<Text>` | Tailwind typography | Tamagui Text |

Everything reads from the same [`@otfdashkit/tokens`](https://www.npmjs.com/package/@otfdashkit/tokens) palette, so switching themes from `mono` → `ocean-teal` → `forest` cascades through both runtimes.

## Theming

```tsx
// Apply a theme at the Tamagui provider level
import { otfTamaguiConfig, OTF_DESIGN_THEMES } from '@otfdashkit/tokens'

const config = createTamagui({
  ...otfTamaguiConfig,
  defaultTheme: 'ocean-teal',
})
```

All 17 themes from `@otfdashkit/tokens` are available.

## AI-coding-tool-native

Every component ships with structured JSDoc and tested prompts (`ai/prompts/*.md`). Cursor, Claude Code, Copilot, and Lovable all generate correct native usage on the first try, including the right Expo Go imports, safe-area handling, and theme tokens.

## Live demos

- **Phone-frame storybook**: https://native.otf-kit.dev (every component, every variant + Expo Go QR)
- **Fitness reference app**: https://fitness-preview.otf-kit.dev ([source](https://github.com/otf-kit/fitness-kit))

## Related packages

- [`@otfdashkit/ui`](https://www.npmjs.com/package/@otfdashkit/ui) &mdash; web counterpart, same component API
- [`@otfdashkit/tokens`](https://www.npmjs.com/package/@otfdashkit/tokens) &mdash; shared design tokens (CSS vars + Tamagui config)
- [`@otfdashkit/eslint-plugin-otf-design`](https://www.npmjs.com/package/@otfdashkit/eslint-plugin-otf-design) &mdash; design-system lint rules

## Status

`v0.1.x` &mdash; alpha. APIs may change before `1.0`. Pin exact versions if you ship to production.

## License

MIT &copy; otfdashkit
