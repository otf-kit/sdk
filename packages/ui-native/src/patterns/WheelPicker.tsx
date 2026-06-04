/**
 * WheelPicker — vertical ruler-style value picker.
 *
 * The vertical counterpart of RulerScrubber: ticks scroll past a fixed
 * center needle; the tick nearest the needle is the selected value. Long
 * ticks (labeled) appear every `labelEvery` options; short ticks fill the
 * gaps. Tick color interpolates from accent (at center) to muted gray
 * as distance from the needle grows — the same `interpolateColor` pattern
 * RulerScrubber uses for its horizontal ticks.
 *
 * Implementation: `Animated.ScrollView` (NOT FlatList) — avoids the
 * "VirtualizedLists nested inside ScrollView" warning when the picker
 * lives inside a page-level ScrollView.
 *
 * Honors `useReducedMotion()`. A11y: adjustable role + increment/decrement.
 *
 * @example
 * <WheelPicker
 *   options={Array.from({ length: 81 }, (_, i) => ({ value: 140 + i, label: String(140 + i) }))}
 *   value={height}
 *   onChange={setHeight}
 *   unitLabel="cm"
 *   showValue
 * />
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type JSX,
} from 'react'
import {
  Platform,
  ScrollView,
  Text,
  View as RNView,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native'
import { SizableText, View, XStack, YStack, useTheme } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  interpolateColor,
  Extrapolation,
  useReducedMotion,
  type SharedValue,
} from 'react-native-reanimated'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

// Long tick width for labeled options; short tick for unlabeled.
const LONG_TICK_W = 48
const SHORT_TICK_W = 20
// px window on each side of center where ticks saturate to accent.
const ACTIVE_WINDOW_PX = 32

// expo-haptics wrapped — gracefully no-op on web / older Android.
type HapticsModule = { selectionAsync: () => Promise<void> }
let Haptics: HapticsModule | null = null
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  Haptics = require('expo-haptics') as HapticsModule
} catch {
  Haptics = null
}

export interface WheelPickerOption<T extends string | number> {
  value: T
  label: string
}

export interface WheelPickerProps<T extends string | number> {
  options: WheelPickerOption<T>[]
  value: T
  onChange: (v: T) => void
  /**
   * Pixel spacing between adjacent ticks (vertical distance per option).
   * Default `10`.
   */
  itemSpacing?: number
  /**
   * Show a labeled (long) tick every N options. Default auto-detected:
   * ≤10 options → 1, ≤50 → 5, else → 10.
   */
  labelEvery?: number
  /** Total visible height of the ruler area. Default `200`. */
  height?: number
  /** Unit label beside the large value display. */
  unitLabel?: string
  /** Fire `Haptics.selectionAsync()` on iOS at each snapped value. Default true. */
  haptic?: boolean
  /** Visual chrome. `plain` = no bg, `card` = bordered surface. Default `plain`. */
  variant?: 'plain' | 'card'
  /** Accent color for center ticks + needle. Default `$color12`. */
  accent?: string
  /** Width of the picker container. Default `'100%'`. */
  width?: number | string
  disabled?: boolean
  /**
   * Show the large value + unit label above the ruler — matches
   * RulerScrubber's built-in display. Default `false`.
   */
  showValue?: boolean
}

