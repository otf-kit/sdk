// @otfdashkit/tokens — design theme IDs

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

export const OTF_DESIGN_THEME_IDS = Object.keys(OTF_DESIGN_THEMES) as OtfDesignThemeId[]

export function getOtfDesignTheme(themeId: OtfDesignThemeId): OtfDesignTheme | undefined {
  return OTF_DESIGN_THEMES[themeId]
}
