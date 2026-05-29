// ─────────────────────────────────────────────────────────────────────────
// OTF Native UI Showcase — theme + font source of truth.
//
// COLOR: the showcase ships the SDK's four real native palettes (NOT Tamagui's
// stock accents). The raw 12-step ramps live in `@otfdashkit/tokens` (native.ts
// → slate/warm/cosmic/terminal × dark+light). Those ramps only define
// $color1..$color12 — they lack the *semantic* tokens ($background, $color,
// $borderColor, hover/press, …) that every SDK primitive + demo reads. So we
// feed each ramp through `@tamagui/theme-builder`'s `createThemes` (the exact,
// already-shipping booking-kit codepath) which expands a ramp into a full
// semantic theme. We call it once per palette (each palette owns its whole
// surface, not just an accent) and merge the eight results into one config.
//
// FONT: Plus Jakarta Sans (display) + Inter (body) + JetBrains Mono (mono) —
// the booking-kit stack. Native loads the @expo-google-fonts named weights via
// useFonts(); web loads the CSS families via the Google-Fonts <link> injected
// in app/_layout.tsx. `font.mono` is a plain family token (no mono createFont).
// ─────────────────────────────────────────────────────────────────────────
import { Platform } from 'react-native'
import { createThemes } from '@tamagui/theme-builder'
import { otfBaseConfig } from '@otfdashkit/ui-native'
import {
  slateDarkColors,
  slateLightColors,
  warmDarkColors,
  warmLightColors,
  cosmicDarkColors,
  cosmicLightColors,
  terminalDarkColors,
  terminalLightColors,
} from '@otfdashkit/tokens'

