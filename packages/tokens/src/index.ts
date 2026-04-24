export * from './themes'
export * from './native'
export * from './tailwind-preset'

/** Phase 1.5 — 4 OTF CSS palette names (applied as class on :root or html element) */
export const THEMES = ['slate', 'warm', 'cosmic', 'terminal'] as const
export type ThemeName = typeof THEMES[number]

/** Helper: get the CSS class for a given palette */
export function getThemeClass(theme: ThemeName): string {
  return `theme-${theme}`
}
