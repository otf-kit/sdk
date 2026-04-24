import { XStack, YStack, Text } from 'tamagui'
import type { ReactNode } from 'react'

export interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <XStack
      justifyContent="space-between"
      alignItems="flex-start"
      paddingHorizontal="$4"
      paddingVertical="$3"
    >
      <YStack gap="$1" flex={1}>
        <Text fontSize="$5" fontWeight="700" color="$color12">
          {title}
        </Text>
        {description && (
          <Text fontSize="$3" color="$color9">
            {description}
          </Text>
        )}
      </YStack>
      {actions && (
        <XStack gap="$2" alignItems="center">
          {actions}
        </XStack>
      )}
    </XStack>
  )
}
