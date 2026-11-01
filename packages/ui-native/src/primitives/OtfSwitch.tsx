import { useEffect, useState } from 'react'
import { Platform, Pressable } from 'react-native'
import { useTheme } from 'tamagui'
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { switchThumbOn } from './switchThumb'

export type OtfSwitchProps = {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  /** `md` (51x31, iOS proportions) for rows, `sm` (40x24) for dense popovers. Tamagui `$2`-`$4` still map. */
  size?: 'sm' | 'md' | '$2' | '$3' | '$4'
  /** On track + ring. Defaults to the theme accent (`$color9`); hex-token kits pass their own primary. */
  activeColor?: string
  /** Off ring. Defaults to muted text (`$color11`), which clears 3:1 on light and dark cards. */
  inactiveColor?: string
  /** Off track fill. Defaults to the surface (`$color2`). */
  trackColor?: string
  /** On thumb. Defaults to white, or dark ink on pale accents where white would sit under 2:1. */
  activeThumbColor?: string
  accessibilityLabel?: string
}

const GEOMETRY = {
  sm: { w: 40, h: 24, off: 16, on: 20, stretch: 6 },
  md: { w: 51, h: 31, off: 23, on: 27, stretch: 8 },
}
const RING = 1.5
const INSET = 2
const SPRING = Easing.bezier(0.34, 1.36, 0.64, 1)
/**
 * The one OTF toggle. Off: a 1.5px muted ring and a smaller white thumb, so the control reads at 3:1; on: accent
 * track (the ring drops) with a full-size thumb that springs across and stretches while pressed.
 */
export function OtfSwitch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  size = 'md',
  activeColor,
  inactiveColor,
  trackColor,
  activeThumbColor,
  accessibilityLabel,
}: OtfSwitchProps) {
  const theme = useTheme()
  const g = GEOMETRY[size === 'sm' || size === '$2' ? 'sm' : 'md']
  const [inner, setInner] = useState(defaultChecked)
  const on = checked ?? inner
  const [focused, setFocused] = useState(false)

  // Resolved before the animated boundary: Tamagui tokens do not resolve inside Animated.View.
  const accent = activeColor ?? theme.color9?.val ?? '#f97316'
  const muted = inactiveColor ?? theme.color11?.val ?? '#71717a'
  const fill = trackColor ?? theme.color2?.val ?? '#ffffff'
  const thumbOn = activeThumbColor ?? switchThumbOn(accent)

  const reduced = useReducedMotion()
  const p = useSharedValue(on ? 1 : 0)
  const press = useSharedValue(0)
  useEffect(() => {
    p.value = withTiming(on ? 1 : 0, { duration: reduced ? 0 : 420, easing: SPRING })
  }, [on, p, reduced])

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(p.value, [0, 1], [fill, accent]),
    borderColor: interpolateColor(p.value, [0, 1], [muted, accent], 'RGB'),
  }))
  const thumbStyle = useAnimatedStyle(() => {
    const t = interpolate(p.value, [0, 1], [0, 1], Extrapolation.CLAMP)
    const base = interpolate(t, [0, 1], [g.off, g.on])
    const d = base + press.value * (g.on - base)
    const width = d + press.value * g.stretch
    const offLeft = (g.h - g.off) / 2 - RING
    const leftOff = offLeft + press.value * (INSET - RING - offLeft)
    const leftOn = g.w - INSET - RING - width
    return {
      width,
      height: d,
      borderRadius: d / 2,
      top: (g.h - d) / 2 - RING,
      left: interpolate(p.value, [0, 1], [leftOff, leftOn]),
      backgroundColor: interpolateColor(t, [0, 1], ['#ffffff', thumbOn]),
    }
  })

  const toggle = () => {
    if (disabled) return
    if (checked === undefined) setInner(!on)
    onCheckedChange?.(!on)
  }
  const animatePress = (to: number) => {
    press.value = withTiming(disabled ? 0 : to, { duration: reduced ? 0 : 160, easing: Easing.out(Easing.cubic) })
  }

  // react-native-web only maps Space to press on a button, and focus follows mouse clicks: handle both on web.
  const webProps =
    Platform.OS === 'web'
      ? {
          onKeyDown: (e: { key?: string; repeat?: boolean; preventDefault?: () => void }) => {
            if (e.key !== ' ') return
            e.preventDefault?.()
            if (!e.repeat) toggle()
          },
        }
      : {}
  const onFocus = (e: { target?: unknown }) => {
    const el = e.target as { matches?: (q: string) => boolean } | undefined
    setFocused(Platform.OS !== 'web' || !!el?.matches?.(':focus-visible'))
  }

  return (
    <Pressable
      {...webProps}
      accessibilityRole="switch"
      accessibilityState={{ checked: on, disabled: !!disabled }}
      accessibilityLabel={accessibilityLabel}
      role="switch"
      aria-checked={on}
      aria-disabled={!!disabled}
      aria-label={accessibilityLabel}
      disabled={disabled}
      onPress={toggle}
      onPressIn={() => animatePress(1)}
      onPressOut={() => animatePress(0)}
      onFocus={onFocus}
      onBlur={() => setFocused(false)}
      hitSlop={{ top: (44 - g.h) / 2, bottom: (44 - g.h) / 2, left: 6, right: 6 }}
      style={{ opacity: disabled ? 0.4 : 1, borderRadius: g.h, padding: 2, margin: -4, borderWidth: 2, borderColor: focused ? accent : 'transparent' }}
    >
      <Animated.View style={[{ width: g.w, height: g.h, borderRadius: g.h / 2, borderWidth: RING }, trackStyle]}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 3,
            },
            thumbStyle,
          ]}
        />
      </Animated.View>
    </Pressable>
  )
}
