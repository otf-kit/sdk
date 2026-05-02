import { Button, Image, SizableText, XStack, YStack } from 'tamagui'

export type ProductCardProps = {
  image: string
  title: string
  price: string
  originalPrice?: string
  rating?: number
  reviewCount?: number
  badge?: string
  onPress?: () => void
  onAddToCart?: () => void
  variant?: 'vertical' | 'horizontal'
}

function Stars({ rating = 0 }: { rating?: number }) {
  return (
    <XStack gap="$0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <SizableText key={i} size="$2" color={i < Math.round(rating) ? '$yellow9' : '$color5'}>★</SizableText>
      ))}
    </XStack>
  )
}

function CardContent({ title, price, originalPrice, rating, reviewCount, onAddToCart }: Omit<ProductCardProps, 'image' | 'badge' | 'onPress' | 'variant'>) {
  return (
    <YStack flex={1} gap="$1.5" justifyContent="space-between">
      <YStack gap="$1">
        <SizableText size="$4" fontWeight="600" numberOfLines={2}>{title}</SizableText>
        {rating !== undefined && (
          <XStack gap="$1.5" alignItems="center">
            <Stars rating={rating} />
            {reviewCount !== undefined && <SizableText size="$2" color="$color9">({reviewCount})</SizableText>}
          </XStack>
        )}
      </YStack>
      <XStack alignItems="center" justifyContent="space-between">
        <XStack gap="$2" alignItems="baseline">
          <SizableText size="$6" fontWeight="700">{price}</SizableText>
          {originalPrice && (
            <SizableText size="$3" color="$color8" textDecorationLine="line-through">{originalPrice}</SizableText>
          )}
        </XStack>
        {onAddToCart && (
          <Button size="$3" backgroundColor="$color9" color="$color1" borderRadius="$10"
            onPress={(e: any) => { e.stopPropagation?.(); onAddToCart() }}
            pressStyle={{ backgroundColor: '$color8', scale: 0.95 }} animation="quick">
            + Cart
          </Button>
        )}
      </XStack>
    </YStack>
  )
}

export function ProductCard({ image, title, price, originalPrice, rating, reviewCount, badge, onPress, onAddToCart, variant = 'vertical' }: ProductCardProps) {
  const isHorizontal = variant === 'horizontal'
  const Wrapper = isHorizontal ? XStack : YStack

  return (
    <Wrapper backgroundColor="$color1" borderRadius="$5" overflow="hidden" borderWidth={1}
      borderColor="$color4" onPress={onPress} animation="quick"
      pressStyle={onPress ? { scale: 0.98, opacity: 0.9 } : undefined}
      {...(isHorizontal ? { height: 140 } : {})}>
      <YStack {...(isHorizontal ? { width: 140 } : { aspectRatio: 4 / 3 })} position="relative">
        <Image source={{ uri: image }} width="100%" height="100%" objectFit="cover" />
        {badge && (
          <XStack position="absolute" top="$2" left="$2" backgroundColor="$red9"
            paddingHorizontal="$2" paddingVertical="$1" borderRadius="$10">
            <SizableText size="$1" fontWeight="700" color="white">{badge}</SizableText>
          </XStack>
        )}
      </YStack>
      <YStack flex={1} padding="$3">
        <CardContent {...{ title, price, originalPrice, rating, reviewCount, onAddToCart }} />
      </YStack>
    </Wrapper>
  )
}
