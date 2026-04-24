import React, { useRef } from 'react'
import { Animated } from 'react-native'
import { XStack, YStack, Text, useTheme } from 'tamagui'

export interface ScrollHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  /** Scroll offset at which shrink animation completes (default: 60) */
  threshold?: number
  /** If provided, renders a back button that calls this handler */
  onBack?: () => void
  scrollY?: Animated.Value
}

/**
 * ScrollHeader — title shrinks as user scrolls past threshold.
 * Pass a shared `Animated.Value` from your `Animated.ScrollView`:
 *
 * ```tsx
 * const scrollY = useRef(new Animated.Value(0)).current
 * <ScrollHeader title="Dashboard" scrollY={scrollY} />
 * <Animated.ScrollView onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}>
 * ```
 */
export function ScrollHeader({
  title,
  subtitle,
  actions,
  threshold = 60,
  onBack,
  scrollY: externalScrollY,
}: ScrollHeaderProps) {
  const internalScrollY = useRef(new Animated.Value(0)).current
  const scrollY = externalScrollY ?? internalScrollY
  const theme = useTheme()

  const titleFontSize = scrollY.interpolate({
    inputRange: [0, threshold],
    outputRange: [22, 14],
    extrapolate: 'clamp',
  })

  const bgOpacity = scrollY.interpolate({
    inputRange: [0, threshold / 2],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  const bgColor = theme.card?.val ?? '#111118'

  return (
    <Animated.View
      style={{
        backgroundColor: bgColor,
        opacity: Animated.add(new Animated.Value(1), Animated.multiply(bgOpacity, new Animated.Value(0))),
        borderBottomWidth: 1,
        borderBottomColor: theme.borderColor?.val ?? '#1f2030',
      }}
    >
      <XStack
        paddingHorizontal="$4"
        paddingVertical="$3"
        alignItems="center"
        justifyContent="space-between"
      >
        <XStack alignItems="center" gap="$2" flex={1}>
          {onBack && (
            <Text
              onPress={onBack}
              color="$color9"
              fontSize="$5"
              marginRight="$2"
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              ←
            </Text>
          )}
          <YStack flex={1}>
            <Animated.Text
              style={{
                fontSize: titleFontSize,
                fontWeight: '700',
                color: theme.color12?.val ?? '#e8e8f0',
              }}
              numberOfLines={1}
            >
              {title}
            </Animated.Text>
            {subtitle && (
              <Text fontSize="$2" color="$color9" numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </YStack>
        </XStack>
        {actions && (
          <XStack gap="$2" alignItems="center">
            {actions}
          </XStack>
        )}
      </XStack>
    </Animated.View>
  )
}
