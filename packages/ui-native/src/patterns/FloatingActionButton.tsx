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

const PILL_OPEN_WIDTH = 140
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
      <XStack
        position="absolute"
        bottom={32}
        {...(positionStyles[position] as any)}
        height={dim}
        minWidth={dim}
        borderRadius={label ? '$6' : '$10'}
        backgroundColor="$color9"
        alignItems="center"
        justifyContent="center"
        gap="$2"
        paddingHorizontal={label ? '$4' : 0}
        elevation={4}
        pressStyle={{ scale: 0.95, opacity: 0.9 }}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label ?? 'Action'}
      >
        {icon ? <SizableText color="$color1">{icon}</SizableText> : null}
        {label ? (
          <SizableText color="$color1" size="$4" fontWeight="600">
            {label}
          </SizableText>
        ) : null}
      </XStack>
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

  // Pill-style morph: width interpolates from `dim` (circle) to PILL_OPEN_WIDTH.
  // Circle-style: width stays at `dim`.
  const fabContainerStyle = useAnimatedStyle(() => {
    'worklet'
    if (expandStyle === 'circle' || reduced) {
      return { width: dim }
    }
    const width = dim + (PILL_OPEN_WIDTH - dim) * progress.value
    return { width }
  }, [expandStyle, reduced, dim, progress])

  // The morph label fades in alongside the rotated icon when expanding into a pill.
  const morphLabelStyle = useAnimatedStyle(() => {
    'worklet'
    return { opacity: expandStyle === 'pill' && !reduced ? progress.value : 0 }
  }, [expandStyle, reduced, progress])

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
  const morphLabel = label ?? 'Add'

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
              <XStack
                gap={12}
                alignItems="center"
                accessibilityRole="button"
                accessibilityLabel={action.label}
                onPress={() => handleActionPress(action)}
                pressStyle={{ opacity: 0.85, scale: 0.98 }}
              >
                <XStack
                  paddingHorizontal={12}
                  paddingVertical={8}
                  borderRadius={999}
                  backgroundColor="$color2"
                  elevation={2}
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
                  elevation={3}
                >
                  <SizableText color="$color1">{action.icon}</SizableText>
                </XStack>
              </XStack>
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
        <XStack
          flex={1}
          height={dim}
          borderRadius={dim / 2}
          backgroundColor="$color9"
          alignItems="center"
          justifyContent="center"
          gap="$2"
          paddingHorizontal={expandStyle === 'pill' ? '$3' : 0}
          pressStyle={{ scale: 0.95, opacity: 0.9 }}
          onPress={handleFabPress}
          accessibilityRole="button"
          accessibilityLabel={open ? 'Close menu' : (label ?? 'Open menu')}
          accessibilityState={{ expanded: open }}
        >
          <Animated.View style={iconStyle}>
            {icon ? <SizableText color="$color1">{icon}</SizableText> : null}
          </Animated.View>
          {expandStyle === 'pill' ? (
            <Animated.View style={morphLabelStyle}>
              <SizableText
                color="$color1"
                size="$4"
                fontWeight="600"
                numberOfLines={1}
              >
                {morphLabel}
              </SizableText>
            </Animated.View>
          ) : null}
        </XStack>
      </Animated.View>
    </>
  )
}
