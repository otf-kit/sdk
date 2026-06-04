/**
 * FloatingActionButton — bottom-anchored action button with two modes.
 *
 * Mode 1 (default): a single-action FAB. Pass `icon`/`label`/`onPress`
 * and you get the original behavior — a circular (or pill, when `label`
 * is set) button anchored to the bottom of the screen.
 *
 * Mode 2 ("expanding"): pass a non-empty `actions` array and the FAB
 * becomes the trigger for a stack of action chips that fan out above it.
 * Tap the FAB to toggle open/closed; tap an action to fire its `onPress`
 * and collapse; tap the backdrop or hardware-back to dismiss. The icon
 * rotates 45deg when open (so a `+` becomes an `×`); when
 * `expandStyle === 'pill'`, the FAB itself morphs from circle to pill
 * with the label visible alongside the rotated icon.
 *
 * Backwards compatible: every existing `<FloatingActionButton ... />`
 * call site (without `actions`) renders identically to the prior
 * implementation.
 *
 * Motion: Reanimated 4. All animation is gated on `useReducedMotion()` —
 * when on, chips appear/disappear instantly with no rotation or morph.
 */

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { BackHandler, Pressable } from 'react-native'
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { SizableText, XStack, YStack } from 'tamagui'

export type FABAction = {
  id: string
  icon: ReactNode
  label: string
  onPress: () => void
  /** Optional accent for the chip's icon circle. Defaults to `$color9`. */
  accent?: string
}

export type FABProps = {
  icon?: ReactNode
  label?: string
  onPress?: () => void
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left'
  size?: 'sm' | 'md' | 'lg'
  /**
   * When provided and non-empty, switches the FAB to its "expanding" mode.
   * Tapping the FAB toggles a fan-out of action chips above it. Tapping
   * an action fires its `onPress` and collapses the menu.
   */
  actions?: FABAction[]
  /**
   * Visual treatment while expanding.
   *  - `'pill'` (default): morphs from circle to icon+label pill on open.
   *  - `'circle'`: stays circular; only the icon rotates 45deg on open.
   * Has no effect when `actions` is empty.
   */
  expandStyle?: 'pill' | 'circle'
  /**
   * Backdrop color shown while open. Pass `'transparent'` to disable the
   * dimming overlay (the backdrop still captures taps to close).
   */
  backdropColor?: string
}

const sizes = { sm: 44, md: 56, lg: 68 }
const positionStyles = {
  'bottom-right': { right: 20 },
  'bottom-center': { left: '50%', marginLeft: -28 },
  'bottom-left': { left: 20 },
}

const TWEEN_MS = 250
const EASE = Easing.bezier(0.33, 1, 0.68, 1) // easeOutCubic

export function FloatingActionButton({
  icon,
  label,
  onPress,
  position = 'bottom-right',
  size = 'md',
  actions,
  expandStyle = 'pill',
  backdropColor = 'rgba(0,0,0,0.4)',
}: FABProps) {
  const dim = sizes[size]
  const hasActions = Array.isArray(actions) && actions.length > 0

  // ---------------------------------------------------------------------
  // Single-action mode (legacy path) — unchanged behavior.
  // ---------------------------------------------------------------------
  if (!hasActions) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label ?? 'Action'}
        style={({ pressed }) => [
          { position: 'absolute', bottom: 32 },
          positionStyles[position] as object,
          { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] },
        ]}
      >
        <XStack
          height={dim}
          minWidth={dim}
          borderRadius={label ? '$6' : '$10'}
          backgroundColor="$color9"
          alignItems="center"
          justifyContent="center"
          gap="$2"
          paddingHorizontal={label ? '$4' : 0}
          shadowColor="$color9"
          shadowOpacity={0.45}
          shadowRadius={14}
          shadowOffset={{ height: 4, width: 0 }}
        >
          {icon ? <YStack alignItems="center" justifyContent="center">{icon}</YStack> : null}
          {label ? (
            <SizableText color="$color1" size="$4" fontWeight="600">
              {label}
            </SizableText>
          ) : null}
        </XStack>
      </Pressable>
    )
  }

  // ---------------------------------------------------------------------
  // Expanding mode.
  // ---------------------------------------------------------------------
  return (
    <ExpandingFab
      icon={icon}
      label={label}
      onPress={onPress}
      position={position}
      dim={dim}
      actions={actions as FABAction[]}
      expandStyle={expandStyle}
      backdropColor={backdropColor}
    />
  )
}

