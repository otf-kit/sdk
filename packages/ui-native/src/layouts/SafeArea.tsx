import { type ReactNode } from 'react'
import { YStack } from 'tamagui'

export type SafeAreaProps = { children: ReactNode; edges?: ('top' | 'bottom' | 'left' | 'right')[] }

export function SafeArea({ children, edges = ['top', 'bottom'] }: SafeAreaProps) {
  return (
    <YStack
      flex={1} backgroundColor="$background"
      paddingTop={edges.includes('top') ? '$6' : undefined}
      paddingBottom={edges.includes('bottom') ? '$6' : undefined}
      paddingLeft={edges.includes('left') ? '$4' : undefined}
      paddingRight={edges.includes('right') ? '$4' : undefined}
    >
      {children}
    </YStack>
  )
}
