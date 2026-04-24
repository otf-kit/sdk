import { useState, useCallback, type ReactNode } from 'react'
import { Circle, SizableText, XStack, YStack } from 'tamagui'

export type SwipeCardItem = { id: string; [key: string]: any }
export type SwipeCardsProps<T extends SwipeCardItem> = {
  items: T[]
  renderCard: (item: T) => ReactNode
  onSwipeLeft?: (item: T) => void
  onSwipeRight?: (item: T) => void
  onEmpty?: () => void
  leftLabel?: string
  rightLabel?: string
  emptyMessage?: string
}

const STACK_SIZE = 3
const CARD_OFFSETS = [
  { scale: 1, y: 0, opacity: 1 },
  { scale: 0.95, y: 8, opacity: 0.9 },
  { scale: 0.9, y: 16, opacity: 0.8 },
]

export function SwipeCards<T extends SwipeCardItem>({
  items, renderCard, onSwipeLeft, onSwipeRight, onEmpty,
  leftLabel = 'Nope', rightLabel = 'Like', emptyMessage = 'No more cards',
}: SwipeCardsProps<T>) {
  const [index, setIndex] = useState(0)
  const [exitDir, setExitDir] = useState<'left' | 'right' | null>(null)

  const remaining = items.slice(index)
  const isEmpty = remaining.length === 0

  const handleSwipe = useCallback((dir: 'left' | 'right') => {
    if (isEmpty) return
    const current = items[index]
    setExitDir(dir)
    const timer = setTimeout(() => {
      setExitDir(null)
      setIndex((i) => {
        const next = i + 1
        if (next >= items.length) onEmpty?.()
        return next
      })
      dir === 'left' ? onSwipeLeft?.(current) : onSwipeRight?.(current)
    }, 250)
    return () => clearTimeout(timer)
  }, [isEmpty, index, items, onEmpty, onSwipeLeft, onSwipeRight])

  if (isEmpty) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" gap="$3" padding="$4">
        <SizableText size="$5" color="$color8">{emptyMessage}</SizableText>
      </YStack>
    )
  }

  return (
    <YStack flex={1} gap="$4">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <YStack width="100%" maxWidth={340} aspectRatio={3 / 4} position="relative">
          {remaining.slice(0, STACK_SIZE).reverse().map((item, reverseIdx) => {
            const stackIdx = Math.min(remaining.length, STACK_SIZE) - 1 - reverseIdx
            const isTop = stackIdx === 0
            const offset = CARD_OFFSETS[stackIdx] ?? CARD_OFFSETS[2]
            const exitX = exitDir === 'left' ? -400 : exitDir === 'right' ? 400 : 0
            const exitRotate = exitDir === 'left' ? '-15deg' : exitDir === 'right' ? '15deg' : '0deg'

            return (
              <YStack key={item.id} position="absolute" top={0} left={0} right={0} bottom={0}
                animation="quick" borderRadius="$5" overflow="hidden" backgroundColor="$background"
                elevation={isTop ? 4 : 1} shadowColor="$shadowColor" shadowRadius={isTop ? 16 : 4}
                scale={isTop && exitDir ? 1 : offset.scale}
                opacity={isTop && exitDir ? 0 : offset.opacity}
                y={isTop && exitDir ? 0 : offset.y}
                x={isTop ? exitX : 0}
                rotate={isTop ? exitRotate : '0deg'}>
                {renderCard(item)}
                {isTop && exitDir === 'left' && (
                  <YStack position="absolute" top="$4" right="$4" borderWidth={3}
                    borderColor="$red10" borderRadius="$3" padding="$2" rotate="15deg">
                    <SizableText size="$7" fontWeight="800" color="$red10">{leftLabel.toUpperCase()}</SizableText>
                  </YStack>
                )}
                {isTop && exitDir === 'right' && (
                  <YStack position="absolute" top="$4" left="$4" borderWidth={3}
                    borderColor="$green10" borderRadius="$3" padding="$2" rotate="-15deg">
                    <SizableText size="$7" fontWeight="800" color="$green10">{rightLabel.toUpperCase()}</SizableText>
                  </YStack>
                )}
              </YStack>
            )
          })}
        </YStack>
      </YStack>
      <XStack justifyContent="center" gap="$6" paddingBottom="$4">
        <Circle size={60} backgroundColor="$red3" borderWidth={2} borderColor="$red7"
          pressStyle={{ scale: 0.9, backgroundColor: '$red5' }} animation="quick"
          onPress={() => handleSwipe('left')} alignItems="center" justifyContent="center">
          <SizableText size="$6" color="$red10" fontWeight="700">✕</SizableText>
        </Circle>
        <Circle size={60} backgroundColor="$green3" borderWidth={2} borderColor="$green7"
          pressStyle={{ scale: 0.9, backgroundColor: '$green5' }} animation="quick"
          onPress={() => handleSwipe('right')} alignItems="center" justifyContent="center">
          <SizableText size="$6" color="$green10" fontWeight="700">♥</SizableText>
        </Circle>
      </XStack>
    </YStack>
  )
}
