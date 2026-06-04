import { useState } from 'react'
import {
  SwipeableRow,
  Image,
  YStack,
  XStack,
  SizableText,
  Circle,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'
import { PEOPLE } from '../../lib/fixtures'

type Row = { id: string; personId: string; title: string; subtitle: string; time: string }

const initialRows: Row[] = [
  { id: 'r1', personId: 'sarah',  title: 'Sarah Chen',   subtitle: 'Sent the deck for tomorrow',        time: '9:41 AM' },
  { id: 'r2', personId: 'alex',   title: 'Alex Rivera',  subtitle: 'Re: budget review — 2 attachments', time: '9:18 AM' },
  { id: 'r3', personId: 'jordan', title: 'Jordan Kim',   subtitle: 'Standup notes are up',              time: '8:55 AM' },
]

function AvatarPhoto({ personId, size = 40 }: { personId: string; size?: number }) {
  const person = PEOPLE.find(p => p.id === personId)
  if (!person) return <Circle size={size} backgroundColor="$color5" />
  return (
    <Circle size={size} overflow="hidden" borderWidth={1.5} borderColor="$color4">
      <Image source={{ uri: person.avatar }} width={size} height={size} objectFit="cover" />
    </Circle>
  )
}

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
      <AvatarPhoto personId={row.personId} />
      <YStack flex={1} gap="$0.5">
        <XStack justifyContent="space-between" alignItems="center">
          <SizableText size="$4" fontWeight="600" color="$color12">{row.title}</SizableText>
          <SizableText size="$1" color="$color11">{row.time}</SizableText>
        </XStack>
        <SizableText size="$2" color="$color11" numberOfLines={1}>{row.subtitle}</SizableText>
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
            <SizableText size="$3" color="$color11" textAlign="center" paddingVertical="$4">
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
          <RowCard row={{ id: 'pin', personId: 'maya', title: 'Maya Patel', subtitle: 'Released the design tokens', time: 'Yesterday' }} />
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
          <RowCard row={{ id: 'multi', personId: 'diego', title: 'Diego Costa', subtitle: 'Q2 retro recap', time: 'Mon' }} />
        </SwipeableRow>
      </Section>

      <SizableText size="$2" color="$color11">
        Archived this session: {archived.length}
      </SizableText>
    </ShowcaseFrame>
  )
}
