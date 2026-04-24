import { defaultConfig } from '@tamagui/config/v5'
import { createTamagui, type TamaguiInternalConfig } from 'tamagui'
import {
  otfThemes,
  slateDarkColors,
  slateLightColors,
  warmDarkColors,
  warmLightColors,
  cosmicDarkColors,
  cosmicLightColors,
  terminalDarkColors,
  terminalLightColors,
} from '@otf/tokens'

/**
 * OTF Tamagui config with all 4 palette themes (light + dark × 4 = 8 themes).
 * Uses the $color1–$color12 scale from @otf/tokens/native.
 */
export const otfConfig: TamaguiInternalConfig = createTamagui({
  ...defaultConfig,
  themes: {
    // Slate = default
    dark: slateDarkColors,
    light: slateLightColors,
    'dark-warm': warmDarkColors,
    'light-warm': warmLightColors,
    'dark-cosmic': cosmicDarkColors,
    'light-cosmic': cosmicLightColors,
    'dark-terminal': terminalDarkColors,
    'light-terminal': terminalLightColors,
  },
})

export type OtfConfig = typeof otfConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends OtfConfig {}
}
