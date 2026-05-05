/**
 * RulerScrubber — horizontal ruler-style numeric value picker.
 *
 * Apple-Health-flavored continuous-range input. Renders ticks every `step`
 * with longer labeled ticks every `labelEvery`, snaps to the nearest tick on
 * scroll-end, and surfaces a centered value display above the ruler. Uses
 * Reanimated 4 for the scroll handler + per-tick interpolation; falls back to
 * static ticks when `useReducedMotion()` is on. Optional iOS haptic on every
 * step crossed.
 *
 * @example Target weight (50–120 kg, half-kg steps)
 * const [weight, setWeight] = useState(70)
 * <RulerScrubber min={50} max={120} step={0.5} value={weight} onChange={setWeight} unit="kg" />
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Platform,
  type AccessibilityActionEvent,
  type LayoutChangeEvent,
} from 'react-native'
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated'
import { SizableText, View, XStack, YStack } from 'tamagui'

// expo-haptics is wrapped — gracefully no-op on web / older Android targets
// where the native module isn't present. The dependency is approved for
// pattern-tier components per the 2026-05-03 mobile primitives ADR.
type HapticsModule = { selectionAsync: () => Promise<void> }
let Haptics: HapticsModule | null = null
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  Haptics = require('expo-haptics') as HapticsModule
} catch {
  Haptics = null
}

/** Public props for {@link RulerScrubber}. */
export interface RulerScrubberProps {
  min: number
  max: number
  /** Distance between adjacent ticks, in source units. Default `1`. */
  step?: number
  value: number
  onChange: (next: number) => void
  /** Unit label rendered next to the big value display (e.g. `'kg'`). */
  unit?: string
  /** Show the centered big-number display above the ruler. Default `true`. */
  showValue?: boolean
  /**
   * Render every Nth tick as the longer "labeled" tick. `1` labels every
   * step; `5` labels every 5 steps. Default `5`.
   */
  labelEvery?: number
  /** Fire `Haptics.selectionAsync()` on each step crossed during scrub. Default `true`. */
  haptic?: boolean
  /** Pixel spacing between adjacent ticks. Default `12`. */
  tickSpacing?: number
  /** Visual height of the ruler area (excludes the value display). Default `96`. */
  height?: number
  /** Active-tick + center indicator color. Tamagui token or hex. Default `'$color12'`. */
  accent?: string
  disabled?: boolean
}

/** Tick row heights — long tick gets the label, short tick is decorative. */
const LONG_TICK_HEIGHT = 24
const SHORT_TICK_HEIGHT = 12
/** Width (in px) of the visible "active" window used to weight tick saturation. */
const ACTIVE_WINDOW_PX = 60

/** Quantize an arbitrary number into the nearest tick index. */
function quantizeIndex(
  rawValue: number,
  min: number,
  step: number,
  totalTicks: number,
): number {
  const idx = Math.round((rawValue - min) / step)
  if (idx < 0) return 0
  if (idx > totalTicks - 1) return totalTicks - 1
  return idx
}

/** Convert a tick index back to a value, clamped + rounded to avoid float drift. */
function indexToValue(index: number, min: number, step: number): number {
  // Round to a reasonable precision so 0.5 steps don't accumulate FP error.
  const raw = min + index * step
  const decimals = step < 1 ? 2 : 0
  const factor = 10 ** decimals
  return Math.round(raw * factor) / factor
}

/**
 * Single tick. Memoized via `useAnimatedStyle` so the per-tick opacity/color
 * interpolation runs on the UI thread without re-rendering each tick on every
 * scroll event.
 */
