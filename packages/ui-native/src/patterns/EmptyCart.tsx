import { ShoppingCart } from '@tamagui/lucide-icons'
import type { ReactNode } from 'react'
import { YStack } from 'tamagui'
import { EmptyState } from './EmptyState'

export type EmptyCartProps = {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  /** Override the default cart icon chip. */
  icon?: ReactNode
}

/** Empty-cart state — a cart-iconed preset of `EmptyState` with a continue-shopping CTA. */
export function EmptyCart({
  title = 'Your cart is empty',
  description = 'Browse the catalog and add something you love.',
  actionLabel = 'Continue shopping',
  onAction,
  icon,
}: EmptyCartProps) {
  return (
    <EmptyState
      icon={
        icon ?? (
          <YStack
            width={56}
            height={56}
            borderRadius="$10"
            backgroundColor="$color3"
            alignItems="center"
            justifyContent="center"
          >
            <ShoppingCart size={26} color="$color9" />
          </YStack>
        )
      }
      title={title}
      description={description}
      actionLabel={actionLabel}
      onAction={onAction}
    />
  )
}
