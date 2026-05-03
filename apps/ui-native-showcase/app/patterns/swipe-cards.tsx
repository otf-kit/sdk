import { useState } from 'react'
import { SwipeCards, YStack, SizableText } from '@otf/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

type Profile = {
  id: string
  name: string
  age: number
  bio: string
  color: string
}

const PROFILES: Profile[] = [
  { id: '1', name: 'Sarah Chen', age: 28, bio: 'Climbs rocks, codes Rust.', color: '$blue7' },
  { id: '2', name: 'Alex Rivera', age: 31, bio: 'Indie filmmaker + dad joke connoisseur.', color: '$green7' },
  { id: '3', name: 'Jordan Kim', age: 26, bio: 'Late-night hacker, espresso enthusiast.', color: '$orange7' },
  { id: '4', name: 'Maya Patel', age: 29, bio: 'Designer building tiny synths.', color: '$purple7' },
  { id: '5', name: 'Diego Costa', age: 33, bio: 'Trail runner, weekend ceramicist.', color: '$red7' },
]

export default function SwipeCardsShowcase() {
  const [log, setLog] = useState<string[]>([])

  return (
    <ShowcaseFrame
      title="Swipe Cards"
      description="Tinder-style stacked deck. Tap heart or X to swipe; cards animate off-screen."
      docPath="packages/ui-native/src/patterns/SwipeCards.tsx"
    >
      <Section title="5-card deck" hint={log.length > 0 ? log[log.length - 1] : 'No swipes yet'}>
        <YStack height={520}>
          <SwipeCards
            items={PROFILES}
            renderCard={(profile: Profile) => (
              <YStack flex={1} backgroundColor={profile.color} padding="$5" justifyContent="flex-end">
                <YStack gap="$2">
                  <SizableText size="$8" fontWeight="800" color="$color1">
                    {profile.name}, {profile.age}
                  </SizableText>
                  <SizableText size="$4" color="$color1" opacity={0.9}>
                    {profile.bio}
                  </SizableText>
                </YStack>
              </YStack>
            )}
            onSwipeLeft={(p: Profile) => setLog((l) => [...l, `Nope: ${p.name}`])}
            onSwipeRight={(p: Profile) => setLog((l) => [...l, `Like: ${p.name}`])}
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
              <YStack flex={1} backgroundColor={profile.color} padding="$5" justifyContent="flex-end">
                <SizableText size="$7" fontWeight="800" color="$color1">
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
