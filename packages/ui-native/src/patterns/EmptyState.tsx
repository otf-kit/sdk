import { Circle, SizableText, YStack } from 'tamagui'
import type { ReactNode } from 'react'
import { Button } from '../primitives/Button'

export type EmptyStateProps = {
  icon?: ReactNode
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

/**
 * Bespoke empty state — the icon sits in a lifted $color3 circle + hairline (so
 * it reads as a deliberate illustration, not a floating glyph), with a primary
 * CTA. (Previously the icon floated bare and the description rendered in $color9,
 * the orange ACCENT, instead of muted secondary text — and the CTA hand-rolled
 * its accent styling instead of using Button variant="primary".)
 */
export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center" gap="$4" padding="$6">
      {icon && (
        <Circle size={76} backgroundColor="$color3" borderWidth={1} borderColor="$color5">
          {icon}
        </Circle>
      )}
      <YStack gap="$2" alignItems="center">
        <SizableText size="$6" fontWeight="700" textAlign="center" color="$color12">
          {title}
        </SizableText>
        {description && (
          <SizableText size="$4" color="$color11" textAlign="center" maxWidth={280}>
            {description}
          </SizableText>
        )}
      </YStack>
      {actionLabel && onAction && (
        <Button variant="primary" onPress={onAction}>
          {actionLabel}
        </Button>
      )}
    </YStack>
  )
}
