import { useEffect, useState } from 'react'
import {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedReaction,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

export interface UseCountUpOptions {
  /** Wait in ms before counting, e.g. until an entrance animation settles. Default `0`. */
  delay?: number
  /** Count length in ms. `0` (default) skips the count and returns `target`. */
  duration?: number
  /** Targets with an absolute value below this skip the count. Default `10`. */
  countMin?: number
  /** Starting figure. Default `0`. */
  from?: number
  /** Decimal places the count steps through and lands on. Default `0`. */
  decimals?: number
}

const easeOut = Easing.out(Easing.cubic)

/**
 * Counts `from` → `target` and returns the number to show. Returns `target` at once
 * when `duration` is 0, under reduced motion, or below `countMin`. Mid-count it
 * returns `null` until the count passes 1, so a `+N` label never reads "+0" or "+1".
 */
export function useCountUp(
  target: number,
  { delay = 0, duration = 0, countMin = 10, from = 0, decimals = 0 }: UseCountUpOptions = {},
): number | null {
  const reduced = useReducedMotion()
  const animate = duration > 0 && !reduced && Math.abs(target) >= countMin
  const step = 10 ** decimals
  const value = useSharedValue(animate ? from : target)
  const [shown, setShown] = useState(animate ? from : target)

  useEffect(() => {
    if (!animate) {
      cancelAnimation(value)
      value.value = target
      return
    }
    value.value = withDelay(delay, withTiming(target, { duration, easing: easeOut }))
    return () => cancelAnimation(value)
  }, [animate, target, delay, duration, value])

  // Re-render only when the figure at `decimals` changes; the last frame lands on `target` exactly.
  useAnimatedReaction(
    () => {
      'worklet'
      const v = value.value
      return v === target ? target : Math.round(v * step) / step
    },
    (cur, prev) => {
      'worklet'
      if (cur !== prev) runOnJS(setShown)(cur)
    },
    [value, target, step],
  )

  if (!animate) return target
  return from !== 0 || Math.abs(shown) > 1 || shown === target ? shown : null
}