/** Single horizontal tick — mirrors RulerScrubber's vertical Tick component. */
function Tick({
  index,
  label,
  isLabeled,
  itemSpacing,
  scrollY,
  accent,
  reducedMotion,
}: {
  index: number
  label: string
  isLabeled: boolean
  itemSpacing: number
  scrollY: SharedValue<number>
  accent: string
  reducedMotion: boolean
}): JSX.Element {
  const tickStyle = useAnimatedStyle(() => {
    'worklet'
    if (reducedMotion) {
      return {
        opacity: isLabeled ? 0.95 : 0.45,
        backgroundColor: '#9aa0a6',
      }
    }
    // Distance in px from this tick to the center needle.
    const tickY = index * itemSpacing
    const distance = Math.abs(tickY - scrollY.value)

    const opacity = interpolate(
      distance,
      [0, ACTIVE_WINDOW_PX, ACTIVE_WINDOW_PX * 3],
      [1, 0.65, isLabeled ? 0.28 : 0.15],
      Extrapolation.CLAMP,
    )
    // Saturate from accent to muted gray as distance grows — identical to
    // RulerScrubber's interpolateColor on tick saturation.
    const color = interpolateColor(
      distance,
      [0, ACTIVE_WINDOW_PX * 1.5],
      [accent, '#9aa0a6'],
    )
    return { opacity, backgroundColor: color }
  }, [index, itemSpacing, accent, reducedMotion, isLabeled])

  return (
    <RNView
      style={{
        height: itemSpacing,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Horizontal tick bar, centered under the needle (the vertical mirror
          of RulerScrubber's centered vertical bars). */}
      <Animated.View
        style={[
          {
            width: isLabeled ? LONG_TICK_W : SHORT_TICK_W,
            height: isLabeled ? 3 : 1.5,
            borderRadius: 2,
          },
          tickStyle,
        ]}
      />
      {/* Measurement label floats just to the right of the long tick —
          perpendicular to the scroll axis, like RulerScrubber's labels sit
          below its ticks. Absolutely positioned so it never shifts the bar
          off-center. */}
      {isLabeled ? (
        <Text
          numberOfLines={1}
          style={{
            position: 'absolute',
            left: '50%',
            marginLeft: LONG_TICK_W / 2 + 12,
            top: '50%',
            marginTop: -8,
            fontSize: 12,
            lineHeight: 16,
            color: '#9aa0a6',
            fontWeight: '500',
          }}
        >
          {label}
        </Text>
      ) : null}
    </RNView>
  )
}

export function WheelPicker<T extends string | number>(
  props: WheelPickerProps<T>,
): JSX.Element {
  const {
    options,
    value,
    onChange,
    itemSpacing = 10,
    height: rulerHeight = 200,
    unitLabel,
    haptic = true,
    variant = 'plain',
    accent = '$color12',
    width = '100%',
    disabled = false,
    showValue = false,
  } = props

  // Auto-detect labelEvery if not specified.
  const labelEvery =
    props.labelEvery ??
    (options.length <= 10 ? 1 : options.length <= 50 ? 5 : 10)

  const reducedMotion = useReducedMotion()
  const scrollRef = useRef<ScrollView>(null)
  const scrollY = useSharedValue(0)
  const lastReportedIndex = useRef<number>(-1)

  // Resolve accent token to a concrete hex value for the worklet.
  const theme = useTheme()
  const accentHex = (() => {
    if (typeof accent === 'string' && accent.startsWith('$')) {
      return theme.color12?.val ?? '#ffffff'
    }
    return accent
  })()

  const fadeColor =
    (variant === 'card' ? theme.color2?.val : theme.background?.val) ??
    theme.color1?.val ??
    '#0a0a0a'

  const valueIndex = useMemo(
    () => options.findIndex((o) => o.value === value),
    [options, value],
  )
  const safeValueIndex = valueIndex === -1 ? 0 : valueIndex
  const currentLabel = options[safeValueIndex]?.label ?? ''

  // Padding so first/last items can reach the center needle. The extra
  // `- itemSpacing / 2` aligns each item's *center* with the needle when its
  // scroll offset is an exact multiple of `itemSpacing` — so the value the
  // snap math commits (round(offsetY / itemSpacing)) is the value that visually
  // sits on the needle. Without it the bar lands half a step below the needle.
  const paddingEdge = rulerHeight / 2 - itemSpacing / 2

  useEffect(() => {
    if (safeValueIndex < 0 || options.length === 0) return
    const t = setTimeout(() => {
      scrollRef.current?.scrollTo({ y: safeValueIndex * itemSpacing, animated: false })
    }, 0)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeValueIndex, options.length])

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      'worklet'
      scrollY.value = e.contentOffset.y
    },
  }, [scrollY])

  // Commit the value at a given scroll offset. `offsetY / itemSpacing` IS the
  // item index (matches the initial scrollTo + snapToInterval math), so the
  // committed value is always the one resting on the needle — never the
  // minimum.
  const commitAtOffset = useCallback(
    (offsetY: number) => {
      const index = Math.round(offsetY / itemSpacing)
      const clamped = Math.max(0, Math.min(options.length - 1, index))
      if (clamped === lastReportedIndex.current) return
      lastReportedIndex.current = clamped
      const next = options[clamped]
      if (!next) return
      if (next.value !== value) {
        if (haptic && Platform.OS === 'ios' && Haptics) {
          Haptics.selectionAsync().catch(() => {})
        }
        onChange(next.value)
      }
    },
    [haptic, itemSpacing, onChange, options, value],
  )

  const handleMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      commitAtOffset(e.nativeEvent.contentOffset.y)
    },
    [commitAtOffset],
  )

  // Fallback for slow drag-releases that never build enough velocity to fire
  // momentum (common on Android). Only commit when velocity is ~0 so we don't
  // commit an intermediate value mid-fling — momentumEnd handles the fling.
  const handleScrollEndDrag = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const vy = e.nativeEvent.velocity?.y ?? 0
      if (Math.abs(vy) < 0.05) {
        commitAtOffset(e.nativeEvent.contentOffset.y)
      }
    },
    [commitAtOffset],
  )

  const handleIncrement = useCallback(() => {
    const next = Math.min(options.length - 1, safeValueIndex + 1)
    if (next === safeValueIndex) return
    scrollRef.current?.scrollTo({ y: next * itemSpacing, animated: true })
    const target = options[next]
    if (target) onChange(target.value)
  }, [onChange, options, safeValueIndex, itemSpacing])

  const handleDecrement = useCallback(() => {
    const next = Math.max(0, safeValueIndex - 1)
    if (next === safeValueIndex) return
    scrollRef.current?.scrollTo({ y: next * itemSpacing, animated: true })
    const target = options[next]
    if (target) onChange(target.value)
  }, [onChange, options, safeValueIndex, itemSpacing])

  const onAccessibilityAction = useCallback(
    (event: { nativeEvent: { actionName: string } }) => {
      if (event.nativeEvent.actionName === 'increment') handleIncrement()
      else if (event.nativeEvent.actionName === 'decrement') handleDecrement()
    },
    [handleDecrement, handleIncrement],
  )

  const cardChrome =
    variant === 'card'
      ? {
          backgroundColor: '$color2' as const,
          borderColor: '$color5' as const,
          borderWidth: 1,
          borderRadius: '$6' as const,
          overflow: 'hidden' as const,
        }
      : {}

  return (
    <YStack
      width={width as number | string}
      opacity={disabled ? 0.4 : 1}
      pointerEvents={disabled ? 'none' : 'auto'}
      {...cardChrome}
    >
      {/* ── Large value display (identical to RulerScrubber) ─────────── */}
      {showValue ? (
        <XStack
          alignItems="baseline"
          justifyContent="center"
          gap="$2"
          paddingTop="$4"
          paddingBottom="$2"
        >
          <SizableText fontSize={40} fontWeight="700" color="$color12" lineHeight={44}>
            {currentLabel}
          </SizableText>
          {unitLabel ? (
            <SizableText size="$5" fontWeight="500" color="$color11">
              {unitLabel}
            </SizableText>
          ) : null}
        </XStack>
      ) : null}

      {/* ── Ruler area ────────────────────────────────────────────────── */}
      <View
        height={rulerHeight}
        position="relative"
        overflow="hidden"
        accessibilityRole="adjustable"
        accessibilityValue={{ text: currentLabel }}
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={onAccessibilityAction}
      >
        <AnimatedScrollView
          ref={scrollRef as any}
          onScroll={scrollHandler}
          onMomentumScrollEnd={handleMomentumEnd}
          onScrollEndDrag={handleScrollEndDrag}
          scrollEventThrottle={16}
          snapToInterval={itemSpacing}
          snapToAlignment="start"
          decelerationRate="fast"
          bounces={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          scrollEnabled={!disabled}
          contentContainerStyle={{
            paddingTop: paddingEdge,
            paddingBottom: paddingEdge,
          }}
        >
          {options.map((opt, i) => (
            <Tick
              key={String(opt.value)}
              index={i}
              label={opt.label}
              isLabeled={i % labelEvery === 0}
              itemSpacing={itemSpacing}
              scrollY={scrollY}
              accent={accentHex}
              reducedMotion={reducedMotion ?? false}
            />
          ))}
        </AnimatedScrollView>

        {/* Edge fades — ticks dissolve toward top/bottom edges, same as
            RulerScrubber's LinearGradient edge fade. */}
        <LinearGradient
          pointerEvents="none"
          position="absolute"
          top={0}
          left={0}
          right={0}
          height={rulerHeight * 0.38}
          colors={[fadeColor, 'transparent']}
          start={[0, 0]}
          end={[0, 1]}
        />
        <LinearGradient
          pointerEvents="none"
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          height={rulerHeight * 0.38}
          colors={['transparent', fadeColor]}
          start={[0, 0]}
          end={[0, 1]}
        />

        {/* Center needle — a short, centered horizontal accent pill (the exact
            vertical mirror of RulerScrubber's centered vertical indicator pill).
            NOT a full-bleed line: the transparent full-width wrapper only
            centers the pill, which spans just past the long ticks so the
            selected tick visibly rests on it. */}
        <View
          pointerEvents="none"
          position="absolute"
          left={0}
          right={0}
          top={rulerHeight / 2 - 2}
          height={4}
          alignItems="center"
          justifyContent="center"
        >
          <View
            width={LONG_TICK_W + 8}
            height={4}
            borderRadius={2}
            backgroundColor={accent}
          />
        </View>
      </View>

      {/* Unit label in non-showValue mode */}
      {unitLabel && !showValue ? (
        <SizableText
          size="$4"
          fontWeight="600"
          color="$color11"
          textAlign="center"
          paddingVertical="$2"
        >
          {unitLabel}
        </SizableText>
      ) : null}

      {showValue ? <View height={8} /> : null}
    </YStack>
  )
}
