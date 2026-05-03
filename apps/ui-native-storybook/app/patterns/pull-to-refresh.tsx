import { useState } from 'react'
import {
  PullToRefresh,
  YStack,
  XStack,
  SizableText,
  Circle,
  Separator,
} from '@otf/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

type Item = { id: string; title: string; meta: string; initial: string }

const SEED: Item[] = [
  { id: '1', title: 'Sarah Chen', meta: 'Pushed a new commit · 2m', initial: 'S' },
  { id: '2', title: 'Alex Rivera', meta: 'Opened PR #482 · 14m', initial: 'A' },
  { id: '3', title: 'Jordan Kim', meta: 'Merged release/2.3 · 1h', initial: 'J' },
  { id: '4', title: 'Maya Patel', meta: 'Updated design tokens · 3h', initial: 'M' },
  { id: '5', title: 'Diego Costa', meta: 'Closed 5 issues · 5h', initial: 'D' },
]

function ListRow({ item }: { item: Item }) {
  return (
    <XStack paddingVertical="$3" paddingHorizontal="$3" gap="$3" alignItems="center">
      <Circle size={32} backgroundColor="$color5">
        <SizableText size="$3" fontWeight="700">
          {item.initial}
        </SizableText>
      </Circle>
      <YStack flex={1} gap="$0.5">
        <SizableText size="$3" fontWeight="600">{item.title}</SizableText>
        <SizableText size="$2" color="$color10">{item.meta}</SizableText>
      </YStack>
    </XStack>
  )
}

export default function PullToRefreshShowcase() {
  const [items, setItems] = useState<Item[]>(SEED)
  const [refreshing, setRefreshing] = useState(false)
  const [refreshCount, setRefreshCount] = useState(0)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshCount((n) => n + 1)
      setItems((curr) => [
        { id: `r${Date.now()}`, title: 'New activity', meta: 'Just now', initial: 'N' },
        ...curr,
      ])
      setRefreshing(false)
    }, 900)
  }

  return (
    <ShowcaseFrame
      title="Pull to Refresh"
      description="Native pull gesture wrapping a scrollable list. Pull down past the threshold to fire the refresh handler."
      docPath="packages/ui-native/src/patterns/PullToRefresh.tsx"
    >
      <Section
        title="Activity feed — pull to refresh"
        hint={`Refreshed ${refreshCount}× · ${items.length} items`}
      >
        <YStack
          height={420}
          overflow="hidden"
          borderRadius="$4"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$color1"
        >
          <PullToRefresh refreshing={refreshing} onRefresh={handleRefresh}>
            <YStack>
              {items.map((item, i) => (
                <YStack key={item.id}>
                  <ListRow item={item} />
                  {i < items.length - 1 && <Separator />}
                </YStack>
              ))}
            </YStack>
          </PullToRefresh>
        </YStack>
      </Section>

      <Section title="Empty list — pull still works">
        <YStack
          height={220}
          overflow="hidden"
          borderRadius="$4"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$color1"
        >
          <PullToRefresh refreshing={false} onRefresh={() => {}}>
            <YStack flex={1} alignItems="center" justifyContent="center" padding="$4" gap="$1">
              <SizableText size="$4" fontWeight="600" color="$color12">No activity yet</SizableText>
              <SizableText size="$2" color="$color10">Pull down to check again.</SizableText>
            </YStack>
          </PullToRefresh>
        </YStack>
      </Section>

      <SizableText size="$2" color="$color10">
        Tip: gesture only triggers on native. On web the wrapper renders a normal scroll view.
      </SizableText>
    </ShowcaseFrame>
  )
}
