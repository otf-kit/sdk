// Re-export Tamagui's Image directly (was previously wrapped in styled()
// with `name: 'OtfImage'` — but on RN-Web with Expo SDK 54 + Tamagui 1.144
// that wrapper produced rendered <img> elements with `width: 0; opacity: 0`,
// even though the underlying images loaded successfully (`naturalW: 400`).
// Verified May 2026 on the showcase Image route — images were invisible.
//
// Dropping the styled wrapper is harmless: nothing in the SDK relied on
// the `OtfImage` style key (no theme variants registered), and consumers
// pass width/height/borderRadius as direct props which Tamagui's Image
// supports natively. Reinstate styled() only if a theme variant is
// genuinely needed; if so, set `width: 'auto', opacity: 1` as base styles.
export { Image } from 'tamagui'
