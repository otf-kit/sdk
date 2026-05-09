// Metro config for the OTF UI Native showcase.
//
// The ONLY reason this file exists: enable Node.js `package.json#exports`
// resolution. Default metro on Expo SDK 54 still treats `exports` as opt-in
// — without `unstable_enablePackageExports: true`, subpath imports like
// `@otfdashkit/ui-native/skia` fail to resolve at bundle time even when
// the dist file exists at `node_modules/@otfdashkit/ui-native/dist/skia.mjs`.
//
// Symptom (verified May 2026 in CI):
//   Error: Unable to resolve module @otfdashkit/ui-native/skia from
//   apps/ui-native-showcase/components/shockwave-demo.tsx
//
// Reference:
//   https://github.com/facebook/metro/blob/main/docs/Configuration.md#unstable_enablepackageexports
//   https://docs.expo.dev/guides/customizing-metro/

const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

config.resolver.unstable_enablePackageExports = true

module.exports = config
