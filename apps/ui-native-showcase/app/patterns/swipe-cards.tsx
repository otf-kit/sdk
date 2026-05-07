import { useState } from 'react'
import { SwipeCards, YStack, XStack, SizableText } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

type Profile = {
  id: string
  name: string
  age: number
  bio: string
  emoji: string
  // Solid hex colors (not Tamagui theme tokens) so the card has a vibrant
  // background regardless of the active theme. Theme tokens like $blue7
  // render very dim in dark themes and make the card look empty.
  color: string
}

const PROFILES: Profile[] = [
  { id: '1', name: 'Sarah Chen',  age: 28, bio: 'Climbs rocks, codes Rust.',           emoji: '🧗‍♀️', color: '#0D9488' }, // teal
  { id: '2', name: 'Alex Rivera', age: 31, bio: 'Indie filmmaker + dad joke connoisseur.', emoji: '🎬', color: '#F97316' }, // orange
  { id: '3', name: 'Jordan Kim',  age: 26, bio: 'Late-night hacker, espresso enthusiast.',  emoji: '☕️', color: '#7C3AED' }, // purple
  { id: '4', name: 'Maya Patel',  age: 29, bio: 'Designer building tiny synths.',          emoji: '🎹', color: '#10B981' }, // emerald
  { id: '5', name: 'Diego Costa', age: 33, bio: 'Trail runner, weekend ceramicist.',       emoji: '🏃‍♂️', color: '#EF4444' }, // red
]

export default function SwipeCardsShowcase() {
  const [log, setLog] = useState<string[]>([])
  const [likes, setLikes] = useState(0)
  const [nopes, setNopes] = useState(0)

  return (
    <ShowcaseFrame
      title="Swipe Cards"
      description="Tinder-style stacked deck. Tap heart or X to swipe; cards animate off-screen."
      docPath="packages/ui-native/src/patterns/SwipeCards.tsx"
    >
      <Section title="5-card deck" hint={log.length > 0 ? log[log.length - 1] : 'No swipes yet'}>
        <XStack justifyContent="center" gap="$5" paddingBottom="$3">
          <YStack alignItems="center" backgroundColor="$red3" paddingHorizontal="$5" paddingVertical="$2" borderRadius="$4" minWidth={80}>
            <SizableText size="$7" fontWeight="800" color="$red10">{nopes}</SizableText>
            <SizableText size="$1" color="$red10">Nope</SizableText>
          </YStack>
          <YStack alignItems="center" backgroundColor="$green3" paddingHorizontal="$5" paddingVertical="$2" borderRadius="$4" minWidth={80}>
            <SizableText size="$7" fontWeight="800" color="$green10">{likes}</SizableText>
            <SizableText size="$1" color="$green10">Like</SizableText>
          </YStack>
        </XStack>

        <YStack height={520}>
          <SwipeCards
            items={PROFILES}
            renderCard={(profile: Profile) => (
              <YStack flex={1} backgroundColor={profile.color} alignItems="center" justifyContent="center" gap="$4" padding="$5">
                <SizableText size="$16" lineHeight={88}>{profile.emoji}</SizableText>
                <YStack alignItems="center" gap="$2">
                  <SizableText size="$9" fontWeight="800" color="white">
                    {profile.name}, {profile.age}
                  </SizableText>
                  <SizableText size="$4" color="white" opacity={0.85} textAlign="center">
                    {profile.bio}
                  </SizableText>
                </YStack>
              </YStack>
            )}
            onSwipeLeft={(p: Profile) => {
              setLog((l) => [...l, `Nope: ${p.name}`])
              setNopes((n) => n + 1)
            }}
            onSwipeRight={(p: Profile) => {
              setLog((l) => [...l, `Like: ${p.name}`])
              setLikes((n) => n + 1)
            }}
            onEmpty={() => setLog((l) => [...l, 'Out of cards'])}
          />
        </YStack>
      </Section>

      <Section title="Custom labels">
        <YStack height={420}>
          <SwipeCards
            items={PROFILES.slice(0, 3)}
            leftLabel="Skip"
            rightLabel="Save"
            emptyMessage="That's all for today"
            renderCard={(profile: Profile) => (
              <YStack flex={1} backgroundColor={profile.color} alignItems="center" justifyContent="center" gap="$3">
                <SizableText size="$15" lineHeight={80}>{profile.emoji}</SizableText>
                <SizableText size="$8" fontWeight="800" color="white">
                  {profile.name}
                </SizableText>
              </YStack>
            )}
          />
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
