import { YStack } from 'tamagui'
import type { ReactNode } from 'react'

export type KeyboardStickyFooterProps = {
  children: ReactNode
  offset?: number
}

export function KeyboardStickyFooter({ children, offset }: KeyboardStickyFooterProps) {
  return (
    <YStack maxWidth={500} alignSelf="center" paddingTop="$8" paddingBottom="$4" style={{ paddingBottom: offset }}>
      {children}
    </YStack>
  )
}
