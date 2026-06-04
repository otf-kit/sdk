import { X } from '@tamagui/lucide-icons'
import { Image, SizableText, XStack, YStack } from 'tamagui'
import { PriceTag } from './PriceTag'
import { QuantityStepper } from './QuantityStepper'

export type CartLineItemProps = {
  image?: string
  title: string
  /** Variant summary line, e.g. "Whole bean · 250g". */
  variant?: string
  /** Unit price in minor units (cents). */
  price: number
  compareAt?: number
  currency?: string
  quantity: number
  onQuantityChange?: (qty: number) => void
  onRemove?: () => void
  minQuantity?: number
  maxQuantity?: number
}

/** Cart row: thumbnail · title · variant · price · quantity stepper · remove. */
export function CartLineItem({
  image,
  title,
  variant,
  price,
  compareAt,
  currency = 'USD',
  quantity,
  onQuantityChange,
  onRemove,
  minQuantity = 1,
  maxQuantity = 99,
}: CartLineItemProps) {
  return (
    <XStack
      gap="$3"
      alignItems="center"
      padding="$3"
      borderRadius="$5"
      borderWidth={1}
      borderColor="$color4"
      backgroundColor="$color1"
    >
      {image ? <Image source={{ uri: image }} width={56} height={56} borderRadius={10} objectFit="cover" /> : null}
      <YStack flex={1} gap="$1">
        <SizableText size="$4" fontWeight="600" color="$color12" numberOfLines={1}>
          {title}
        </SizableText>
        {variant ? (
          <SizableText size="$2" color="$color11" numberOfLines={1}>
            {variant}
          </SizableText>
        ) : null}
        <PriceTag amount={price} compareAt={compareAt} currency={currency} size="sm" />
      </YStack>
      <QuantityStepper value={quantity} min={minQuantity} max={maxQuantity} onChange={onQuantityChange} size="sm" />
      {onRemove ? (
        <XStack
          width={32}
          height={32}
          alignItems="center"
          justifyContent="center"
          borderRadius="$10"
          onPress={onRemove}
          pressStyle={{ backgroundColor: '$color3' }}
          cursor="pointer"
          accessibilityRole="button"
          accessibilityLabel={`Remove ${title}`}
        >
          <X size={16} color="$color11" />
        </XStack>
      ) : null}
    </XStack>
  )
}
