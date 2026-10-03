# OTF SDK

**React components for web apps, React Native components for Expo apps, and shared design tokens.**

[![OTF component gallery](https://cdn.otf-kit.dev/readme/hero.png)](https://otf-kit.dev/components)

[Web Storybook](https://ui.otf-kit.dev/) · [Native showcase](https://native-preview.otf-kit.dev/) · [Component gallery](https://otf-kit.dev/components) · [Documentation](https://otf-kit.dev/docs)

## Install

```bash
# Web
pnpm add @otfdashkit/ui @otfdashkit/tokens

# Expo
pnpm add @otfdashkit/ui-native @otfdashkit/tokens
```

For web, import the token and component styles once in your app entry point:

```tsx
import '@otfdashkit/tokens/web.css'
import '@otfdashkit/ui/styles'
import { Button } from '@otfdashkit/ui'
```

For Expo, wrap your app with the native provider:

```tsx
import { Button, OTFProvider } from '@otfdashkit/ui-native'

export default function App() {
  return <OTFProvider><Button>Continue</Button></OTFProvider>
}
```

Package setup and API details: [`ui`](packages/ui/README.md), [`ui-native`](packages/ui-native/README.md), and [`tokens`](packages/tokens/README.md).

## See the components

[![Screenshot of the OTF component gallery](https://cdn.otf-kit.dev/readme/components-motion.gif)](https://otf-kit.dev/components)

- [Web Storybook](https://ui.otf-kit.dev/) shows the React components and their variants.
- [Native showcase](https://native-preview.otf-kit.dev/) displays the Expo component gallery in a phone frame.
- [Component gallery](https://otf-kit.dev/components) groups components for browsing.

## Packages

| Package | Purpose |
| --- | --- |
| [`@otfdashkit/ui`](packages/ui/) | React components built with Radix UI and Tailwind CSS v4. |
| [`@otfdashkit/ui-native`](packages/ui-native/) | React Native components for Expo, built with Tamagui. |
| [`@otfdashkit/tokens`](packages/tokens/) | Shared web CSS variables and native design tokens. |
| [`@otfdashkit/cli`](packages/cli/) | Source installer for native components with additional peer dependencies. |

The three libraries above are available on [npm](https://www.npmjs.com/org/otfdashkit). The source is licensed under [MIT](LICENSE).

## Agent skills

The separate [OTF Agent Skills](https://github.com/otf-kit/skills) repository contains installable guidance for using the SDK with coding agents:

```bash
npx skills add otf-kit/skills
```

## Kits

The [OTF site](https://otf-kit.dev/) currently lists 3 Live kits, 15 landing templates, and 1 Preview kit. The kits are separate from this open source SDK.

## Contributing

Bug reports and focused pull requests are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) for setup and review guidance.
