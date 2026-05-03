import { useState } from 'react'
import { Heart, Pressable, SizableText, XStack, YStack } from '@otf/ui-native'
import { Section, ShowcaseFrame } from '../../components/ShowcaseFrame'

export default function PressableShowcase() {
  const [count, setCount] = useState(0)
  const [liked, setLiked] = useState(false)

  return (
    <ShowcaseFrame
      title="Pressable"
      description="Bare-bones tappable surface — wraps Tamagui View with hitSlop, cursor, and a press-style opacity dim."
      docPath="packages/ui-native/src/interface/Pressable.tsx"
    >
      <Section title="Default press animation" hint={`Tapped ${count} times`}>
        <Pressable
          onPress={() => setCount((n) => n + 1)}
          padding="$4"
          borderRadius="$4"
          backgroundColor="$color3"
          borderWidth={1}
          borderColor="$borderColor"
          alignItems="center"
        >
          <SizableText size="$4" fontWeight="600" color="$color12">
            Tap me
          </SizableText>
          <SizableText size="$2" color="$color10">
            Watch the opacity drop on press
          </SizableText>
        </Pressable>
      </Section>

      <Section title="Heart toggle" hint={liked ? 'Liked' : 'Not liked'}>
        <Pressable
          onPress={() => setLiked((v) => !v)}
          padding="$3"
          borderRadius="$10"
          backgroundColor={liked ? '$red3' : '$color2'}
          alignSelf="flex-start"
        >
          <XStack alignItems="center" gap="$2">
            <Heart size={20} color={liked ? '$red10' : '$color10'} />
            <SizableText size="$3" color={liked ? '$red11' : '$color11'}>
              {liked ? 'Liked' : 'Like'}
            </SizableText>
          </XStack>
        </Pressable>
      </Section>

      <Section title="Disabled" hint="opacity 0.5, pointer-events off">
        <Pressable
          onPress={() => {}}
          disabled
          opacity={0.5}
          padding="$3"
          borderRadius="$3"
          backgroundColor="$color3"
          alignItems="center"
        >
          <SizableText size="$3" color="$color12">
            Disabled
          </SizableText>
        </Pressable>
      </Section>

      <Section title="Custom hitSlop" hint="Default is 10 — override per usage">
        <YStack gap="$2" alignItems="flex-start">
          <Pressable
            onPress={() => {}}
            hitSlop={20}
            padding="$2"
            borderRadius="$3"
            backgroundColor="$color3"
          >
            <SizableText size="$2" color="$color11">
              hitSlop = 20
            </SizableText>
          </Pressable>
          <Pressable
            onPress={() => {}}
            hitSlop={4}
            padding="$2"
            borderRadius="$3"
            backgroundColor="$color3"
          >
            <SizableText size="$2" color="$color11">
              hitSlop = 4
            </SizableText>
          </Pressable>
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
