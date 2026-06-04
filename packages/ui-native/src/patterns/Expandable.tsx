/**
 * Expandable — single-row disclosure primitive.
 *
 * A collapsible row meant to live inside lists (FAQ, settings, exercise
 * detail panels, etc.). The parent decides composition; this primitive
 * owns header layout, chevron rotation, and smooth height/opacity reveal
 * of the body.
 *
 * Distinct from `OtfAccordion` (which is a *list-of-items* container that
 * manages its own open/closed map). `Expandable` renders a single row and
 * exposes controlled + uncontrolled state so the parent can compose
 * single-open, multi-open, or independent rows however it likes.
 *
 * Motion: Reanimated 4 (`useSharedValue` + `useAnimatedStyle` + `withTiming`).
 * Honors `useReducedMotion()` by snapping height/opacity/rotation to target.
 *
 * @example
 *   <Expandable
 *     icon={<ChevronRight />}
 *     title="Why is my goal lower than yesterday?"
 *     subtitle="Tap to learn more"
 *     defaultExpanded
 *     duration={250}
 *     variant="card"
 *   >
 *     <Text>...body content...</Text>
 *   </Expandable>
 */

import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { LayoutChangeEvent } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { SizableText, View, XStack, YStack } from 'tamagui'
import { ChevronDown } from '@tamagui/lucide-icons'

export type ExpandableProps = {
  /** Header title — string is rendered with default styles, ReactNode bypasses them. */
  title: string | ReactNode
  /** Small text shown under the title when collapsed (and when expanded). */
  subtitle?: string
  /** Leading icon rendered to the left of the title block. */
  icon?: ReactNode
  /** Uncontrolled initial open state. Ignored when `expanded` is provided. */
  defaultExpanded?: boolean
  /** Controlled open state. When provided, parent owns the value. */
  expanded?: boolean
  /** Fired with the next open state on every header tap. */
  onToggle?: (next: boolean) => void
  /** Body content shown when expanded. */
  children: ReactNode
  /** Tween duration in ms for the height/rotation animation. Default 250. */
  duration?: number
  /** Visual chrome. `'plain'` = header + body only. `'card'` = bordered + rounded + padded. */
  variant?: 'plain' | 'card'
  /** Disable the press handler and dim the row. */
  disabled?: boolean
}

const EASE = Easing.bezier(0.65, 0, 0.35, 1) // easeInOutCubic

