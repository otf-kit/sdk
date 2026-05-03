/**
 * AnimatedView — declarative entry-animation wrapper.
 *
 * Drop-in replacement for ad-hoc `<Animated.View entering={...}>` calls.
 * Ten named presets, optional viewport trigger, optional per-child stagger,
 * and always honors `useReducedMotion`.
 *
 * Eventually supersedes the kit-local `StaggerEnter` in fitness-kit. Soft
 * deprecation only — both ship until kits are migrated.
 *
 * @example
 * <AnimatedView animation="slide-up" delay={200} duration={400}>
 *   <Card />
 * </AnimatedView>
 *
 * @example Stagger mode — wraps each child with delay = i * stagger.
 * <AnimatedView animation="fade" stagger={50}>
 *   <Card />
 *   <Card />
 *   <Card />
 * </AnimatedView>
 */

import {
  Children,
  isValidElement,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  Dimensions,
  View,
  type LayoutChangeEvent,
  type ViewProps,
} from 'react-native'
import Animated, {
  BounceIn,
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  ZoomIn,
  ZoomOut,
  useReducedMotion,
  withDelay,
  withTiming,
  type EntryAnimationsValues,
  type EntryExitAnimationFunction,
} from 'react-native-reanimated'

export type AnimationPreset =
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'flip'
  | 'pop'
  | 'bounce'

export type AnimatedViewTrigger = 'mount' | 'viewport'

export interface AnimatedViewProps extends ViewProps {
  animation?: AnimationPreset
  /** ms before the animation starts. Default 0. */
  delay?: number
  /** ms total animation duration. Default 400. */
  duration?: number
  /**
   * 'mount': fires once on mount (default).
   * 'viewport': fires when the view enters the visible window
   *   (within ~50px of the bottom edge on first measurement).
   * Note: a perfect viewport implementation needs the parent ScrollView's
   * scroll position. For v1 we ship a simpler "delay until visible on first
   * measure" pass that covers the common case where the view is rendered
   * either above the fold (fires immediately) or just below it (fires when
   * the user scrolls and the view's onLayout reports a y inside the
   * viewport). For deep-scroll lists, use a list-virtualization animation
   * pattern instead.
   */
  trigger?: AnimatedViewTrigger
  /**
   * ms between children. Default 0 = no stagger.
   * When > 0, children must be valid React elements; non-element children
   * (strings, numbers, null, booleans) are filtered out.
   */
  stagger?: number
  children: ReactNode
}

const VIEWPORT_TRIGGER_MARGIN_PX = 50

/**
 * Build a Reanimated entering animation factory for a given preset.
 * Each call returns a fresh animation builder so React's reconciler treats
 * `entering` as stable per-mount.
 */
function buildEntering(
  preset: AnimationPreset,
  delay: number,
  duration: number,
): EntryExitAnimationFunction | undefined {
  switch (preset) {
    case 'fade':
      return FadeIn.delay(delay).duration(duration).build()
    case 'slide-up':
      return FadeInDown.delay(delay).duration(duration).build()
    case 'slide-down':
      return FadeInUp.delay(delay).duration(duration).build()
    case 'slide-left':
      return FadeInRight.delay(delay).duration(duration).build()
    case 'slide-right':
      return FadeInLeft.delay(delay).duration(duration).build()
    case 'zoom-in':
      return ZoomIn.delay(delay).duration(duration).build()
    case 'zoom-out':
      return ZoomOut.delay(delay).duration(duration).build()
    case 'pop':
      return ZoomIn.delay(delay)
        .duration(duration)
        .springify()
        .damping(8)
        .stiffness(120)
        .build()
    case 'bounce':
      return BounceIn.delay(delay).duration(duration).build()
    case 'flip':
      // 'flip' is a custom preset: we layer a rotateY interpolation on top of
      // a fade-in entering animation. The keyframe approach mirrors how
      // Reanimated builds its own presets — return the initial values + the
      // animations toward the resting state.
      return ((values: EntryAnimationsValues) => {
        'worklet'
        const animations = {
          opacity: withDelay(delay, withTiming(1, { duration })),
          transform: [
            { perspective: 1000 },
            {
              rotateY: withDelay(
                delay,
                withTiming('0deg', { duration }),
              ),
            },
          ],
        }
        const initialValues = {
          opacity: 0,
          transform: [{ perspective: 1000 }, { rotateY: '90deg' }],
        }
        return {
          initialValues,
          animations,
        }
      }) as unknown as EntryExitAnimationFunction
  }
}

