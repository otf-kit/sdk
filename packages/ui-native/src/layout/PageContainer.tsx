import { YStack, type YStackProps } from 'tamagui'
import type { ReactNode } from 'react'

export interface PageContainerProps extends YStackProps {
  children?: ReactNode
}

export function PageContainer({ children, ...props }: PageContainerProps) {
  return (
    <YStack
      flex={1}
      paddingHorizontal="$4"
      maxWidth={1160}
      alignSelf="center"
      width="100%"
      {...props}
    >
      {children}
    </YStack>
  )
}
