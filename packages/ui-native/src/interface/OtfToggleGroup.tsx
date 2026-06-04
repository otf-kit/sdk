import { useEffect, useState } from 'react'
import { SizableText, XStack, useTheme } from 'tamagui'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export type OtfToggleOption = { value: string; label: string }
export type OtfToggleGroupProps = {
  options: OtfToggleOption[]
  value: string
  onValueChange: (value: string) => void
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = { sm: '$2' as const, md: '$3' as const, lg: '$4' as const }
const INSET = 3

/**
 * Segmented control with a sliding accent thumb. Segments are equal-width, so
 * the thumb position is simply activeIndex * segmentWidth, animated via
 * Reanimated `withTiming` (same driver as TabBar). The thumb sits behind the
 * labels in a $color2 track; the active label rides on top in $color1.
 * (Previously the active segment just hard-swapped its background — no motion.)
 */
export function OtfToggleGroup({ options, value, onValueChange, size = 'md' }: OtfToggleGroupProps) {
  const textSize = sizeMap[size]
  const theme = useTheme()
  const thumbColor = theme.color9?.get?.() ?? '#f97316'

  const [dims, setDims] = useState({ w: 0, h: 0 })
  const n = options.length
  const segW = n > 0 ? dims.w / n : 0
  const activeIndex = Math.max(0, options.findIndex((o) => o.value === value))

  const tx = useSharedValue(0)
  useEffect(() => {
    if (segW <= 0) return
    tx.value = withTiming(activeIndex * segW, { duration: 240, easing: Easing.out(Easing.cubic) })
  }, [activeIndex, segW, tx])

  const thumbStyle = useAnimatedStyle(() => {
    'worklet'
    return { transform: [{ translateX: tx.value }] }
  }, [tx])

  return (
    <XStack
      position="relative"
      borderRadius="$4"
      backgroundColor="$color2"
      borderWidth={1}
      borderColor="$color4"
      onLayout={(e) =>
        setDims({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
      }
    >
      {/* Sliding thumb behind the labels. */}
      {segW > 0 && (
        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: 'absolute',
              top: INSET,
              left: INSET,
              width: Math.max(0, segW - INSET * 2),
              height: Math.max(0, dims.h - INSET * 2),
              borderRadius: 9,
              backgroundColor: thumbColor,
              zIndex: 0,
            },
            thumbStyle,
          ]}
        />
      )}

      {options.map((option) => {
        const isActive = option.value === value
        return (
          <XStack
            key={option.value}
            flex={1}
            justifyContent="center"
            alignItems="center"
            paddingVertical="$2"
            paddingHorizontal="$3"
            zIndex={1}
            pressStyle={{ opacity: 0.7 }}
            onPress={() => onValueChange(option.value)}
            cursor="pointer"
          >
            <SizableText
              size={textSize}
              fontWeight={isActive ? '600' : '500'}
              color={isActive ? '$color1' : '$color11'}
            >
              {option.label}
            </SizableText>
          </XStack>
        )
      })}
    </XStack>
  )
}
