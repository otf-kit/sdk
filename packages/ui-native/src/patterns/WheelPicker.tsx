/**
 * WheelPicker — vertical scroll-wheel picker.
 *
 * Premium iOS-flavored single-value picker for height / weight / any
 * enumerable scalar. Centered item is the selection; ±1 items dim & shrink,
 * ±2 items dim further. Snap-on-release with a haptic tick on iOS.
 *
 * Implementation: `Animated.FlatList` with `snapToInterval` + custom per-item
 * transforms via `useAnimatedStyle` reading a shared scroll-offset.
 *
 * Honors `useReducedMotion()` — when on, renders a flat snap-scroll list
 * without per-item interpolation. A11y exposes adjustable role +
 * increment/decrement actions for VoiceOver.
 *
 * Clean-room implementation. API derived from mobile flow primitives PRD section 9
 * + reference patterns brief section 4. No code lifted from sibling templates.
 *
 * @example
 * <WheelPicker
 *   options={Array.from({ length: 121 }, (_, i) => ({ value: 140 + i, label: String(140 + i) }))}
 *   value={height}
 *   onChange={setHeight}
 *   unitLabel="cm"
 *   variant="card"
 * />
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type JSX,
} from 'react'
import {
  FlatList,
  Platform,
  type FlatListProps,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native'
import { SizableText, View, XStack, YStack } from 'tamagui'
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
  useReducedMotion,
  type SharedValue,
} from 'react-native-reanimated'

// expo-haptics is wrapped — gracefully no-op on web / older Android targets
// where the native module isn't present. Local minimal type avoids needing
// expo-haptics declared as a build-time dep of this package; consuming kits
// install it themselves per the 2026-05-03 mobile primitives ADR.
type HapticsModule = { selectionAsync: () => Promise<void> }
let Haptics: HapticsModule | null = null
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  Haptics = require('expo-haptics') as HapticsModule
} catch {
  Haptics = null
}

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList,
) as unknown as <ItemT>(
  props: FlatListProps<ItemT> & { ref?: React.Ref<FlatList<ItemT>> },
) => JSX.Element

export interface WheelPickerOption<T extends string | number> {
  value: T
  label: string
}

export interface WheelPickerProps<T extends string | number> {
  options: WheelPickerOption<T>[]
  value: T
  onChange: (v: T) => void
  /** Per-item row height in px. Default 44. */
  itemHeight?: number
  /** Number of items visible at once. MUST be odd. Default 5. */
  visibleItems?: number
  /** Static unit label rendered to the right of the centered value (e.g. 'cm'). */
  unitLabel?: string
  /** Fire `Haptics.selectionAsync()` on iOS at each snapped index. Default true. */
  haptic?: boolean
  /** Visual chrome. `plain` = no background, `card` = bordered + rounded surface. Default `plain`. */
  variant?: 'plain' | 'card'
  /** Color of the centered indicator hairlines. Default `$color12`. */
  accent?: string
  /** Width of the picker container. Default `'100%'`. */
  width?: number | string
  disabled?: boolean
}

type PadItem<T extends string | number> =
  | { kind: 'pad'; key: string }
  | { kind: 'item'; key: string; option: WheelPickerOption<T>; index: number }

interface RowProps<T extends string | number> {
  item: PadItem<T>
  itemHeight: number
  scrollY: SharedValue<number>
  reducedMotion: boolean
}

/**
 * One wheel row. Reads the shared scroll offset and interpolates opacity +
 * scale based on absolute distance (in items) from the current center.
 */
function WheelRow<T extends string | number>({
  item,
  itemHeight,
  scrollY,
  reducedMotion,
}: RowProps<T>): JSX.Element {
  const animatedStyle = useAnimatedStyle(() => {
    if (item.kind === 'pad' || reducedMotion) {
      return { opacity: 1, transform: [{ scale: 1 }] }
    }
    const center = scrollY.value / itemHeight
    const distance = Math.abs(item.index - center)
    const opacity = interpolate(
      distance,
      [0, 1, 2],
      [1, 0.5, 0.3],
      Extrapolation.CLAMP,
    )
    const scale = interpolate(
      distance,
      [0, 1, 2],
      [1, 0.85, 0.7],
      Extrapolation.CLAMP,
    )
    return { opacity, transform: [{ scale }] }
  }, [itemHeight, item, reducedMotion])

  if (item.kind === 'pad') {
    return <View height={itemHeight} />
  }

  return (
    <Animated.View
      style={[
        {
          height: itemHeight,
          alignItems: 'center',
          justifyContent: 'center',
        },
        animatedStyle,
      ]}
    >
      <SizableText size="$7" fontWeight="700" color="$color12">
        {item.option.label}
      </SizableText>
    </Animated.View>
  )
}

/**
 * WheelPicker — generic vertical scroll-wheel.
 *
 * `T` is the option value type (`string | number`). Snap-aligned to the
 * center; calls `onChange(options[index].value)` on momentum-scroll-end.
 */
