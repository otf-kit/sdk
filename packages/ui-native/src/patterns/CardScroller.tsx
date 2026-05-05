/**
 * CardScroller — horizontal snap-to-card scroller with auto-center on mount.
 *
 * Premium horizontal scroller for plans, programs, friend cards, recipe rows.
 * Each card snaps to either the viewport center (`snap='center'`, default) or
 * the leading edge (`snap='start'`). With center snap on, off-screen cards
 * gently scale + dim so the focused card pops without losing peripheral
 * context. Auto-scrolls to `initialIndex` on mount (defaults to the middle).
 *
 * Implementation: `Animated.FlatList` (horizontal) with `snapToInterval` +
 * shared scroll-X driving per-item `useAnimatedStyle`. For `snap='center'`
 * the outer `paddingHorizontal` is recomputed as `(viewport - itemWidth) / 2`
 * so the first/last cards CAN reach the center.
 *
 * Honors `useReducedMotion()` — when on, renders a flat snap-scroll list with
 * snap behavior preserved but no per-item scale/opacity interpolation. A11y
 * exposes `adjustable` role + an `accessibilityValue.text` describing the
 * current index.
 *
 * @example
 * <CardScroller
 *   data={workoutTypes}
 *   keyExtractor={(t) => t.id}
 *   itemWidth={240}
 *   gap={12}
 *   renderItem={(t) => <WorkoutTypeCard type={t} />}
 *   onIndexChange={(i) => setActive(i)}
 * />
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type JSX,
  type ReactNode,
} from 'react'
import {
  Dimensions,
  FlatList,
  type FlatListProps,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native'
import { View, YStack } from 'tamagui'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated'

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList,
) as unknown as <ItemT>(
  props: FlatListProps<ItemT> & { ref?: React.Ref<FlatList<ItemT>> },
) => JSX.Element

export interface CardScrollerProps<T> {
  /** Source data. */
  data: readonly T[]
  /** Render one card. */
  renderItem: (item: T, index: number) => ReactNode
  /** Stable key per item. */
  keyExtractor: (item: T, index: number) => string
  /**
   * Width of each card. Number = px, string `'70%'` = percent of viewport
   * width (measured via `Dimensions.get('window')`). Default `280`.
   */
  itemWidth?: number | `${number}%`
  /** Gap (px) between cards. Default `12`. */
  gap?: number
  /**
   * Index to center on mount. Default `Math.floor(data.length / 2)`.
   * Auto-scrolls there (non-animated) once after layout.
   */
  initialIndex?: number
  /**
   * Outer horizontal padding around the scroller. For `snap='center'` this is
   * recomputed as `(viewport - itemWidth) / 2` so first/last cards can reach
   * the center — the user-provided value is ignored in that mode. Default `16`.
   */
  paddingHorizontal?: number
  /**
   * Snap behavior. `'center'` snaps each card to viewport center; `'start'`
   * snaps to the leading edge. Default `'center'`.
   */
  snap?: 'center' | 'start'
  /**
   * Per-card scale + opacity falloff for off-center cards. Only takes effect
   * when `snap === 'center'`. Default `true` for center snap, `false` for
   * start snap. Set `false` for plain image carousels.
   */
  fadeOff?: boolean
  /** Fires after settle on a new snapped index. */
  onIndexChange?: (index: number) => void
  /** Optional VoiceOver/TalkBack label for the scroller container. */
  accessibilityLabel?: string
}

interface RowProps {
  width: number
  gap: number
  index: number
  scrollX: SharedValue<number>
  enabled: boolean
  paddingStart: number
  children: ReactNode
}

/**
 * One card row. Reads the shared scroll offset and interpolates scale +
 * opacity based on absolute distance (in card-units) from the visual center.
 * When `enabled` is false (reduced-motion or fadeOff disabled), renders the
 * card with no transform.
 */
function CardRow({
  width,
  gap,
  index,
  scrollX,
  enabled,
  paddingStart,
  children,
}: RowProps): JSX.Element {
  const stride = width + gap
  const animatedStyle = useAnimatedStyle(() => {
    if (!enabled) {
      return { opacity: 1, transform: [{ scale: 1 }] }
    }
    // Distance (in card-units) from this card's center to the viewport center.
    const cardCenter = paddingStart + index * stride + width / 2
    const viewportCenter = scrollX.value + paddingStart + width / 2
    const distance = Math.abs(cardCenter - viewportCenter) / stride
    const scale = interpolate(
      distance,
      [0, 1, 2],
      [1, 0.92, 0.85],
      Extrapolation.CLAMP,
    )
    const opacity = interpolate(
      distance,
      [0, 1, 2],
      [1, 0.85, 0.65],
      Extrapolation.CLAMP,
    )
    return { opacity, transform: [{ scale }] }
  }, [stride, width, paddingStart, index, enabled])

  return (
    <Animated.View
      style={[
        {
          width,
          marginRight: gap,
        },
        animatedStyle,
      ]}
    >
      {children}
    </Animated.View>
  )
}

/**
 * CardScroller — generic horizontal snap-scroller.
 *
 * `T` is the data row type so callers get type-safe `renderItem` +
 * `keyExtractor`.
 */
