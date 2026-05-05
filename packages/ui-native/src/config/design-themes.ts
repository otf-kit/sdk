/**
 * Maps the 16 Otf platform design themes (from auto-engineer src/types/color-theme.ts)
 * to Tamagui-compatible theme palettes via createThemes.
 *
 * Usage:
 *   import { createOtfThemes, OTF_DESIGN_THEMES } from '@otfdashkit/ui-native'
 *   const themes = createOtfThemes('ocean-teal')
 *   const config = createTamagui({ ...tamaguiDefaultConfig, themes })
 */

export type OtfDesignThemeId =
  | 'mono'
  | 'ocean-teal'
  | 'warm-amber'
  | 'rose-coral'
  | 'lavender'
  | 'glacier'
  | 'forest'
  | 'obsidian'
  | 'solar'
  | 'orchid'
  | 'indigo'
  | 'cosmic-night'
  | 'soft-pop'
  | 'neo-brutalism'
  | 'vintage-paper'
  | 'modern-minimal'
  | 'bubblegum'

export interface OtfColorPalette {
  primary: string
  primary_foreground: string
  secondary: string
  secondary_foreground: string
  accent: string
  background: string
  dark_mode: string
}

export interface OtfDesignTheme {
  id: OtfDesignThemeId
  name: string
  description: string
  palette: OtfColorPalette
}

export const OTF_DESIGN_THEMES: Record<OtfDesignThemeId, OtfDesignTheme> = {
  'mono': {
    id: 'mono', name: 'Mono', description: 'Black/white neutral',
    palette: { primary: '#18181B', primary_foreground: '#FAFAFA', secondary: '#F4F4F5', secondary_foreground: '#27272A', accent: '#3F3F46', background: '#FFFFFF', dark_mode: '#09090B' },
  },
  'ocean-teal': {
    id: 'ocean-teal', name: 'Ocean Teal', description: 'SaaS, fintech, healthcare',
    palette: { primary: '#0D9488', primary_foreground: '#FFFFFF', secondary: '#F0FDFA', secondary_foreground: '#134E4A', accent: '#2DD4BF', background: '#FFFFFF', dark_mode: '#042F2E' },
  },
  'warm-amber': {
    id: 'warm-amber', name: 'Warm Amber', description: 'E-commerce, food, hospitality',
    palette: { primary: '#D97706', primary_foreground: '#FFFFFF', secondary: '#FFFBEB', secondary_foreground: '#78350F', accent: '#FBBF24', background: '#FFFEF7', dark_mode: '#451A03' },
  },
  'rose-coral': {
    id: 'rose-coral', name: 'Rose Coral', description: 'Lifestyle, beauty, fashion',
    palette: { primary: '#E11D48', primary_foreground: '#FFFFFF', secondary: '#FFF1F2', secondary_foreground: '#881337', accent: '#FB7185', background: '#FFFAFA', dark_mode: '#4C0519' },
  },
  'lavender': {
    id: 'lavender', name: 'Lavender', description: 'Creative, wellness, meditation',
    palette: { primary: '#7C3AED', primary_foreground: '#FFFFFF', secondary: '#F5F3FF', secondary_foreground: '#4C1D95', accent: '#A78BFA', background: '#FEFEFF', dark_mode: '#2E1065' },
  },
  'glacier': {
    id: 'glacier', name: 'Glacier', description: 'Professional, corporate, analytics',
    palette: { primary: '#0EA5E9', primary_foreground: '#FFFFFF', secondary: '#F0F9FF', secondary_foreground: '#0C4A6E', accent: '#38BDF8', background: '#FFFFFF', dark_mode: '#082F49' },
  },
  'forest': {
    id: 'forest', name: 'Forest', description: 'Sustainability, nature, outdoor',
    palette: { primary: '#16A34A', primary_foreground: '#FFFFFF', secondary: '#F0FDF4', secondary_foreground: '#14532D', accent: '#4ADE80', background: '#FEFFFE', dark_mode: '#052E16' },
  },
  'obsidian': {
    id: 'obsidian', name: 'Obsidian', description: 'Developer tools, gaming, tech',
    palette: { primary: '#475569', primary_foreground: '#FFFFFF', secondary: '#F1F5F9', secondary_foreground: '#1E293B', accent: '#64748B', background: '#FFFFFF', dark_mode: '#0F172A' },
  },
  'solar': {
    id: 'solar', name: 'Solar', description: 'Energy, optimistic, kid-friendly',
    palette: { primary: '#CA8A04', primary_foreground: '#FFFFFF', secondary: '#FEFCE8', secondary_foreground: '#713F12', accent: '#FACC15', background: '#FFFEF5', dark_mode: '#422006' },
  },
  'orchid': {
    id: 'orchid', name: 'Orchid', description: 'Beauty, fashion, luxury',
    palette: { primary: '#C026D3', primary_foreground: '#FFFFFF', secondary: '#FDF4FF', secondary_foreground: '#701A75', accent: '#E879F9', background: '#FFFEFF', dark_mode: '#4A044E' },
  },
  'indigo': {
    id: 'indigo', name: 'Indigo', description: 'Enterprise, fintech, trust',
    palette: { primary: '#4F46E5', primary_foreground: '#FFFFFF', secondary: '#EEF2FF', secondary_foreground: '#312E81', accent: '#818CF8', background: '#FEFEFF', dark_mode: '#1E1B4B' },
  },
  'cosmic-night': {
    id: 'cosmic-night', name: 'Cosmic Night', description: 'Dark mode, futuristic, gaming',
    palette: { primary: '#6366F1', primary_foreground: '#FFFFFF', secondary: '#1E1B4B', secondary_foreground: '#E0E7FF', accent: '#A855F7', background: '#0F0D1A', dark_mode: '#030014' },
  },
  'soft-pop': {
    id: 'soft-pop', name: 'Soft Pop', description: 'Playful, modern, creative',
    palette: { primary: '#14B8A6', primary_foreground: '#FFFFFF', secondary: '#FDF2F8', secondary_foreground: '#134E4A', accent: '#F472B6', background: '#FFFBFE', dark_mode: '#0D1117' },
  },
  'neo-brutalism': {
    id: 'neo-brutalism', name: 'Neo Brutalism', description: 'Bold, striking, artistic',
    palette: { primary: '#FF6B35', primary_foreground: '#000000', secondary: '#FFE66D', secondary_foreground: '#1A1A1A', accent: '#FF3366', background: '#FFFEF0', dark_mode: '#1A1A1A' },
  },
  'vintage-paper': {
    id: 'vintage-paper', name: 'Vintage Paper', description: 'Classic, warm, nostalgic',
    palette: { primary: '#B45309', primary_foreground: '#FFFFFF', secondary: '#FEF3C7', secondary_foreground: '#78350F', accent: '#92400E', background: '#FFFDF7', dark_mode: '#292524' },
  },
  'modern-minimal': {
    id: 'modern-minimal', name: 'Modern Minimal', description: 'Clean, professional, corporate',
    palette: { primary: '#2563EB', primary_foreground: '#FFFFFF', secondary: '#F8FAFC', secondary_foreground: '#1E40AF', accent: '#3B82F6', background: '#FFFFFF', dark_mode: '#0F172A' },
  },
  'bubblegum': {
    id: 'bubblegum', name: 'Bubblegum', description: 'Fun, feminine, youthful',
    palette: { primary: '#EC4899', primary_foreground: '#FFFFFF', secondary: '#FDF4FF', secondary_foreground: '#9D174D', accent: '#F472B6', background: '#FFFBFF', dark_mode: '#500724' },
  },
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('')
}

