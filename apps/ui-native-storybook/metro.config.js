// Metro config for the OTF native showcase.
//
// Two layered fixes on top of the Expo SDK 54 default:
//
// 1. The showcase is INTENTIONALLY isolated from the pnpm workspace (see
//    pnpm-workspace.yaml — `!apps/ui-native-storybook`). It runs its own
//    React + Tamagui stack and must not bleed into the root pnpm store.
//    Workspace deps `@otf/ui-native` and `@otf/tokens` are physically
//    copied into this app's node_modules by `scripts/install-workspace-deps.sh`,
//    which the `predev` / `prebuild:web` lifecycle scripts run automatically.
//    No `watchFolders` here — that's what would re-bridge to the root.
//
// 2. `@tamagui/metro-plugin`'s `withTamagui(config)` handles the
//    `@tamagui/config/v5` subpath imports that Metro's default resolver
//    can't reach (those exports require either `package.json:exports`
//    walking — which trips on nested transitive imports — or the
//    Tamagui-aware resolver this plugin provides). Source:
//    https://tamagui.dev/docs/guides/metro
const { getDefaultConfig } = require('expo/metro-config')
const { withTamagui } = require('@tamagui/metro-plugin')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

// We don't pass `config:` or `outputCSS:` because we don't run the Tamagui
// optimising compiler in the showcase — the components ship pre-styled
// from @otf/ui-native. We just need the plugin's resolver fixes for the
// `@tamagui/config/v5` subpath imports.
module.exports = withTamagui(config, {
  components: ['@otf/ui-native', 'tamagui'],
})
