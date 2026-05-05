import { useState } from 'react'
import {
  CardScroller,
  Card,
  H4,
  Paragraph,
  SizableText,
  YStack,
} from '@otf/ui-native'
import { Section, ShowcaseFrame } from '../../components/ShowcaseFrame'

interface DemoCard {
  id: string
  title: string
  body: string
  accent: string
}

const WORKOUT_TYPES: DemoCard[] = [
  { id: 'run', title: 'Run', body: '5 km · 26 min', accent: '#ff375f' },
  { id: 'ride', title: 'Ride', body: '12 km · 38 min', accent: '#00d4d4' },
  { id: 'strength', title: 'Strength', body: '5 sets · 45 min', accent: '#a3ff12' },
  { id: 'yoga', title: 'Yoga', body: 'Flow · 30 min', accent: '#fbbf24' },
  { id: 'hiit', title: 'HIIT', body: '20 rounds · 15 min', accent: '#a78bfa' },
]

const PLANS: DemoCard[] = [
  { id: 'p1', title: '8-week strength', body: 'Build foundation', accent: '#a3ff12' },
  { id: 'p2', title: '5K trainer', body: 'Couch → 5K', accent: '#ff375f' },
  { id: 'p3', title: 'Daily mobility', body: '15 min/day', accent: '#fbbf24' },
]

function renderCard(c: DemoCard) {
  return (
    <Card padding="$5" backgroundColor="$color3" borderRadius="$5" borderColor={c.accent} borderWidth={1} flex={1}>
      <YStack gap="$2" justifyContent="space-between" flex={1}>
        <H4 color={c.accent}>{c.title}</H4>
        <Paragraph size="$3" color="$color11">{c.body}</Paragraph>
      </YStack>
    </Card>
  )
}

export default function CardScrollerShowcase() {
  const [centerIdx, setCenterIdx] = useState(2)
  const [startIdx, setStartIdx] = useState(0)

  return (
    <ShowcaseFrame
      title="CardScroller"
      description="Snap-to-card horizontal scroller. Center-snap auto-aligns the focused card to viewport center; off-center cards fade + scale down."
    >
      <Section title="Center snap (default)">
        <YStack height={180}>
          <CardScroller
            data={WORKOUT_TYPES}
            keyExtractor={(c) => c.id}
            renderItem={(c) => renderCard(c)}
            itemWidth={220}
            initialIndex={2}
            onIndexChange={setCenterIdx}
          />
        </YStack>
        <SizableText size="$2" color="$color10">Centered: {WORKOUT_TYPES[centerIdx]?.title}</SizableText>
      </Section>

      <Section title="Percentage width — 70% of viewport">
        <YStack height={180}>
          <CardScroller
            data={PLANS}
            keyExtractor={(c) => c.id}
            renderItem={(c) => renderCard(c)}
            itemWidth="70%"
            initialIndex={1}
          />
        </YStack>
      </Section>

      <Section title="Start snap, no fade">
        <YStack height={180}>
          <CardScroller
            data={WORKOUT_TYPES}
            keyExtractor={(c) => c.id}
            renderItem={(c) => renderCard(c)}
            itemWidth={180}
            snap="start"
            fadeOff={false}
            paddingHorizontal={16}
            onIndexChange={setStartIdx}
          />
        </YStack>
        <SizableText size="$2" color="$color10">Index: {startIdx}</SizableText>
      </Section>

      <Section title="Custom gap + small list">
        <YStack height={180}>
          <CardScroller
            data={PLANS}
            keyExtractor={(c) => c.id}
            renderItem={(c) => renderCard(c)}
            itemWidth={240}
            gap={20}
          />
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