export function WheelPicker<T extends string | number>(
  props: WheelPickerProps<T>,
): JSX.Element {
  const {
    options,
    value,
    onChange,
    itemHeight = 44,
    visibleItems = 5,
    unitLabel,
    haptic = true,
    variant = 'plain',
    accent = '$color12',
    width = '100%',
    disabled = false,
  } = props

  if (visibleItems % 2 === 0) {
    throw new Error('WheelPicker: `visibleItems` must be odd.')
  }

  const reducedMotion = useReducedMotion()
  const flatListRef = useRef<FlatList<PadItem<T>>>(null)
  const scrollY = useSharedValue(0)
  const lastReportedIndex = useRef<number>(-1)

  const padCount = Math.floor(visibleItems / 2)
  const containerHeight = itemHeight * visibleItems

  const data: PadItem<T>[] = useMemo(() => {
    const padTop: PadItem<T>[] = Array.from({ length: padCount }, (_, i) => ({
      kind: 'pad',
      key: `pad-top-${i}`,
    }))
    const real: PadItem<T>[] = options.map((option, i) => ({
      kind: 'item',
      key: `item-${i}-${String(option.value)}`,
      option,
      index: i,
    }))
    const padBottom: PadItem<T>[] = Array.from({ length: padCount }, (_, i) => ({
      kind: 'pad',
      key: `pad-bot-${i}`,
    }))
    return [...padTop, ...real, ...padBottom]
  }, [options, padCount])

  const valueIndex = useMemo(
    () => options.findIndex((o) => o.value === value),
    [options, value],
  )
  const safeValueIndex = valueIndex === -1 ? 0 : valueIndex

  // Initial scroll-to-value after layout.
  useEffect(() => {
    if (safeValueIndex < 0 || options.length === 0) return
    const t = setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: safeValueIndex,
        animated: false,
      })
    }, 0)
    return () => clearTimeout(t)
    // Intentionally only on mount + when the value→index mapping shifts because options changed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeValueIndex, options.length])

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y
    },
  })

  const handleMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = e.nativeEvent.contentOffset.y
      const index = Math.round(offsetY / itemHeight)
      const clamped = Math.max(0, Math.min(options.length - 1, index))
      if (clamped === lastReportedIndex.current) return
      lastReportedIndex.current = clamped
      const next = options[clamped]
      if (!next) return
      if (next.value !== value) {
        if (haptic && Platform.OS === 'ios' && Haptics) {
          Haptics.selectionAsync().catch(() => {
            // Swallow — older devices / web may reject.
          })
        }
        onChange(next.value)
      }
    },
    [haptic, itemHeight, onChange, options, value],
  )

  const getItemLayout = useCallback(
    (_: ArrayLike<PadItem<T>> | null | undefined, index: number) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    }),
    [itemHeight],
  )

  const handleIncrement = useCallback(() => {
    const next = Math.min(options.length - 1, safeValueIndex + 1)
    if (next === safeValueIndex) return
    flatListRef.current?.scrollToIndex({ index: next, animated: true })
    const target = options[next]
    if (target) onChange(target.value)
  }, [onChange, options, safeValueIndex])

  const handleDecrement = useCallback(() => {
    const next = Math.max(0, safeValueIndex - 1)
    if (next === safeValueIndex) return
    flatListRef.current?.scrollToIndex({ index: next, animated: true })
    const target = options[next]
    if (target) onChange(target.value)
  }, [onChange, options, safeValueIndex])

  const onAccessibilityAction = useCallback(
    (event: { nativeEvent: { actionName: string } }) => {
      if (event.nativeEvent.actionName === 'increment') handleIncrement()
      else if (event.nativeEvent.actionName === 'decrement') handleDecrement()
    },
    [handleDecrement, handleIncrement],
  )

  const currentLabel = options[safeValueIndex]?.label ?? ''

  // Track scroll offset in JS for the reduced-motion fallback's onChange.
  const [, setJsScrollY] = useState(0)
  const handleScrollJs = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      setJsScrollY(e.nativeEvent.contentOffset.y)
    },
    [],
  )

  const renderItem = useCallback(
    ({ item }: { item: PadItem<T> }) => (
      <WheelRow
        item={item}
        itemHeight={itemHeight}
        scrollY={scrollY}
        reducedMotion={reducedMotion}
      />
    ),
    [itemHeight, reducedMotion, scrollY],
  )

  const cardChrome =
    variant === 'card'
      ? {
          backgroundColor: '$color2' as const,
          borderColor: '$color5' as const,
          borderWidth: 1,
          borderRadius: '$6' as const,
        }
      : {}

  return (
    <XStack
      width={width as number | string}
      alignItems="center"
      justifyContent="center"
      gap="$2"
      opacity={disabled ? 0.4 : 1}
      pointerEvents={disabled ? 'none' : 'auto'}
      {...cardChrome}
    >
      <YStack
        flex={1}
        height={containerHeight}
        position="relative"
        accessibilityRole="adjustable"
        accessibilityValue={{ text: currentLabel }}
        accessibilityActions={[
          { name: 'increment' },
          { name: 'decrement' },
        ]}
        onAccessibilityAction={onAccessibilityAction}
      >
        <AnimatedFlatList<PadItem<T>>
          ref={flatListRef}
          data={data}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          snapToInterval={itemHeight}
          snapToAlignment="center"
          decelerationRate="fast"
          getItemLayout={getItemLayout}
          onScroll={reducedMotion ? handleScrollJs : scrollHandler}
          onMomentumScrollEnd={handleMomentumEnd}
          scrollEventThrottle={16}
          bounces={false}
          overScrollMode="never"
          scrollEnabled={!disabled}
        />

        {/* Centered selection indicator — two horizontal hairlines. */}
        <View
          pointerEvents="none"
          position="absolute"
          left={0}
          right={0}
          top={containerHeight / 2 - itemHeight / 2}
          height={1}
          backgroundColor={accent}
          opacity={0.6}
        />
        <View
          pointerEvents="none"
          position="absolute"
          left={0}
          right={0}
          top={containerHeight / 2 + itemHeight / 2 - 1}
          height={1}
          backgroundColor={accent}
          opacity={0.6}
        />
      </YStack>

      {unitLabel ? (
        <SizableText
          size="$5"
          fontWeight="600"
          color="$color11"
          paddingRight="$3"
        >
          {unitLabel}
        </SizableText>
      ) : null}
    </XStack>
  )
}