type ExpandingFabProps = {
  icon?: ReactNode
  label?: string
  onPress?: () => void
  position: 'bottom-right' | 'bottom-center' | 'bottom-left'
  dim: number
  actions: FABAction[]
  expandStyle: 'pill' | 'circle'
  backdropColor: string
}

function ExpandingFab({
  icon,
  label,
  onPress,
  position,
  dim,
  actions,
  expandStyle,
  backdropColor,
}: ExpandingFabProps) {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const progress = useSharedValue(0) // 0 = closed, 1 = open

  const isPill = expandStyle === 'pill'
  const morphLabel = label ?? 'Add'
  // Approximate rendered width of the label at size $4 (~16px glyphs). Sizes
  // the open pill so the icon + label read as one centered group — never a
  // dead-centered icon with a label pinned to the far right.
  const labelW = isPill ? Math.round(morphLabel.length * 9) + 14 : 0
  const pillOpenWidth = isPill ? dim + labelW + 16 : dim

  // Drive `progress` from the boolean state. Reduced motion snaps; otherwise
  // tweens with a soft ease-out curve.
  useEffect(() => {
    const target = open ? 1 : 0
    if (reduced) {
      progress.value = target
      return
    }
    progress.value = withTiming(target, { duration: TWEEN_MS, easing: EASE })
  }, [open, reduced, progress])

  // Per-instance hardware-back handling: when open, back closes the menu
  // and stops propagation. When closed, the listener no-ops so global
  // navigation continues to work as expected.
  const openRef = useRef(open)
  useEffect(() => {
    openRef.current = open
  }, [open])
  useEffect(() => {
    const handler = (): boolean => {
      if (openRef.current) {
        setOpen(false)
        return true
      }
      return false
    }
    const sub = BackHandler.addEventListener('hardwareBackPress', handler)
    return () => sub.remove()
  }, [])

  const handleFabPress = useCallback(() => {
    setOpen((prev) => {
      const next = !prev
      // The legacy `onPress` (if provided) still fires on every FAB tap so
      // callers can track expand/collapse. It's intentionally a no-op-friendly
      // hook — purely additive.
      onPress?.()
      return next
    })
  }, [onPress])

  const handleBackdropPress = useCallback(() => {
    setOpen(false)
  }, [])

  const handleActionPress = useCallback((action: FABAction) => {
    action.onPress()
    setOpen(false)
  }, [])

  // FAB icon rotates 45deg when open. Reduced motion: skip the rotation.
  const iconStyle = useAnimatedStyle(() => {
    'worklet'
    return {
      transform: [
        { rotate: reduced ? '0deg' : `${progress.value * 45}deg` },
      ],
    }
  }, [reduced, progress])

  // Pill-style morph: width interpolates from `dim` (circle) to `pillOpenWidth`.
  // Circle-style: width stays at `dim`. (Reduced motion still widens — progress
  // snaps to its target instantly, so the label has room and never overflows.)
  const fabContainerStyle = useAnimatedStyle(() => {
    'worklet'
    if (!isPill) {
      return { width: dim }
    }
    const width = dim + (pillOpenWidth - dim) * progress.value
    return { width }
  }, [isPill, dim, pillOpenWidth, progress])

  // The label lives in a centered row beside the icon; its container width
  // grows 0 → labelW alongside the opacity so the icon + label stay a single
  // centered group at every point of the morph.
  const labelWrapStyle = useAnimatedStyle(() => {
    'worklet'
    return {
      width: labelW * progress.value,
      opacity: progress.value,
    }
  }, [labelW, progress])

  // Backdrop opacity tracks `progress`. We render unconditionally while
  // open; the press surface stays mounted for the duration of the close
  // tween so taps during the tween still close cleanly.
  const backdropStyle = useAnimatedStyle(() => {
    'worklet'
    return { opacity: progress.value }
  }, [progress])

  // We can't read `progress.value` outside a worklet for render-gating, so we
  // mount the backdrop whenever `open` is true and let `FadeOut` carry it
  // out. Reduced-motion users get an instant unmount via the conditional.
  const renderBackdrop = open

  return (
    <>
      {renderBackdrop ? (
        <Animated.View
          accessibilityRole="button"
          accessibilityLabel="Close menu"
          entering={reduced ? undefined : FadeIn.duration(TWEEN_MS)}
          exiting={reduced ? undefined : FadeOut.duration(TWEEN_MS)}
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor:
                backdropColor === 'transparent' ? 'transparent' : backdropColor,
            },
            backdropStyle,
          ]}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={handleBackdropPress}
            accessibilityLabel="Close menu"
            accessibilityRole="button"
          />
        </Animated.View>
      ) : null}

      {/* Action chips — fan out vertically above the FAB. */}
      {open ? (
        <YStack
          position="absolute"
          bottom={32 + dim + 16}
          {...(positionStyles[position] as any)}
          gap={12}
          alignItems="flex-end"
        >
          {actions.map((action, i) => (
            <Animated.View
              key={action.id}
              entering={
                reduced
                  ? undefined
                  : FadeInDown.delay(i * 50).duration(220).springify().damping(18)
              }
              exiting={
                reduced
                  ? undefined
                  : FadeOutDown.delay((actions.length - 1 - i) * 30).duration(150)
              }
            >
              <Pressable
                onPress={() => handleActionPress(action)}
                accessibilityRole="button"
                accessibilityLabel={action.label}
                style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] })}
              >
                <XStack gap={12} alignItems="center">
                  <XStack
                    paddingHorizontal={14}
                    paddingVertical={9}
                    borderRadius={999}
                    backgroundColor="$color4"
                    borderWidth={1}
                    borderColor="$color6"
                    elevation={3}
                    shadowColor="rgba(0,0,0,0.3)"
                    shadowRadius={8}
                    shadowOffset={{ width: 0, height: 4 }}
                  >
                    <SizableText size="$3" fontWeight="600" color="$color12">
                      {action.label}
                    </SizableText>
                  </XStack>
                  <XStack
                    width={40}
                    height={40}
                    borderRadius={999}
                    backgroundColor={action.accent ?? '$color9'}
                    alignItems="center"
                    justifyContent="center"
                    shadowColor={action.accent ?? '$color9'}
                    shadowOpacity={0.4}
                    shadowRadius={8}
                    shadowOffset={{ width: 0, height: 2 }}
                  >
                    <YStack alignItems="center" justifyContent="center">
                      {action.icon}
                    </YStack>
                  </XStack>
                </XStack>
              </Pressable>
            </Animated.View>
          ))}
        </YStack>
      ) : null}

      {/* The FAB itself. */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 32,
            height: dim,
            borderRadius: dim / 2,
            elevation: 4,
          },
          positionStyles[position] as object,
          fabContainerStyle,
        ]}
      >
        <Pressable
          onPress={handleFabPress}
          accessibilityRole="button"
          accessibilityLabel={open ? 'Close menu' : (label ?? 'Open menu')}
          accessibilityState={{ expanded: open }}
          style={({ pressed }) => ({ flex: 1, opacity: pressed ? 0.9 : 1 })}
        >
          {/* Icon + label form ONE centered group. The icon rotates; the label
              lives in an animated-width container that grows from 0, so when
              closed only the icon shows (perfectly centered in the circle) and
              when open the [icon][label] pair sits centered together in the
              pill — never a centered icon with a far-right label. */}
          <XStack
            flex={1}
            height={dim}
            borderRadius={dim / 2}
            backgroundColor="$color9"
            alignItems="center"
            justifyContent="center"
            shadowColor="$color9"
            shadowOpacity={0.45}
            shadowRadius={14}
            shadowOffset={{ height: 4, width: 0 }}
          >
            <Animated.View style={iconStyle}>
              {icon ? <YStack alignItems="center" justifyContent="center">{icon}</YStack> : null}
            </Animated.View>
            {isPill ? (
              <Animated.View
                style={[
                  labelWrapStyle,
                  { overflow: 'hidden', justifyContent: 'center', pointerEvents: 'none' },
                ]}
              >
                <SizableText
                  color="$color1"
                  size="$4"
                  fontWeight="600"
                  numberOfLines={1}
                  paddingLeft={8}
                >
                  {morphLabel}
                </SizableText>
              </Animated.View>
            ) : null}
          </XStack>
        </Pressable>
      </Animated.View>
    </>
  )
}
