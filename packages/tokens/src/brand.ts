/**
 * OTF brand lock: the one design system for the site, SDK, kits and creatives (values = computed styles of otf-kit.dev).
 * Kits keep their own accent; everything else here is fixed. CSS twin: ./brand.css.
 */
export const otfBrand = {
  dark: {
    background: '#0a0a0a',
    card: '#111111',
    border: '#1f1f1f',
    hairline: 'rgba(255, 255, 255, 0.12)',
    foreground: '#f0ede9',
    foregroundMuted: 'rgba(240, 237, 233, 0.58)',
    mutedForeground: '#9e9e9e',
    accent: '#f97316',
    success: '#3fcf8e',
    buttonBackground: '#f0ede9',
    buttonForeground: '#11110f',
  },
  light: {
    background: '#fafaf9',
    card: '#ffffff',
    border: '#e5e5e3',
    hairline: 'rgba(10, 10, 10, 0.1)',
    foreground: '#0a0a0a',
    foregroundMuted: 'rgba(10, 10, 10, 0.58)',
    mutedForeground: '#6b6b6b',
    accent: '#c2410c',
    success: '#146c3a',
    buttonBackground: '#11110f',
    buttonForeground: '#ffffff',
  },
  radius: { button: 10, card: 12 },
  font: {
    display: 'Geist',
    body: 'Inter',
    mono: 'Geist Mono',
  },
  type: {
    /** Page titles (site h1). letterSpacing is in em; multiply by fontSize on native. */
    hero: { fontWeight: '400', lineHeight: 1.05, letterSpacing: -0.055 },
    /** Section headings, card titles, prices. */
    display: { fontWeight: '400', lineHeight: 1.1, letterSpacing: -0.03 },
    body: { fontWeight: '400', lineHeight: 1.5, letterSpacing: 0 },
    button: { fontWeight: '500', lineHeight: 1.25, letterSpacing: 0 },
    eyebrow: { fontWeight: '400', lineHeight: 1.3, letterSpacing: 0.14, textTransform: 'uppercase' },
  },
} as const

export type OtfBrandMode = 'dark' | 'light'
export type OtfBrandColors = (typeof otfBrand)[OtfBrandMode]
