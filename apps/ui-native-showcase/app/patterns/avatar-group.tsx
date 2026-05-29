import { AvatarGroup, YStack, XStack, SizableText } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'
import { PEOPLE } from '../../lib/fixtures'

// Real persona portraits (R2) for the photo-avatar sections.
const PHOTO_TEAM = PEOPLE.map((p) => ({ uri: p.avatar, name: p.name }))

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

      <Section title="With real photos" hint="Self-hosted persona portraits">
        <YStack gap="$4">
          <AvatarGroup avatars={PHOTO_TEAM} max={4} size={44} overlap={14} />
          {/* Mixed: photos + an initials fallback for a member with no avatar. */}
          <AvatarGroup
            avatars={[...PHOTO_TEAM.slice(0, 3), { name: 'Taylor West', color: '$purple9' }]}
            max={4}
            size={44}
            overlap={14}
          />
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
