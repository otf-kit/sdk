import { SizableText, YStack, type GetProps } from 'tamagui'
import type { ReactNode } from 'react'

export type SectionProps = {
  title?: string
  description?: string
  children: ReactNode
  gap?: GetProps<typeof YStack>['gap']
}

export function Section({ title, description, children, gap = '$3' }: SectionProps) {
  return (
    <YStack gap={gap}>
      {title && (
        <YStack gap="$1">
          <SizableText size="$5" fontWeight="600" color="$color12">{title}</SizableText>
          {description && (
            <SizableText size="$3" color="$color11">{description}</SizableText>
          )}
        </YStack>
      )}
      {children}
    </YStack>
  )
}