export function CardScroller<T>(props: CardScrollerProps<T>): JSX.Element {
  const {
    data,
    renderItem,
    keyExtractor,
    itemWidth = 280,
    gap = 12,
    initialIndex,
    paddingHorizontal = 16,
    snap = 'center',
    fadeOff,
    onIndexChange,
    accessibilityLabel,
  } = props

  const reducedMotion = useReducedMotion()
  const flatListRef = useRef<FlatList<T>>(null)
  const scrollX = useSharedValue(0)
  const lastReportedIndex = useRef<number>(-1)

  // Resolve viewport width once at mount; small data arrays (single card)
  // tolerate this fine — no resize listener needed for the static snap math.
  const [viewportWidth] = useState(() => Dimensions.get('window').width)

  const resolvedItemWidth = useMemo(() => {
    if (typeof itemWidth === 'number') return itemWidth
    const pctMatch = /^(\d+(?:\.\d+)?)%$/.exec(itemWidth)
    if (!pctMatch) return 280
    const pct = parseFloat(pctMatch[1] ?? '0')
    return Math.max(0, Math.round((viewportWidth * pct) / 100))
  }, [itemWidth, viewportWidth])

  const isCenterSnap = snap === 'center'
  const fadeEnabled =
    isCenterSnap && (fadeOff ?? true) && !reducedMotion && data.length > 1

  // For center snap, override paddingHorizontal so first/last cards CAN reach
  // the viewport center. For start snap, honor the user-provided value.
  const resolvedPadding = isCenterSnap
    ? Math.max(0, Math.round((viewportWidth - resolvedItemWidth) / 2))
    : paddingHorizontal

  // Stride between successive card snap points.
  const stride = resolvedItemWidth + gap

  const safeInitialIndex = useMemo(() => {
    if (data.length === 0) return 0
    const fallback = Math.floor(data.length / 2)
    const desired = initialIndex ?? fallback
    return Math.max(0, Math.min(data.length - 1, desired))
  }, [data.length, initialIndex])

  // Auto-scroll to initialIndex after first layout. Only meaningful with >1
  // cards; for a single card the list naturally sits at offset 0.
  useEffect(() => {
    if (data.length <= 1) return
    if (safeInitialIndex <= 0) return
    const t = setTimeout(() => {
      flatListRef.current?.scrollToOffset({
        offset: safeInitialIndex * stride,
        animated: false,
      })
    }, 0)
    return () => clearTimeout(t)
    // Only on mount + when the resolved index/stride changes (data swap).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeInitialIndex, stride])

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x
    },
  })

  const handleMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = e.nativeEvent.contentOffset.x
      const index = Math.round(offsetX / stride)
      const clamped = Math.max(0, Math.min(data.length - 1, index))
      if (clamped === lastReportedIndex.current) return
      lastReportedIndex.current = clamped
      if (onIndexChange) onIndexChange(clamped)
    },
    [data.length, onIndexChange, stride],
  )

  const getItemLayout = useCallback(
    (_: ArrayLike<T> | null | undefined, index: number) => ({
      length: stride,
      offset: stride * index,
      index,
    }),
    [stride],
  )

  const renderRow = useCallback(
    ({ item, index }: { item: T; index: number }) => (
      <CardRow
        width={resolvedItemWidth}
        gap={gap}
        index={index}
        scrollX={scrollX}
        enabled={fadeEnabled}
        paddingStart={resolvedPadding}
      >
        {renderItem(item, index)}
      </CardRow>
    ),
    [
      fadeEnabled,
      gap,
      renderItem,
      resolvedItemWidth,
      resolvedPadding,
      scrollX,
    ],
  )

  // The visible label tracks the LAST snapped index for assistive tech. Local
  // state mirrors the ref so VoiceOver re-reads on change.
  const [activeIndex, setActiveIndex] = useState(safeInitialIndex)
  const handleSettleForA11y = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = e.nativeEvent.contentOffset.x
      const index = Math.round(offsetX / stride)
      const clamped = Math.max(0, Math.min(data.length - 1, index))
      setActiveIndex(clamped)
      handleMomentumEnd(e)
    },
    [data.length, handleMomentumEnd, stride],
  )

  const a11yText =
    data.length > 0
      ? `Card ${activeIndex + 1} of ${data.length}`
      : 'No cards'

  return (
    <YStack
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ text: a11yText }}
    >
      <AnimatedFlatList<T>
        ref={flatListRef}
        data={data as T[]}
        keyExtractor={keyExtractor}
        renderItem={renderRow}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={stride}
        snapToAlignment={isCenterSnap ? 'center' : 'start'}
        decelerationRate="fast"
        getItemLayout={getItemLayout}
        onScroll={scrollHandler}
        onMomentumScrollEnd={handleSettleForA11y}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingLeft: resolvedPadding,
          // Right padding mirrors left so the last card can settle without
          // jamming against the viewport edge. The trailing per-card
          // marginRight (gap) is removed visually via the padding accounting.
          paddingRight: Math.max(0, resolvedPadding - gap),
        }}
        // Single-card lists don't need snap math; let the user inspect.
        scrollEnabled={data.length > 1}
      />
      {/* Sentinel so RTL layouts don't shrink the container vertically when
          data is empty. */}
      {data.length === 0 ? <View height={1} /> : null}
    </YStack>
  )
}
