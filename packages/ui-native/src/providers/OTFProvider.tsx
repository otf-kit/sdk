import * as React from 'react'
import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'
import { otfConfig } from '../config/tamagui.config'

/**
 * `<OTFProvider>` is the single root your app needs to use any OTF component.
 * Wraps the underlying provider with the default OTF token config — no
 * `createTamagui` call required on the consumer side.
 *
 * @example Basic usage — OTF tokens, OS-driven theme
 * ```tsx
 * import { OTFProvider } from '@otfdashkit/ui-native'
 *
 * export default function App() {
 *   return (
 *     <OTFProvider>
 *       <YourScreens />
 *     </OTFProvider>
 *   )
 * }
 * ```
 *
 * @example Custom default theme
 * ```tsx
 * <OTFProvider defaultTheme="ocean-teal">
 *   <YourScreens />
 * </OTFProvider>
 * ```
 *
 * @example Advanced — pass your own merged config
 * ```tsx
 * import { OTFProvider, createOTFConfig, otfConfig } from '@otfdashkit/ui-native'
 *
 * const config = createOTFConfig({ ...otfConfig, defaultTheme: 'cosmic-dark' })
 *
 * <OTFProvider config={config}>
 *   <YourScreens />
 * </OTFProvider>
 * ```
 */
export type OTFProviderProps = Omit<TamaguiProviderProps, 'config'> & {
  /** Optional override of the built OTF config. Defaults to `otfConfig`. */
  config?: TamaguiProviderProps['config']
}

export function OTFProvider({ config = otfConfig, children, ...rest }: OTFProviderProps) {
  return (
    <TamaguiProvider config={config} {...rest}>
      {children}
    </TamaguiProvider>
  )
}
