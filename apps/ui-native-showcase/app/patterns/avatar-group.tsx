import { AvatarGroup, YStack, XStack, SizableText } from '@otf/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

const TEAM = [
  { name: 'Sarah Chen', color: '$blue9' },
  { name: 'Alex Rivera', color: '$green9' },
  { name: 'Jordan Kim', color: '$orange9' },
  { name: 'Maya Patel', color: '$purple9' },
  { name: 'Diego Costa', color: '$red9' },
  { name: 'Riley Stone', color: '$pink9' },
  { name: 'Casey Lee', color: '$yellow9' },
  { name: 'Morgan Yu', color: '$gray9' },
  { name: 'Nori Adams', color: '$cyan9' },
  { name: 'Taylor West', color: '$indigo9' },
]

export default function AvatarGroupShowcase() {
  return (
    <ShowcaseFrame
      title="Avatar Group"
      description="Stacked, overlapping avatars with overflow counter — used for project members and event participants."
      docPath="packages/ui-native/src/patterns/AvatarGroup.tsx"
    >
      <Section title="3 avatars">
        <AvatarGroup avatars={TEAM.slice(0, 3)} />
      </Section>

      <Section title="5 avatars">
        <AvatarGroup avatars={TEAM.slice(0, 5)} max={5} />
      </Section>

      <Section title="With overflow — 8 total, max 4" hint="+4 indicator">
        <AvatarGroup avatars={TEAM.slice(0, 8)} max={4} />
      </Section>

      <Section title="Sizes">
        <YStack gap="$4">
          <XStack gap="$3" alignItems="center">
            <SizableText size="$2" color="$color10" width={48}>sm</SizableText>
            <AvatarGroup avatars={TEAM.slice(0, 4)} size={24} overlap={6} />
          </XStack>
          <XStack gap="$3" alignItems="center">
            <SizableText size="$2" color="$color10" width={48}>md</SizableText>
            <AvatarGroup avatars={TEAM.slice(0, 4)} size={36} overlap={10} />
          </XStack>
          <XStack gap="$3" alignItems="center">
            <SizableText size="$2" color="$color10" width={48}>lg</SizableText>
            <AvatarGroup avatars={TEAM.slice(0, 4)} size={56} overlap={16} />
          </XStack>
        </YStack>
      </Section>

      <Section title="With image URIs">
        <AvatarGroup
          avatars={[
            { uri: 'https://i.pravatar.cc/100?img=11', name: 'Sarah Chen' },
            { uri: 'https://i.pravatar.cc/100?img=12', name: 'Alex Rivera' },
            { uri: 'https://i.pravatar.cc/100?img=13', name: 'Jordan Kim' },
            { name: 'Maya Patel', color: '$purple9' },
          ]}
          max={4}
        />
      </Section>
    </ShowcaseFrame>
  )
}