function Tick({
  index,
  totalTicks,
  tickSpacing,
  isLabeled,
  scrollX,
  viewportWidth,
  accent,
  reducedMotion,
}: {
  index: number
  totalTicks: number
  tickSpacing: number
  isLabeled: boolean
  scrollX: SharedValue<number>
  viewportWidth: number
  accent: string
  reducedMotion: boolean
}) {
  const tickHeight = isLabeled ? LONG_TICK_HEIGHT : SHORT_TICK_HEIGHT

  const animatedStyle = useAnimatedStyle(() => {
    if (reducedMotion || viewportWidth === 0) {
      return { opacity: isLabeled ? 0.95 : 0.45, backgroundColor: '#9aa0a6' }
    }
    // Distance (in px) from this tick's center to the viewport's center.
    const tickCenterX = index * tickSpacing
    const viewportCenterX = scrollX.value
    const distance = Math.abs(tickCenterX - viewportCenterX)

    const opacity = interpolate(
      distance,
      [0, ACTIVE_WINDOW_PX, ACTIVE_WINDOW_PX * 2],
      [1, 0.6, 0.25],
      'clamp',
    )
    // Saturate from a muted neutral to the accent color as the tick approaches center.
    const color = interpolateColor(
      distance,
      [0, ACTIVE_WINDOW_PX * 1.2],
      [accent, '#9aa0a6'],
    )
    return { opacity, backgroundColor: color }
  }, [index, totalTicks, tickSpacing, viewportWidth, accent, reducedMotion, isLabeled])

  return (
    <View
      width={tickSpacing}
      height={LONG_TICK_HEIGHT + 24}
      alignItems="center"
      justifyContent="flex-start"
    >
      <Animated.View
        style={[
          { width: 2, height: tickHeight, borderRadius: 1 },
          animatedStyle,
        ]}
      />
    </View>
  )
}

/** Internal renderer for the labeled value sitting under the tick. */
function TickLabel({
  index,
  min,
  step,
  tickSpacing,
}: {
  index: number
  min: number
  step: number
  tickSpacing: number
}) {
  const value = indexToValue(index, min, step)
  return (
    <View
      position="absolute"
      top={LONG_TICK_HEIGHT + 4}
      width={tickSpacing * 6}
      left={index * tickSpacing - tickSpacing * 3 + tickSpacing / 2}
      alignItems="center"
      pointerEvents="none"
    >
      <SizableText size="$2" color="$color10" numberOfLines={1}>
        {value}
      </SizableText>
    </View>
  )
}

/**
 * Horizontal ruler-style numeric value picker. See {@link RulerScrubberProps}.
 */
