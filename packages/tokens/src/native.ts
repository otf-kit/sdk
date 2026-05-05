import { defaultConfig } from '@tamagui/config/v5'
import { createTamagui, type TamaguiInternalConfig } from 'tamagui'

// ── Slate palette (Linear-inspired) ─────────────────────────────────
export const slateDarkColors = {
  color1:  'hsl(222, 47%, 7%)',   // bg
  color2:  'hsl(222, 47%, 9%)',   // sidebar bg
  color3:  'hsl(222, 30%, 11%)',  // surface
  color4:  'hsl(217, 33%, 14%)',  // muted bg
  color5:  'hsl(217, 33%, 17%)',  // border
  color6:  'hsl(215, 25%, 25%)',  // subtle border
  color7:  'hsl(215, 20%, 35%)',  // placeholder text
  color8:  'hsl(215, 20%, 45%)',  // muted fg
  color9:  'hsl(239, 84%, 67%)',  // primary (indigo)
  color10: 'hsl(239, 84%, 60%)',  // primary hover
  color11: 'hsl(215, 20%, 75%)',  // secondary text
  color12: 'hsl(215, 20%, 95%)',  // primary text
} as const

export const slateLightColors = {
  color1:  'hsl(0, 0%, 100%)',
  color2:  'hsl(220, 14%, 97%)',
  color3:  'hsl(220, 14%, 94%)',
  color4:  'hsl(220, 14%, 91%)',
  color5:  'hsl(220, 14%, 86%)',
  color6:  'hsl(220, 14%, 78%)',
  color7:  'hsl(220, 14%, 60%)',
  color8:  'hsl(220, 14%, 45%)',
  color9:  'hsl(239, 84%, 67%)',
  color10: 'hsl(239, 84%, 60%)',
  color11: 'hsl(222, 47%, 20%)',
  color12: 'hsl(222, 47%, 11%)',
} as const

// ── Warm palette (Stripe-inspired) ──────────────────────────────────
export const warmDarkColors = {
  color1:  'hsl(20, 14%, 7%)',    // bg
  color2:  'hsl(20, 14%, 9%)',    // sidebar bg
  color3:  'hsl(20, 14%, 11%)',   // surface
  color4:  'hsl(20, 14%, 13%)',   // muted bg
  color5:  'hsl(20, 14%, 17%)',   // border
  color6:  'hsl(25, 12%, 25%)',   // subtle border
  color7:  'hsl(25, 12%, 35%)',   // placeholder text
  color8:  'hsl(25, 12%, 45%)',   // muted fg
  color9:  'hsl(262, 83%, 68%)',  // primary (violet)
  color10: 'hsl(262, 83%, 60%)',  // primary hover
  color11: 'hsl(30, 20%, 75%)',   // secondary text
  color12: 'hsl(30, 20%, 93%)',   // primary text
} as const

export const warmLightColors = {
  color1:  'hsl(0, 0%, 100%)',
  color2:  'hsl(30, 20%, 97%)',
  color3:  'hsl(30, 20%, 95%)',
  color4:  'hsl(30, 20%, 93%)',
  color5:  'hsl(30, 14%, 90%)',
  color6:  'hsl(30, 14%, 82%)',
  color7:  'hsl(25, 12%, 60%)',
  color8:  'hsl(25, 12%, 45%)',
  color9:  'hsl(262, 83%, 68%)',
  color10: 'hsl(262, 83%, 60%)',
  color11: 'hsl(20, 14%, 25%)',
  color12: 'hsl(20, 14%, 11%)',
} as const

// ── Cosmic palette ──────────────────────────────────────────────────
export const cosmicDarkColors = {
  color1:  'hsl(270, 50%, 4%)',   // bg
  color2:  'hsl(270, 40%, 6%)',   // sidebar bg
  color3:  'hsl(270, 35%, 8%)',   // surface
  color4:  'hsl(270, 30%, 11%)',  // muted bg
  color5:  'hsl(270, 30%, 14%)',  // border
  color6:  'hsl(270, 20%, 22%)',  // subtle border
  color7:  'hsl(270, 10%, 35%)',  // placeholder text
  color8:  'hsl(270, 10%, 50%)',  // muted fg
  color9:  'hsl(280, 100%, 70%)', // primary (purple)
  color10: 'hsl(280, 100%, 62%)', // primary hover
  color11: 'hsl(280, 20%, 75%)',  // secondary text
  color12: 'hsl(280, 20%, 95%)',  // primary text
} as const

export const cosmicLightColors = {
  color1:  'hsl(0, 0%, 100%)',
  color2:  'hsl(270, 20%, 97%)',
  color3:  'hsl(270, 20%, 95%)',
  color4:  'hsl(270, 20%, 93%)',
  color5:  'hsl(270, 20%, 90%)',
  color6:  'hsl(270, 20%, 82%)',
  color7:  'hsl(270, 10%, 60%)',
  color8:  'hsl(270, 10%, 45%)',
  color9:  'hsl(280, 100%, 60%)',
  color10: 'hsl(280, 100%, 52%)',
  color11: 'hsl(270, 50%, 22%)',
  color12: 'hsl(270, 50%, 11%)',
} as const

// ── Terminal palette (Vercel-inspired) ──────────────────────────────
export const terminalDarkColors = {
  color1:  'hsl(0, 0%, 4%)',      // bg
  color2:  'hsl(0, 0%, 6%)',      // sidebar bg
  color3:  'hsl(0, 0%, 8%)',      // surface
  color4:  'hsl(0, 0%, 12%)',     // muted bg
  color5:  'hsl(0, 0%, 15%)',     // border
  color6:  'hsl(0, 0%, 22%)',     // subtle border
  color7:  'hsl(0, 0%, 35%)',     // placeholder text
  color8:  'hsl(0, 0%, 50%)',     // muted fg
  color9:  'hsl(0, 0%, 100%)',    // primary (white)
  color10: 'hsl(0, 0%, 88%)',     // primary hover
  color11: 'hsl(0, 0%, 72%)',     // secondary text
  color12: 'hsl(0, 0%, 95%)',     // primary text
} as const

export const terminalLightColors = {
  color1:  'hsl(0, 0%, 100%)',
  color2:  'hsl(0, 0%, 97%)',
  color3:  'hsl(0, 0%, 95%)',
  color4:  'hsl(0, 0%, 93%)',
  color5:  'hsl(0, 0%, 90%)',
  color6:  'hsl(0, 0%, 82%)',
  color7:  'hsl(0, 0%, 60%)',
  color8:  'hsl(0, 0%, 45%)',
  color9:  'hsl(0, 0%, 9%)',
  color10: 'hsl(0, 0%, 18%)',
  color11: 'hsl(0, 0%, 20%)',
  color12: 'hsl(0, 0%, 9%)',
} as const

// ── Theme map ────────────────────────────────────────────────────────
export const otfThemes = {
  dark:             slateDarkColors,
  light:            slateLightColors,
  'dark-warm':      warmDarkColors,
  'light-warm':     warmLightColors,
  'dark-cosmic':    cosmicDarkColors,
  'light-cosmic':   cosmicLightColors,
  'dark-terminal':  terminalDarkColors,
  'light-terminal': terminalLightColors,
} as const

export type OtfThemeName = keyof typeof otfThemes

// ── Tamagui config ───────────────────────────────────────────────────
export const otfConfig: TamaguiInternalConfig = createTamagui({
  ...defaultConfig,
  themes: otfThemes,
})

export type OtfConfig = typeof otfConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends OtfConfig {}
}
