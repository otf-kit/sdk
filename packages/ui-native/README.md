<h1 align="center">@otfdashkit/ui-native</h1>

<p align="center">
  React Native components with the same API as <code>@otfdashkit/ui</code> on web. Port a screen by changing the import.
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

## What you get

- **80 primitives** — Button, Card, Input, Avatar, Badge, Chip, Sheet, Switch, Tabs, Toast, Text, Stack — same names and props as the web SDK
- **Apple-Fitness-style blocks** — ActivityRings, WeekStrip, StepperBig, MetricCard, SegmentedControl, MiniBarChart
- **Animated patterns** — shaders, marquees, parallax scrolls (heavy peers ship via [`@otfdashkit/cli`](https://www.npmjs.com/package/@otfdashkit/cli) so you only pay for what you use)
- **17 shared themes** — same `@otfdashkit/tokens` palette as web; switch palette at the Tamagui provider level
- **One codebase, three targets** — Expo Router app renders on iOS, Android, and web export

## Live demos

- **[native-preview.otf-kit.dev](https://native-preview.otf-kit.dev/)** — full showcase in a phone frame with per-route Expo Go QR (scan, land on the same component on a real device)
- **[fitness-preview.otf-kit.dev](https://fitness-preview.otf-kit.dev/)** — production fitness app built end-to-end with this package

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

The same component names and props work on web (`@otfdashkit/ui`) — porting a screen is a one-line import change.

## Cross-platform parity

| Component | Web (`@otfdashkit/ui`) | Native (`@otfdashkit/ui-native`) |
|---|---|---|
| `<Button>` | Radix primitive | Tamagui primitive |
| `<Card>` | Tailwind v4 | Tamagui tokens |
| `<Input>` | Radix Form | Tamagui Input |
| `<Avatar>` | Radix Avatar | Tamagui Avatar |
| `<Text>` | Tailwind typography | Tamagui Text |

Both read from [`@otfdashkit/tokens`](https://www.npmjs.com/package/@otfdashkit/tokens) — flip the theme on web and native at once.

## Theming

```tsx
import { otfTamaguiConfig } from '@otfdashkit/tokens'

const config = createTamagui({
  ...otfTamaguiConfig,
  defaultTheme: 'ocean-teal',
})
```

All 17 themes from `@otfdashkit/tokens` are available.

## Heavy-peer components

Skia shaders, Reanimated worklets, MMKV, Notifee — anything that would force every consumer to install peers they don't need — ships through [`@otfdashkit/cli`](https://www.npmjs.com/package/@otfdashkit/cli) instead of npm. Source-copy install, no forced peers:

```bash
npx @otfdashkit/cli init
npx @otfdashkit/cli add shockwave
```

## Works with

- **Claude Code**, **Cursor**, **Lovable**, **Bolt** — every component ships structured JSDoc + tested prompts in `ai/prompts/`, including Expo Go imports, safe-area handling, and theme tokens

## Related packages

- [`@otfdashkit/ui`](https://www.npmjs.com/package/@otfdashkit/ui) — web counterpart, same component API
- [`@otfdashkit/tokens`](https://www.npmjs.com/package/@otfdashkit/tokens) — shared design tokens
- [`@otfdashkit/cli`](https://www.npmjs.com/package/@otfdashkit/cli) — heavy-peer component installer

## Community

**[discord.gg/gpXyu7SqNZ](https://discord.gg/gpXyu7SqNZ)** — questions, bugs, feature requests.

## Status

`v0.1.x` — alpha. APIs may change before `1.0`. Pin exact versions in production.

## License

MIT. You own the source. Eject any time. Copyright &copy; otfdashkit.