export function RulerScrubber({
  min,
  max,
  step = 1,
  value,
  onChange,
  unit,
  showValue = true,
  labelEvery = 5,
  haptic = true,
  tickSpacing = 12,
  height = 96,
  accent = '$color12',
  disabled = false,
}: RulerScrubberProps) {
  const reducedMotion = useReducedMotion()

  // Total ticks across the range. e.g. min=50, max=120, step=0.5 → 141 ticks.
  const totalTicks = Math.max(1, Math.round((max - min) / step) + 1)

  // Viewport width measured once via onLayout so we can pad the scroll content
  // by half a viewport on each side (lets the first + last tick sit centered
  // under the indicator).
  const [viewportWidth, setViewportWidth] = useState(0)

  // Scroll offset SharedValue — drives both per-tick interpolation and snap math.
  const scrollX = useSharedValue(0)
  // Last reported value (for parent onChange dedupe + haptic step counting).
  const lastReportedValueRef = useRef<number>(value)
  // Last index we fired a haptic for during a continuous scrub.
  const lastHapticIndexRef = useRef<number>(quantizeIndex(value, min, step, totalTicks))
  // Imperative ref to the underlying Animated.ScrollView for snap-back scrolls.
  const scrollRef = useRef<Animated.ScrollView | null>(null)

  /** Compute the scrollX offset where a given tick index sits centered. */
  const offsetForIndex = useCallback(
    (index: number): number => index * tickSpacing,
    [tickSpacing],
  )

  /** Imperatively scroll the ruler so a given tick index is centered. */
  const scrollToIndex = useCallback(
    (index: number, animated: boolean) => {
      const node = scrollRef.current
      if (!node || viewportWidth === 0) return
      node.scrollTo({ x: offsetForIndex(index), y: 0, animated })
    },
    [offsetForIndex, viewportWidth],
  )

  // Initial scroll-to-value: once we know the viewport width, snap the
  // scrollview to the controlled `value`. We only run this once per
  // mount/viewport-measurement to avoid fighting user gestures.
  const didInitialScrollRef = useRef(false)
  useEffect(() => {
    if (viewportWidth === 0 || didInitialScrollRef.current) return
    const idx = quantizeIndex(value, min, step, totalTicks)
    scrollToIndex(idx, false)
    didInitialScrollRef.current = true
  }, [viewportWidth, value, min, step, totalTicks, scrollToIndex])

  // Re-sync when the controlled `value` is changed externally (e.g. parent
  // resets the scrubber). Only scrolls if the new value maps to a different
  // tick than what we last reported, to avoid clobbering active scrubbing.
  useEffect(() => {
    if (viewportWidth === 0) return
    if (value === lastReportedValueRef.current) return
    const idx = quantizeIndex(value, min, step, totalTicks)
    scrollToIndex(idx, true)
    lastReportedValueRef.current = value
    lastHapticIndexRef.current = idx
  }, [value, min, step, totalTicks, viewportWidth, scrollToIndex])

  /** Fire a single haptic tick (best-effort). */
  const fireHapticTick = useCallback(() => {
    if (!haptic) return
    if (Platform.OS !== 'ios') return
    if (!Haptics) return
    void Haptics.selectionAsync().catch(() => undefined)
  }, [haptic])

  /** Called from worklet when scrollX crosses into a new tick during scrub. */
  const onTickCrossed = useCallback(
    (newIndex: number) => {
      if (newIndex === lastHapticIndexRef.current) return
      lastHapticIndexRef.current = newIndex
      fireHapticTick()
    },
    [fireHapticTick],
  )

  /** Called from worklet on momentum-end to snap + commit final value. */
  const commitSnap = useCallback(
    (rawOffset: number) => {
      const index = quantizeIndex(
        rawOffset / tickSpacing + min / step - min / step,
        min,
        step,
        totalTicks,
      )
      const snappedOffset = offsetForIndex(index)
      // Snap-back if we're not exactly on the tick (sub-pixel). `animated:true`
      // gives a little spring as the picker settles.
      if (Math.abs(rawOffset - snappedOffset) > 0.5) {
        scrollToIndex(index, true)
      }
      const next = indexToValue(index, min, step)
      if (next !== lastReportedValueRef.current) {
        lastReportedValueRef.current = next
        lastHapticIndexRef.current = index
        onChange(next)
      }
    },
    [tickSpacing, min, step, totalTicks, offsetForIndex, scrollToIndex, onChange],
  )

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      'worklet'
      const x = event.contentOffset.x
      scrollX.value = x
      // Cheap haptic-tick detection: which integer tick are we closest to?
      const idx = Math.round(x / tickSpacing)
      if (idx >= 0 && idx < totalTicks) {
        runOnJS(onTickCrossed)(idx)
      }
    },
    onMomentumEnd: (event) => {
      'worklet'
      runOnJS(commitSnap)(event.contentOffset.x)
    },
    onEndDrag: (event) => {
      'worklet'
      // If the user releases without enough velocity to trigger momentum,
      // momentumEnd never fires — handle the snap here as a fallback.
      const vx = event.velocity?.x ?? 0
      if (Math.abs(vx) < 0.05) {
        runOnJS(commitSnap)(event.contentOffset.x)
      }
    },
  })

  /** Capture viewport width — drives the half-viewport content padding. */
  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width
    setViewportWidth((prev) => (prev === w ? prev : w))
  }, [])

  /** A11y: support iOS/Android "adjustable" increment/decrement gestures. */
  const handleAccessibilityAction = useCallback(
    (event: AccessibilityActionEvent) => {
      if (disabled) return
      const action = event.nativeEvent.actionName
      const currentIdx = quantizeIndex(
        lastReportedValueRef.current,
        min,
        step,
        totalTicks,
      )
      let nextIdx = currentIdx
      if (action === 'increment') nextIdx = Math.min(currentIdx + 1, totalTicks - 1)
      if (action === 'decrement') nextIdx = Math.max(currentIdx - 1, 0)
      if (nextIdx === currentIdx) return
      const next = indexToValue(nextIdx, min, step)
      lastReportedValueRef.current = next
      lastHapticIndexRef.current = nextIdx
      scrollToIndex(nextIdx, true)
      onChange(next)
    },
    [disabled, min, step, totalTicks, scrollToIndex, onChange],
  )

  // Center indicator pill — vertical bar pinned to the viewport center.
  const indicatorLeft = viewportWidth > 0 ? viewportWidth / 2 - 2 : 0

  // Half-viewport padding lets the first + last ticks reach the center indicator.
  const horizontalPadding = viewportWidth > 0 ? viewportWidth / 2 : 0

  // Indices of labeled ticks (every `labelEvery` ticks).
  const labeledIndices: number[] = []
  for (let i = 0; i < totalTicks; i += labelEvery) labeledIndices.push(i)

  // Format the displayed value with the same precision as the step.
  const decimals = step < 1 ? 1 : 0
  const displayValue = value.toFixed(decimals)

  return (
    <YStack opacity={disabled ? 0.5 : 1}>
      {showValue ? (
        <XStack alignItems="baseline" justifyContent="center" gap="$2" marginBottom="$3">
          <SizableText fontSize={40} fontWeight="700" color="$color12" lineHeight={44}>
            {displayValue}
          </SizableText>
          {unit ? (
            <SizableText size="$5" color="$color10" fontWeight="500">
              {unit}
            </SizableText>
          ) : null}
        </XStack>
      ) : null}

      <View
        height={height}
        onLayout={handleLayout}
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={`${displayValue}${unit ? ` ${unit}` : ''}`}
        accessibilityValue={{ min, max, now: Number(displayValue) }}
        accessibilityActions={[
          { name: 'increment', label: 'Increase' },
          { name: 'decrement', label: 'Decrease' },
        ]}
        onAccessibilityAction={handleAccessibilityAction}
        position="relative"
        overflow="hidden"
      >
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          decelerationRate="fast"
          scrollEnabled={!disabled}
          contentContainerStyle={{
            paddingHorizontal: horizontalPadding,
            paddingTop: 8,
          }}
        >
          <View
            width={Math.max(totalTicks * tickSpacing, 1)}
            height={height - 16}
            position="relative"
          >
            <XStack>
              {Array.from({ length: totalTicks }).map((_, i) => {
                const isLabeled = i % labelEvery === 0
                return (
                  <Tick
                    key={i}
                    index={i}
                    totalTicks={totalTicks}
                    tickSpacing={tickSpacing}
                    isLabeled={isLabeled}
                    scrollX={scrollX}
                    viewportWidth={viewportWidth}
                    accent={typeof accent === 'string' && accent.startsWith('$') ? '#ffffff' : accent}
                    reducedMotion={reducedMotion}
                  />
                )
              })}
            </XStack>
            {labeledIndices.map((idx) => (
              <TickLabel
                key={`label-${idx}`}
                index={idx}
                min={min}
                step={step}
                tickSpacing={tickSpacing}
              />
            ))}
          </View>
        </Animated.ScrollView>

        {/* Center indicator — vertical pill pinned to viewport center. */}
        <View
          position="absolute"
          top={4}
          left={indicatorLeft}
          width={4}
          height={LONG_TICK_HEIGHT + 12}
          backgroundColor={accent}
          borderRadius={2}
          pointerEvents="none"
        />
      </View>
    </YStack>
  )
}