function mixColors(c1: string, c2: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(c1)
  const [r2, g2, b2] = hexToRgb(c2)
  return rgbToHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t)
}

/**
 * Generates a 12-step palette array from a ColorPalette.
 * Light: background(1) → secondary(2-4) → accent(5-7) → primary(8-10) → secondary_foreground(11) → dark(12)
 * Dark: dark_mode(1) → secondary_foreground tinted(2-4) → accent darkened(5-7) → primary(8-10) → secondary lightened(11) → foreground(12)
 */
function generateLightPalette(p: OtfColorPalette): string[] {
  return [
    p.background,
    p.secondary,
    mixColors(p.secondary, p.accent, 0.15),
    mixColors(p.secondary, p.accent, 0.3),
    mixColors(p.accent, p.primary, 0.1),
    mixColors(p.accent, p.primary, 0.3),
    mixColors(p.accent, p.primary, 0.5),
    mixColors(p.accent, p.primary, 0.7),
    p.primary,
    mixColors(p.primary, p.secondary_foreground, 0.3),
    p.secondary_foreground,
    p.dark_mode,
  ]
}

function generateDarkPalette(p: OtfColorPalette): string[] {
  return [
    p.dark_mode,
    mixColors(p.dark_mode, p.secondary_foreground, 0.15),
    mixColors(p.dark_mode, p.secondary_foreground, 0.25),
    mixColors(p.dark_mode, p.secondary_foreground, 0.35),
    mixColors(p.secondary_foreground, p.accent, 0.2),
    mixColors(p.secondary_foreground, p.accent, 0.4),
    mixColors(p.secondary_foreground, p.accent, 0.6),
    mixColors(p.accent, p.primary, 0.5),
    p.primary,
    p.accent,
    mixColors(p.accent, p.primary_foreground, 0.5),
    p.primary_foreground,
  ]
}

/**
 * Generates Tamagui-compatible theme config for createThemes from a platform design theme.
 *
 * Usage with createThemes:
 * ```ts
 * import { createThemes } from '@tamagui/theme-builder'
 * import { getOtfThemePalettes } from '@otfdashkit/ui-native'
 *
 * const palettes = getOtfThemePalettes('ocean-teal')
 * const themes = createThemes({
 *   base: { palette: palettes.base },
 *   accent: { palette: palettes.accent },
 * })
 * ```
 */
export function getOtfThemePalettes(themeId: OtfDesignThemeId) {
  const theme = OTF_DESIGN_THEMES[themeId]
  if (!theme) throw new Error(`Unknown theme: ${themeId}`)
  const p = theme.palette

  return {
    base: {
      light: generateLightPalette(p),
      dark: generateDarkPalette(p),
    },
    accent: {
      light: generateDarkPalette(p),
      dark: generateLightPalette(p),
    },
  }
}

/**
 * All available design theme IDs for enumeration.
 */
export const OTF_DESIGN_THEME_IDS = Object.keys(OTF_DESIGN_THEMES) as OtfDesignThemeId[]

/**
 * Get theme metadata (name, description) for UI pickers.
 */
export function getOtfDesignTheme(themeId: OtfDesignThemeId): OtfDesignTheme | undefined {
  return OTF_DESIGN_THEMES[themeId]
}