export function Expandable({
  title,
  subtitle,
  icon,
  defaultExpanded = false,
  expanded: expandedProp,
  onToggle,
  children,
  duration = 250,
  variant = 'plain',
  disabled = false,
}: ExpandableProps) {
  const isControlled = expandedProp !== undefined
  const [internalExpanded, setInternalExpanded] = useState<boolean>(defaultExpanded)
  const expanded = isControlled ? (expandedProp as boolean) : internalExpanded

  const reducedMotion = useReducedMotion()

  // Measured natural height of the body, captured once via a hidden onLayout pass.
  const measuredHeight = useRef<number>(0)
  const [didMeasure, setDidMeasure] = useState<boolean>(false)

  const heightSv = useSharedValue<number>(defaultExpanded ? 0 : 0) // becomes target on first toggle/measure
  const opacitySv = useSharedValue<number>(defaultExpanded ? 1 : 0)
  const rotationSv = useSharedValue<number>(defaultExpanded ? 180 : 0)

  // Drive shared values whenever `expanded` flips.
  useEffect(() => {
    const targetHeight = expanded ? measuredHeight.current : 0
    const targetOpacity = expanded ? 1 : 0
    const targetRotation = expanded ? 180 : 0
    if (reducedMotion) {
      heightSv.value = targetHeight
      opacitySv.value = targetOpacity
      rotationSv.value = targetRotation
      return
    }
    // Opacity collapses faster than height so content fades before the row closes.
    const opacityDuration = expanded ? duration : Math.max(80, Math.round(duration * 0.5))
    heightSv.value = withTiming(targetHeight, { duration, easing: EASE })
    opacitySv.value = withTiming(targetOpacity, { duration: opacityDuration, easing: EASE })
    rotationSv.value = withTiming(targetRotation, { duration, easing: EASE })
  }, [expanded, duration, reducedMotion, heightSv, opacitySv, rotationSv])

  const bodyStyle = useAnimatedStyle(() => {
    'worklet'
    return {
      height: heightSv.value,
      opacity: opacitySv.value,
      overflow: 'hidden',
    }
  }, [heightSv, opacitySv])

  const chevronStyle = useAnimatedStyle(() => {
    'worklet'
    return { transform: [{ rotate: `${rotationSv.value}deg` }] }
  }, [rotationSv])

  const handleMeasure = useCallback(
    (e: LayoutChangeEvent) => {
      const next = e.nativeEvent.layout.height
      if (next > 0 && next !== measuredHeight.current) {
        measuredHeight.current = next
        if (!didMeasure) {
          setDidMeasure(true)
          // If mounted expanded, snap immediately — no tween, no flash.
          if (expanded) {
            heightSv.value = next
            opacitySv.value = 1
          }
        } else if (expanded) {
          // Body grew while open (e.g. dynamic children) — animate to new height.
          heightSv.value = reducedMotion
            ? next
            : withTiming(next, { duration, easing: EASE })
        }
      }
    },
    [didMeasure, duration, expanded, heightSv, opacitySv, reducedMotion],
  )

  const handlePress = useCallback(() => {
    if (disabled) return
    const next = !expanded
    if (!isControlled) setInternalExpanded(next)
    onToggle?.(next)
  }, [disabled, expanded, isControlled, onToggle])

  const containerProps = useMemo(
    () =>
      variant === 'card'
        ? {
            borderWidth: 1,
            borderColor: '$color5' as const,
            borderRadius: '$4' as const,
            padding: '$3' as const,
            backgroundColor: '$background' as const,
          }
        : {},
    [variant],
  )

  const titleNode =
    typeof title === 'string' ? (
      <SizableText size="$4" fontWeight="600" color="$color12">
        {title}
      </SizableText>
    ) : (
      title
    )

  return (
    <YStack {...containerProps} opacity={disabled ? 0.5 : 1}>
      <XStack
        accessibilityRole="button"
        accessibilityState={{ expanded, disabled }}
        accessibilityHint="Tap to expand/collapse"
        onPress={handlePress}
        disabled={disabled}
        cursor={disabled ? 'default' : 'pointer'}
        pressStyle={disabled ? undefined : { opacity: 0.85 }}
        alignItems="center"
        gap="$3"
        paddingVertical="$3"
        minHeight={44}
      >
        {icon ? (
          <View width={24} height={24} alignItems="center" justifyContent="center">
            {icon}
          </View>
        ) : null}
        <YStack flex={1} gap="$1">
          {titleNode}
          {subtitle ? (
            <SizableText size="$2" color="$color11">
              {subtitle}
            </SizableText>
          ) : null}
        </YStack>
        <Animated.View style={chevronStyle}>
          <ChevronDown size={20} color="$color10" />
        </Animated.View>
      </XStack>

      {/*
       * Ghost measurement view — absolutely positioned so it escapes the
       * Animated.View's `height: 0` constraint.
       *
       * On React Native native (iOS/Android), Yoga constrains children to the
       * parent's fixed height, so a View nested inside Animated.View with
       * height:0 reports onLayout.height=0. That meant measuredHeight.current
       * was always 0 → animation target was always 0 → nothing expanded.
       *
       * On web (CSS), overflow:hidden doesn't constrain layout, so onLayout
       * fired correctly — explaining why the component worked on web but not
       * on device/simulator.
       *
       * Fix: render the children once in an absolutely positioned ghost (opacity
       * 0, pointerEvents none) to capture the true natural height. Once measured
       * (didMeasure=true) the ghost is removed and children move into the
       * animated container.
       */}
      {!didMeasure && (
        <View
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: '100%' }}
          onLayout={handleMeasure}
        >
          <View style={{ paddingTop: 4, paddingBottom: 12 }}>
            {children}
          </View>
        </View>
      )}

      {/* Animated body — height driven by the ghost measurement above. */}
      <Animated.View style={bodyStyle} pointerEvents={expanded ? 'auto' : 'none'}>
        {didMeasure ? (
          <View style={{ paddingTop: 4, paddingBottom: 12 }}>
            {children}
          </View>
        ) : null}
      </Animated.View>
    </YStack>
  )
}
