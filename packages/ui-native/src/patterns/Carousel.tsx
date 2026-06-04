import { Children, useState, type ReactNode } from 'react'
import { Stack, XStack, YStack } from 'tamagui'
import { ScrollView } from 'react-native'
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'

export type CarouselProps = { children: ReactNode; gap?: string; snapToInterval?: number; showIndicators?: boolean }

export function Carousel({ children, gap = '$3', snapToInterval, showIndicators = false }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const count = Children.count(children)
  const gapPx = gap === '$2' ? 8 : gap === '$3' ? 12 : 16
  return (
    <YStack gap="$3">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} snapToInterval={snapToInterval} decelerationRate="fast"
        contentContainerStyle={{ gap: gapPx, paddingHorizontal: 16 }}
        onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          if (snapToInterval) setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / snapToInterval))
        }}>
        {children}
      </ScrollView>
      {showIndicators && count > 1 && (
        <XStack justifyContent="center" alignItems="center" gap="$1.5">
          {Array.from({ length: count }, (_, i) => {
            const active = i === activeIndex
            // Active page is an elongated pill that morphs in/out via the width
            // animation; inactive pages stay as small dots.
            return (
              <Stack
                key={i}
                width={active ? 16 : 6}
                height={6}
                borderRadius={3}
                backgroundColor={active ? '$color9' : '$color4'}
                animation="quick"
              />
            )
          })}
        </XStack>
      )}
    </YStack>
  )
}