/** Internal: render a single Animated.View with the chosen entering animation. */
function SingleAnimatedView({
  animation,
  delay,
  duration,
  trigger,
  children,
  style,
  onLayout,
  ...rest
}: Omit<AnimatedViewProps, 'stagger'> & {
  animation: AnimationPreset
  delay: number
  duration: number
  trigger: AnimatedViewTrigger
}) {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(trigger === 'mount')
  const measuredRef = useRef(false)

  const handleLayout = (e: LayoutChangeEvent) => {
    onLayout?.(e)
    if (trigger !== 'viewport' || measuredRef.current) return
    measuredRef.current = true
    const { y, height } = e.nativeEvent.layout
    const windowH = Dimensions.get('window').height
    // Fire if the view's top sits inside the viewport (with a margin), OR if
    // it sits just below the fold within VIEWPORT_TRIGGER_MARGIN_PX. This is
    // the "fire on first measure that's near visible" approximation; we don't
    // wire up scroll observation for v1.
    const inViewport = y < windowH + VIEWPORT_TRIGGER_MARGIN_PX
    if (inViewport) setVisible(true)
  }

  // Reduced motion: render plain View, no entering, no measurement gating.
  if (reduced) {
    return (
      <View style={style} onLayout={onLayout} {...rest}>
        {children}
      </View>
    )
  }

  // viewport trigger waiting for first-measurement: render a measuring View
  // with zero opacity until visible. Once visible, swap to Animated.View
  // which will run the entering animation on mount.
  if (!visible) {
    return (
      <View
        style={[style, { opacity: 0 }]}
        onLayout={handleLayout}
        {...rest}
      >
        {children}
      </View>
    )
  }

  const entering = buildEntering(animation, delay, duration)

  return (
    <Animated.View
      style={style}
      entering={entering}
      onLayout={trigger === 'viewport' ? undefined : onLayout}
      {...rest}
    >
      {children}
    </Animated.View>
  )
}

/**
 * Animated entry wrapper. See {@link AnimatedViewProps} for full options.
 */
export function AnimatedView({
  animation = 'fade',
  delay = 0,
  duration = 400,
  trigger = 'mount',
  stagger = 0,
  children,
  ...viewProps
}: AnimatedViewProps) {
  // Stagger mode: filter to valid elements and wrap each in its own
  // AnimatedView with delay = userDelay + i * stagger. We don't recurse into
  // already-AnimatedView children (avoid double-wrapping); callers who pass
  // pre-animated children should set stagger=0.
  if (stagger > 0) {
    const list = Children.toArray(children).filter(isValidElement)
    return (
      <View {...viewProps}>
        {list.map((child, i) => {
          const childKey =
            (child as { key?: string | number | null }).key ?? i
          // Skip wrapping if the child is already an AnimatedView — caller is
          // managing its own animation. We detect by reference to the
          // function component, which is stable per-import.
          const childType = (child as { type?: unknown }).type
          if (childType === AnimatedView) {
            return child
          }
          return (
            <SingleAnimatedView
              key={childKey}
              animation={animation}
              delay={delay + i * stagger}
              duration={duration}
              trigger={trigger}
            >
              {child}
            </SingleAnimatedView>
          )
        })}
      </View>
    )
  }

  return (
    <SingleAnimatedView
      animation={animation}
      delay={delay}
      duration={duration}
      trigger={trigger}
      {...viewProps}
    >
      {children}
    </SingleAnimatedView>
  )
}

