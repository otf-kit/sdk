import type { ReactNode, RefObject } from 'react'
import type { StyleProp, View, ViewStyle } from 'react-native'

export type ShockwaveValue = 'from' | 'to'

export interface ShockwaveOrigin {
  x: number
  y: number
}

export interface ShockwaveProps {
  /** Which slot is currently visible. Toggle to "to" to play the transition forward, back to "from" to play it in reverse. */
  value: ShockwaveValue
  /** Width of the transition surface in px. */
  width: number
  /** Height of the transition surface in px. */
  height: number
  /** Duration of the wave in ms. Defaults to 900. */
  duration?: number
  /** Origin of the wave in px (relative to the surface). Defaults to centre. */
  origin?: ShockwaveOrigin
  /** Peak displacement amplitude. 0 = no displacement, 0.3 = comically aggressive. Default 0.12. */
  shockStrength?: number
  /** Per-channel chromatic aberration multiplier. Default 0.2. */
  lensingSpread?: number
  /** Style applied to the surface wrapper. */
  style?: StyleProp<ViewStyle>
  children?: ReactNode
  /** Fires once the wave settles on the new value. */
  onTransitionEnd?: (value: ShockwaveValue) => void
}

export interface ShockwaveSlotProps {
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

export interface ShockwaveContextValue {
  fromRef: RefObject<View | null>
  toRef: RefObject<View | null>
  activeValue: ShockwaveValue
  isTransitioning: boolean
}
