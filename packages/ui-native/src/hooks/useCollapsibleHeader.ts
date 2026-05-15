/**
 * useCollapsibleHeader — scroll-driven header animation hook.
 *
 * Pairs with the collapsible variant of `<AppHeader>`. Returns a scroll
 * handler you spread onto a ScrollView/FlatList plus animated styles for
 * the header container and (optionally) its title. The header hides on
 * scroll-down past `threshold`, reveals on any up-scroll, and can shrink
 * its title proportionally as content scrolls under it.
 *
 * All motion is Reanimated 4 only and respects `useReducedMotion()` —
 * when the OS pref is on, the styles collapse to identity (no motion).
 *
 * @example
 * const { scrollHandler, headerStyle, titleStyle } = useCollapsibleHeader({
 *   threshold: 80,
 *   shrinkTitle: true,
 * })
 * return (
 *   <>
 *     <AppHeader title="Profile" collapsible animatedStyle={headerStyle} />
 *     <ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
 *       <Animated.Text style={titleStyle}>Profile</Animated.Text>
 *       {/* ... *\/}
 *     </ScrollView>
 *   </>
 * )
 */

import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native'
import {
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
  Easing,
  type SharedValue,
  type AnimatedStyle,
} from 'react-native-reanimated'

/** Options accepted by {@link useCollapsibleHeader}. */
export interface UseCollapsibleHeaderOptions {
  /** Pixels of scroll-down before the hide behavior triggers. Default `80`. */
  threshold?: number
  /** Hide header on down-scroll past `threshold`. Default `true`. */
  hideOnScrollDown?: boolean
  /** Shrink the large title to small as content scrolls under it. Default `false`. */
  shrinkTitle?: boolean
  /** Immediately reveal the header on any up-scroll. Default `true`. */
  reverseHideOnScrollUp?: boolean
}

/** Return shape of {@link useCollapsibleHeader}. */
export interface UseCollapsibleHeaderReturn {
  /** Pass to a ScrollView/FlatList `onScroll` prop. */
  scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  /** Pass to `<AppHeader animatedStyle={...} collapsible />`. */
  headerStyle: AnimatedStyle<{ transform: { translateY: number }[]; opacity: number }>
  /** Pass to a title element rendered inside the scrollable content. */
  titleStyle: AnimatedStyle<{
    transform: { scale: number }[]
    marginTop: number
    opacity: number
  }>
  /** Raw scroll Y as a Reanimated shared value, in case callers need it. */
  scrollY: SharedValue<number>
}

/** Approx height of an `<AppHeader>` (used for the hidden translate). */
const HEADER_HIDE_DISTANCE = 96

/** Standard easing for show/hide — fast, smooth, no bounce. */
const EASE_OUT_CUBIC = Easing.bezier(0.215, 0.61, 0.355, 1)

const TIMING = { duration: 200, easing: EASE_OUT_CUBIC } as const

/**
 * Scroll-driven header animation hook. See module JSDoc for example.
 */
export function useCollapsibleHeader(
  opts: UseCollapsibleHeaderOptions = {},
): UseCollapsibleHeaderReturn {
  const {
    threshold = 80,
    hideOnScrollDown = true,
    shrinkTitle = false,
    reverseHideOnScrollUp = true,
  } = opts

  const reducedMotion = useReducedMotion()

  const scrollY = useSharedValue(0)
  const lastY = useSharedValue(0)
  // 0 = visible, 1 = hidden. Animated to either via withTiming.
  const hidden = useSharedValue(0)

  const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const y = event.nativeEvent.contentOffset.y
    scrollY.value = y

    if (reducedMotion) {
      lastY.value = y
      return
    }

    const delta = y - lastY.value

    if (reverseHideOnScrollUp && delta < 0) {
      // Any up-scroll → reveal immediately.
      if (hidden.value !== 0) {
        hidden.value = withTiming(0, TIMING)
      }
    } else if (hideOnScrollDown && delta > 0 && y > threshold) {
      // Down-scroll past threshold → hide.
      if (hidden.value !== 1) {
        hidden.value = withTiming(1, TIMING)
      }
    } else if (y <= 0) {
      // Pulled to top → always visible.
      if (hidden.value !== 0) {
        hidden.value = withTiming(0, TIMING)
      }
    }

    lastY.value = y
  }

  const headerStyle = useAnimatedStyle(() => {
    if (reducedMotion) {
      return { transform: [{ translateY: 0 }], opacity: 1 }
    }
    const translateY = interpolate(hidden.value, [0, 1], [0, -HEADER_HIDE_DISTANCE])
    const opacity = interpolate(hidden.value, [0, 1], [1, 0])
    return { transform: [{ translateY }], opacity }
  }, [reducedMotion, hidden])

  const titleStyle = useAnimatedStyle(() => {
    if (reducedMotion || !shrinkTitle) {
      return { transform: [{ scale: 1 }], marginTop: 0, opacity: 1 }
    }
    const clamped = Math.min(Math.max(scrollY.value, 0), threshold)
    const scale = interpolate(clamped, [0, threshold], [1, 0.7])
    const marginTop = interpolate(clamped, [0, threshold], [0, -8])
    const opacity = interpolate(clamped, [0, threshold], [1, 0.85])
    return { transform: [{ scale }], marginTop, opacity }
  }, [reducedMotion, shrinkTitle, scrollY, threshold])

  return { scrollHandler, headerStyle, titleStyle, scrollY }
}