// ── hsl(h, s%, l%) → #RRGGBB ───────────────────────────────────────────────
// createThemes derives transparent variants ($background0, $color08, …) by
// applying alpha to the base colors. That conversion is rock-solid on hex but
// flaky on hsl strings, so we normalise the token ramps to hex first (booking
// fed createThemes hex and rendered correctly).
function hslToHex(input: string): string {
  const m = input.match(/hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/i)
  if (!m) return input // already hex / unknown — pass through untouched
  const h = parseFloat(m[1]!)
  const s = parseFloat(m[2]!) / 100
  const l = parseFloat(m[3]!) / 100
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const off = l - c / 2
  let r = 0
  let g = 0
  let b = 0
  if (h < 60) { r = c; g = x }
  else if (h < 120) { r = x; g = c }
  else if (h < 180) { g = c; b = x }
  else if (h < 240) { g = x; b = c }
  else if (h < 300) { r = x; b = c }
  else { r = c; b = x }
  const toHex = (v: number) =>
    Math.round((v + off) * 255).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

type Ramp = {
  color1: string; color2: string; color3: string; color4: string
  color5: string; color6: string; color7: string; color8: string
  color9: string; color10: string; color11: string; color12: string
}

const toArr = (c: Ramp): string[] =>
  [
    c.color1, c.color2, c.color3, c.color4, c.color5, c.color6,
    c.color7, c.color8, c.color9, c.color10, c.color11, c.color12,
  ].map(hslToHex)

// Each palette → a full { light, dark } semantic theme pair. `base` is the only
// required field; we omit `accent` so no extra accent sub-themes are generated.
function paletteThemes(dark: Ramp, light: Ramp) {
  return createThemes({
    base: { palette: { light: toArr(light), dark: toArr(dark) } },
  })
}

// OTF brand palette — the marketing brand orange (#F97316, from
// docs/brand-profile.json) on a near-black surface. NOT in @otfdashkit/tokens
// (those are the SDK's neutral product palettes); this is OTF's own brand skin,
// matching otf-kit.dev.
const otfBrandDark: Ramp = {
  color1: '#0A0A0A', color2: '#121110', color3: '#19150E', color4: '#241B0F',
  color5: '#33260F', color6: '#4A3414', color7: '#6E4D1A', color8: '#9C6C22',
  color9: '#F97316', color10: '#EA680C', color11: '#D8D0C6', color12: '#F6F3EE',
}
const otfBrandLight: Ramp = {
  color1: '#FFFFFF', color2: '#FAF6F1', color3: '#F4ECE3', color4: '#EDE2D4',
  color5: '#E4D5C2', color6: '#D4BFA4', color7: '#B08A5C', color8: '#7E6038',
  color9: '#F97316', color10: '#EA680C', color11: '#5C4733', color12: '#1C1410',
}

const slate = paletteThemes(slateDarkColors, slateLightColors)
const warm = paletteThemes(warmDarkColors, warmLightColors)
const cosmic = paletteThemes(cosmicDarkColors, cosmicLightColors)
const terminal = paletteThemes(terminalDarkColors, terminalLightColors)
const otfBrand = paletteThemes(otfBrandDark, otfBrandLight)

// Tamagui bakes the named accent SCALES ($red9, $blue9, $green10, …) into each
// THEME object (the stock `dark` theme has 212 keys incl. red1-12 / blue1-12);
// they are NOT global color tokens. createThemes only emits the base ramp +
// semantic keys, so a bare palette theme drops every $colorScaleN reference
// (status colors, badges, the swipe counters → invisible). Fix: layer each OTF
// palette ON TOP of the matching stock theme — the stock scales survive while
// our palette overrides background / $color / $color1-12 / borders / accent.
const stockDark = otfBaseConfig.themes.dark as Record<string, string>
const stockLight = otfBaseConfig.themes.light as Record<string, string>

// Eight top-level themes selectable by a single <Theme name={…}>. Slate is the
// default so it owns the bare `dark` / `light` names; the rest are suffixed.
export const otfShowcaseThemes = {
  dark: { ...stockDark, ...slate.dark },
  light: { ...stockLight, ...slate.light },
  dark_warm: { ...stockDark, ...warm.dark },
  light_warm: { ...stockLight, ...warm.light },
  dark_cosmic: { ...stockDark, ...cosmic.dark },
  light_cosmic: { ...stockLight, ...cosmic.light },
  dark_terminal: { ...stockDark, ...terminal.dark },
  light_terminal: { ...stockLight, ...terminal.light },
  dark_otf: { ...stockDark, ...otfBrand.dark },
  light_otf: { ...stockLight, ...otfBrand.light },
}

// ── Font families ───────────────────────────────────────────────────────────
const web = Platform.OS === 'web'
export const font = {
  display: web ? '"Plus Jakarta Sans", system-ui, sans-serif' : 'PlusJakartaSans_700Bold',
  displaySemi: web ? '"Plus Jakarta Sans", system-ui, sans-serif' : 'PlusJakartaSans_600SemiBold',
  displayBlack: web ? '"Plus Jakarta Sans", system-ui, sans-serif' : 'PlusJakartaSans_800ExtraBold',
  body: web ? 'Inter, system-ui, sans-serif' : 'Inter_400Regular',
  medium: web ? 'Inter, system-ui, sans-serif' : 'Inter_500Medium',
  semibold: web ? 'Inter, system-ui, sans-serif' : 'Inter_600SemiBold',
  bold: web ? 'Inter, system-ui, sans-serif' : 'Inter_700Bold',
  mono: web ? '"JetBrains Mono", ui-monospace, monospace' : 'JetBrainsMono_400Regular',
} as const

// ── Palette metadata (drives the picker UI + (mode,palette)→theme mapping) ───
export type ShowcasePaletteId = 'slate' | 'warm' | 'cosmic' | 'terminal' | 'otf'

export interface ShowcasePalette {
  id: ShowcasePaletteId
  name: string
  /** Vivid accent for swatches + dark-mode tab tint. */
  preview: string
  /** Accent that reads on a light surface (light-mode tab tint). */
  accentLight: string
  /** One-line lineage shown under the swatch. */
  subtitle: string
}

export const SHOWCASE_PALETTES: ShowcasePalette[] = [
  { id: 'otf',      name: 'OTF',      preview: '#F97316', accentLight: '#EA680C', subtitle: 'Brand orange' },
  { id: 'terminal', name: 'Terminal', preview: '#FAFAFA', accentLight: '#171717', subtitle: 'Vercel mono' },
  { id: 'slate',    name: 'Slate',    preview: '#6366F1', accentLight: '#6366F1', subtitle: 'Linear indigo' },
  { id: 'warm',     name: 'Warm',     preview: '#8B5CF6', accentLight: '#7C3AED', subtitle: 'Stripe violet' },
  { id: 'cosmic',   name: 'Cosmic',   preview: '#C04DFF', accentLight: '#9D00FF', subtitle: 'Nebula magenta' },
]

export type ShowcaseMode = 'light' | 'dark'

// Readable foreground (near-black / white) for text or an icon sitting on a
// SOLID swatch/FAB background. Fixes white-on-white (e.g. the Palette icon on
// the Terminal palette's near-white FAB).
export function fgOn(hex: string): string {
  const h = hex.replace('#', '')
  if (h.length < 6) return '#FFFFFF'
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6 ? '#0A0A0A' : '#FFFFFF'
}

/** Resolve the Tamagui theme name registered in `otfShowcaseThemes`. */
export function themeNameFor(paletteId: ShowcasePaletteId, mode: ShowcaseMode): string {
  return paletteId === 'slate' ? mode : `${mode}_${paletteId}`
}

/** Tab-bar active tint that stays legible against the bar background. */
export function accentFor(palette: ShowcasePalette, mode: ShowcaseMode): string {
  return mode === 'dark' ? palette.preview : palette.accentLight
}
