import { defaultConfig } from '@tamagui/config/v5'
import { createTamagui, type TamaguiInternalConfig } from 'tamagui'

export const otfConfig: TamaguiInternalConfig = createTamagui({
  ...defaultConfig,
})

export type OtfConfig = typeof otfConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends OtfConfig {}
}
