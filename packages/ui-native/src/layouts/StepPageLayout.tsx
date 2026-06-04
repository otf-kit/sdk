import { SizableText, YStack } from 'tamagui'
import type { ReactNode } from 'react'

export type StepPageProps = {
  title: string
  description?: string
  children: ReactNode
  bottom?: ReactNode
}

export function StepPageLayout({ title, description, children, bottom }: StepPageProps) {
  return (
    <YStack flex={1} padding="$4" maxWidth={500} marginHorizontal="auto" width="100%">
      <YStack gap="$5">
        <YStack gap="$2">
          <SizableText size="$8" fontWeight="700">{title}</SizableText>
          {description && (
            <SizableText size="$5" fontWeight="400" color="$color11">{description}</SizableText>
          )}
        </YStack>
      </YStack>
      <YStack paddingTop="$5" gap="$4">{children}</YStack>
      {bottom && <YStack paddingTop="$4">{bottom}</YStack>}
    </YStack>
  )
}
