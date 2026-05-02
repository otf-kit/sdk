import { type ReactNode, Children } from 'react'
import { XStack, YStack } from 'tamagui'

export type GridProps = { children: ReactNode; columns?: number; gap?: string }
export type ContainerProps = { children: ReactNode; maxWidth?: number; centered?: boolean; padding?: string }

export function Grid({ children, columns = 2, gap = '$3' }: GridProps) {
  const items = Children.toArray(children)
  const rows: ReactNode[][] = []
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns))
  }
  return (
    <YStack gap={gap as any}>
      {rows.map((row, ri) => (
        <XStack key={ri} gap={gap as any}>
          {row.map((item, ci) => (
            <YStack key={ci} flex={1}>{item}</YStack>
          ))}
          {row.length < columns && Array.from({ length: columns - row.length }).map((_, i) => (
            <YStack key={`pad-${i}`} flex={1} />
          ))}
        </XStack>
      ))}
    </YStack>
  )
}

export function Container({ children, maxWidth = 500, centered = true, padding = '$4' }: ContainerProps) {
  return (
    <YStack width="100%" maxWidth={maxWidth} alignSelf={centered ? 'center' : undefined} padding={padding as any}>
      {children}
    </YStack>
  )
}
