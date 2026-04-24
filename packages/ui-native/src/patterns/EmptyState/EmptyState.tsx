import { Button, SizableText, YStack } from 'tamagui'
import type { ReactNode } from 'react'

export type EmptyStateProps = {
  icon?: ReactNode
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center" gap="$4" padding="$6">
      {icon}
      <YStack gap="$2" alignItems="center">
        <SizableText size="$6" fontWeight="600" textAlign="center">
          {title}
        </SizableText>
        {description && (
          <SizableText size="$4" color="$color9" textAlign="center" maxWidth={280}>
            {description}
          </SizableText>
        )}
      </YStack>
      {actionLabel && onAction && (
        <Button
          size="$4"
          backgroundColor="$color9"
          color="$color1"
          borderRadius="$4"
          hoverStyle={{ backgroundColor: '$color10' }}
          pressStyle={{ backgroundColor: '$color8' }}
          onPress={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </YStack>
  )
}
