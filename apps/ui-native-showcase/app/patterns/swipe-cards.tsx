import { useState } from 'react'
import { Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {
  SwipeCards,
  YStack,
  XStack,
  SizableText,
  Button,
  RotateCcw,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'
import { SWIPE_PROFILES, type SwipeProfile } from '../../lib/fixtures'

// Full-bleed real photo + bottom gradient scrim + name/age/bio. The SDK card
// frame already clips to a rounded rect and ships heart/✕ tap buttons — those
// double as the web (no-touch) fallback for the drag gesture.
function ProfileCard({ profile, compact = false }: { profile: SwipeProfile; compact?: boolean }) {
  return (
    <YStack flex={1}>
      <Image
        source={{ uri: profile.image }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
        resizeMode="cover"
        accessibilityLabel={`${profile.name}, ${profile.age}`}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.10)', 'rgba(0,0,0,0.82)']}
        locations={[0, 0.5, 1]}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <YStack flex={1} justifyContent="flex-end" padding="$4" gap="$1.5">
        <XStack alignItems="flex-end" gap="$2">
          <SizableText size={compact ? '$8' : '$9'} fontWeight="800" color="white" letterSpacing={-0.5}>
            {profile.name}
          </SizableText>
          <SizableText size="$6" fontWeight="400" color="white" opacity={0.9} marginBottom={2}>
            {profile.age}
          </SizableText>
        </XStack>
        {!compact && (
          <SizableText size="$4" color="white" opacity={0.85}>
            {profile.bio}
          </SizableText>
        )}
      </YStack>
    </YStack>
  )
}

export default function SwipeCardsShowcase() {
  const [log, setLog] = useState<string[]>([])
  const [likes, setLikes] = useState(0)
  const [nopes, setNopes] = useState(0)
  // Bump to remount <SwipeCards> (its card index is internal) → full deck back.
  const [deckKey, setDeckKey] = useState(0)

  function reset() {
    setDeckKey((k) => k + 1)
    setLikes(0)
    setNopes(0)
    setLog([])
  }

  const swiped = likes + nopes
  const remaining = SWIPE_PROFILES.length - swiped

  return (
    <ShowcaseFrame
      title="Swipe Cards"
      description="Tinder-style stacked deck. Drag, or tap heart / ✕ to swipe — cards animate off-screen."
      docPath="packages/ui-native/src/patterns/SwipeCards.tsx"
    >
      <Section title="5-card deck" hint={log.length > 0 ? log[log.length - 1] : 'No swipes yet'}>
        <XStack justifyContent="center" alignItems="center" gap="$4" paddingBottom="$3" flexWrap="wrap">
          <YStack alignItems="center" backgroundColor="$red3" paddingHorizontal="$5" paddingVertical="$2" borderRadius="$4" minWidth={80}>
            <SizableText size="$7" fontWeight="800" color="$red10">{nopes}</SizableText>
            <SizableText size="$1" color="$red10">Nope</SizableText>
          </YStack>
          <YStack alignItems="center" backgroundColor="$green3" paddingHorizontal="$5" paddingVertical="$2" borderRadius="$4" minWidth={80}>
            <SizableText size="$7" fontWeight="800" color="$green10">{likes}</SizableText>
            <SizableText size="$1" color="$green10">Like</SizableText>
          </YStack>
          <YStack alignItems="center" backgroundColor="$color3" paddingHorizontal="$5" paddingVertical="$2" borderRadius="$4" minWidth={80}>
            <SizableText size="$7" fontWeight="800" color="$color11">{remaining}</SizableText>
            <SizableText size="$1" color="$color11">Left</SizableText>
          </YStack>
        </XStack>

        <XStack justifyContent="center" paddingBottom="$3">
          <Button size="$3" variant="outlined" onPress={reset} icon={<RotateCcw size={15} />}>
            Reset deck
          </Button>
        </XStack>

        <YStack height={520}>
          <SwipeCards
            key={deckKey}
            items={SWIPE_PROFILES}
            renderCard={(profile: SwipeProfile) => <ProfileCard profile={profile} />}
            onSwipeLeft={(p: SwipeProfile) => {
              setLog((l) => [...l, `Nope: ${p.name}`])
              setNopes((n) => n + 1)
            }}
            onSwipeRight={(p: SwipeProfile) => {
              setLog((l) => [...l, `Like: ${p.name}`])
              setLikes((n) => n + 1)
            }}
            onEmpty={() => setLog((l) => [...l, 'Out of cards'])}
          />
        </YStack>
      </Section>

      <Section title="Custom labels" hint="Skip / Save + custom empty message">
        <YStack height={440}>
          <SwipeCards
            items={SWIPE_PROFILES.slice(0, 3)}
            leftLabel="Skip"
            rightLabel="Save"
            emptyMessage="That's all for today"
            renderCard={(profile: SwipeProfile) => <ProfileCard profile={profile} compact />}
          />
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
