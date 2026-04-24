import { YStack, type YStackProps } from 'tamagui'
import type { ReactNode } from 'react'

export interface PageLayoutProps extends YStackProps {
  children?: ReactNode
}

export function PageLayout({ children, ...props }: PageLayoutProps) {
  return (
    <YStack flex={1} backgroundColor="$background" {...props}>
      {children}
    </YStack>
  )
}
