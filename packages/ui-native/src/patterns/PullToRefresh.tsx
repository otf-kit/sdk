import { type ReactNode } from 'react'
import { YStack } from 'tamagui'
import { RefreshControl, ScrollView } from 'react-native'

export type PullToRefreshProps = { children: ReactNode; onRefresh: () => void; refreshing?: boolean }

export function PullToRefresh({ children, onRefresh, refreshing = false }: PullToRefreshProps) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <YStack flex={1}>{children}</YStack>
    </ScrollView>
  )
}
