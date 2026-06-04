/**
 * FloatingLabelInput — input where the label sits inside the field at rest
 * and floats up + shrinks when the field is focused OR contains text. Cross-
 * platform parity with @otfdashkit/ui's FloatingLabelInput.
 *
 * Reference (visual spec): https://www.grepped.ai/animations/components-ui/floating-label
 *
 * Motion: Reanimated 4 (already a peer dep). All animation is gated on
 * useReducedMotion() — when on, the label snaps to its target state without
 * tweening. No new heavy peers introduced.
 */

import { useCallback, useEffect, useState } from 'react'
import { TextInput, type TextInputProps } from 'react-native'
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { SizableText, View, YStack, useTheme } from 'tamagui'

export type FloatingLabelInputProps = Omit<TextInputProps, 'placeholder'> & {
  /** Label that floats up when focused or filled. */
  label:    string
  /** Inline error text shown below the input. */
  error?:   string
  /** Helper text shown below the input when there's no error. */
  hint?:    string
}

const ANIMATION_DURATION = 150
const EASING             = Easing.out(Easing.ease)

export function FloatingLabelInput({
  label,
  error,
  hint,
  value,
  defaultValue,
  onFocus,
  onBlur,
  onChangeText,
  style,
  ...rest
}: FloatingLabelInputProps) {
  const reduced = useReducedMotion()
  // Resolve the foreground token to a hex for the native TextInput style
  // (RN style needs a real color, not a $token) so text is readable in BOTH
  // light and dark — fixes the hardcoded-#0a0a0a invisible-in-dark bug.
  const inputColor = useTheme().color12?.val ?? '#0a0a0a'

  const [focused, setFocused] = useState(false)
  const [filled,  setFilled]  = useState(() => {
    if (value && value.length > 0) return true
    if (defaultValue && defaultValue.length > 0) return true
    return false
  })

  // Drive the float in a single shared value 0 → 1.
  const progress = useSharedValue(filled ? 1 : 0)

  // Re-derive progress when controlled `value` changes externally
  useEffect(() => {
    if (value !== undefined) setFilled(value.length > 0)
  }, [value])

  useEffect(() => {
    const target = (focused || filled) ? 1 : 0
    progress.value = reduced
      ? target
      : withTiming(target, { duration: ANIMATION_DURATION, easing: EASING })
  }, [focused, filled, reduced, progress])

  // NOTE: the explicit `[progress]` dependency array is REQUIRED. The SDK
  // ships pre-built `dist/` — tsup does not run the Reanimated worklets
  // Babel plugin, and a consumer's plugin does not retroactively transform
  // node_modules. Without the array, `useAnimatedStyle` throws on web
  // ("used without a dependency array or Babel plugin"). Every
  // useAnimatedStyle / useAnimatedProps in this package must pass one.
  const labelAnim = useAnimatedStyle(() => {
    'worklet'
    return {
      transform: [
        // Slide up
        { translateY: interpolate(progress.value, [0, 1], [0, -10]) },
        // Scale down
        { scale:      interpolate(progress.value, [0, 1], [1, 0.78]) },
      ],
      // Brighter when floated
      opacity:        interpolate(progress.value, [0, 1], [0.7, 1]),
    }
  }, [progress])

  const handleFocus  = useCallback((e: Parameters<NonNullable<TextInputProps['onFocus']>>[0]) => {
    setFocused(true)
    onFocus?.(e)
  }, [onFocus])

  const handleBlur   = useCallback((e: Parameters<NonNullable<TextInputProps['onBlur']>>[0]) => {
    setFocused(false)
    onBlur?.(e)
  }, [onBlur])

  const handleChange = useCallback((t: string) => {
    setFilled(t.length > 0)
    onChangeText?.(t)
  }, [onChangeText])

  return (
    <YStack gap="$1.5">
      <View
        position="relative"
        height={56}
        borderWidth={1}
        borderRadius="$4"
        borderColor={error ? '$red9' : (focused ? '$color8' : '$color5')}
        backgroundColor="$color1"
        paddingHorizontal="$3"
        justifyContent="flex-end"
        paddingBottom={8}
      >
        <Animated.View
          pointerEvents="none"
          style={[
            { position: 'absolute', left: 12, top: 18, transformOrigin: '0% 50%' },
            labelAnim,
          ]}
        >
          <SizableText
            size="$3"
            color={error ? '$red10' : '$color11'}
            textTransform={(focused || filled) ? 'uppercase' : undefined}
            letterSpacing={(focused || filled) ? 1 : 0}
            fontWeight={(focused || filled) ? '600' : '400'}
          >
            {label}
          </SizableText>
        </Animated.View>

        <TextInput
          {...rest}
          value={value}
          defaultValue={defaultValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChange}
          style={[
            {
              fontSize: 16,
              color:    inputColor,
              padding:  0,
              margin:   0,
              minHeight: 28,
              fontFamily: undefined,
            },
            style as object,
          ]}
        />
      </View>

      {error ? (
        <SizableText size="$2" color="$red10">{error}</SizableText>
      ) : hint ? (
        <SizableText size="$2" color="$color11">{hint}</SizableText>
      ) : null}
    </YStack>
  )
}
