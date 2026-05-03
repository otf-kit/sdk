import { useState } from 'react'
import {
  SwipeableRow,
  YStack,
  XStack,
  SizableText,
  Circle,
} from '@otf/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

type Row = { id: string; title: string; subtitle: string; initial: string }

const initialRows: Row[] = [
  { id: 'r1', title: 'Sarah Chen', subtitle: 'Sent the deck for tomorrow', initial: 'S' },
  { id: 'r2', title: 'Alex Rivera', subtitle: 'Re: budget review — 2 attachments', initial: 'A' },
  { id: 'r3', title: 'Jordan Kim', subtitle: 'Standup notes are up', initial: 'J' },
]

function RowCard({ row }: { row: Row }) {
  return (
    <XStack
      backgroundColor="$color1"
      paddingVertical="$3"
      paddingHorizontal="$4"
      gap="$3"
      alignItems="center"
      borderRadius="$3"
      borderWidth={1}
      borderColor="$borderColor"
    >
      <Circle size={36} backgroundColor="$color5">
        <SizableText size="$3" fontWeight="700" color="$color12">
          {row.initial}
        </SizableText>
      </Circle>
      <YStack flex={1} gap="$0.5">
        <SizableText size="$4" fontWeight="600" color="$color12">
          {row.title}
        </SizableText>
        <SizableText size="$2" color="$color10" numberOfLines={1}>
          {row.subtitle}
        </SizableText>
      </YStack>
    </XStack>
  )
}

export default function SwipeableRowShowcase() {
  const [rows, setRows] = useState<Row[]>(initialRows)
  const [archived, setArchived] = useState<string[]>([])

  return (
    <ShowcaseFrame
      title="Swipeable Row"
      description="Long-press to reveal contextual actions on either side of a row. Used for inbox, queue, and list-management UIs."
      docPath="packages/ui-native/src/patterns/SwipeableRow.tsx"
    >
      <Section title="Inbox — left archive, right delete" hint="Long-press a row">
        <YStack gap="$2">
          {rows.map((row) => (
            <SwipeableRow
              key={row.id}
              leftActions={[
                {
                  id: 'archive',
                  label: 'Archive',
                  color: '$blue9',
                  onPress: () => setArchived((a) => [...a, row.id]),
                },
              ]}
              rightActions={[
                {
                  id: 'delete',
                  label: 'Delete',
                  color: '$red9',
                  onPress: () => setRows((rs) => rs.filter((r) => r.id !== row.id)),
                },
              ]}
            >
              <RowCard row={row} />
            </SwipeableRow>
          ))}
          {rows.length === 0 && (
            <SizableText size="$3" color="$color10" textAlign="center" paddingVertical="$4">
              All caught up.
            </SizableText>
          )}
        </YStack>
      </Section>

      <Section title="Single action only — pin">
        <SwipeableRow
          rightActions={[
            { id: 'pin', label: 'Pin', color: '$yellow9', onPress: () => {} },
          ]}
        >
          <RowCard row={{ id: 'one', title: 'Maya Patel', subtitle: 'Released the design tokens', initial: 'M' }} />
        </SwipeableRow>
      </Section>

      <Section title="Multiple actions per side">
        <SwipeableRow
          leftActions={[
            { id: 'read', label: 'Read', color: '$color8', onPress: () => {} },
          ]}
          rightActions={[
            { id: 'snooze', label: 'Snooze', color: '$yellow9', onPress: () => {} },
            { id: 'flag', label: 'Flag', color: '$red9', onPress: () => {} },
          ]}
        >
          <RowCard row={{ id: 'multi', title: 'Diego Costa', subtitle: 'Q2 retro recap', initial: 'D' }} />
        </SwipeableRow>
      </Section>

      <SizableText size="$2" color="$color10">
        Archived this session: {archived.length}
      </SizableText>
    </ShowcaseFrame>
  )
}
