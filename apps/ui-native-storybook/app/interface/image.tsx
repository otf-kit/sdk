import { Image, SizableText, XStack, YStack } from '@otf/ui-native'
import { Section, ShowcaseFrame } from '../../components/ShowcaseFrame'

const PORTRAIT = 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&q=70'
const LANDSCAPE =
  'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=600&q=70'
const SQUARE =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=70'

export default function ImageShowcase() {
  return (
    <ShowcaseFrame
      title="Image"
      description="Tamagui Image with the OtfImage style key — same source / size / resizeMode props on web and native."
      docPath="packages/ui-native/src/interface/Image.tsx"
    >
      <Section title="Sizes">
        <XStack gap="$3" alignItems="flex-end" flexWrap="wrap">
          {[40, 64, 96, 128].map((size) => (
            <YStack key={size} gap="$1" alignItems="center">
              <Image source={{ uri: SQUARE }} width={size} height={size} borderRadius={8} />
              <SizableText size="$1" color="$color10">
                {size}px
              </SizableText>
            </YStack>
          ))}
        </XStack>
      </Section>

      <Section title="Aspect ratios">
        <YStack gap="$3">
          <YStack gap="$1">
            <SizableText size="$2" color="$color10">16:9 landscape</SizableText>
            <Image
              source={{ uri: LANDSCAPE }}
              width="100%"
              aspectRatio={16 / 9}
              borderRadius={12}
            />
          </YStack>
          <YStack gap="$1">
            <SizableText size="$2" color="$color10">3:4 portrait</SizableText>
            <Image
              source={{ uri: PORTRAIT }}
              width={180}
              aspectRatio={3 / 4}
              borderRadius={12}
            />
          </YStack>
          <YStack gap="$1">
            <SizableText size="$2" color="$color10">1:1 square</SizableText>
            <Image
              source={{ uri: SQUARE }}
              width={120}
              aspectRatio={1}
              borderRadius={12}
            />
          </YStack>
        </YStack>
      </Section>

      <Section title="Rounded variants">
        <XStack gap="$3" alignItems="center" flexWrap="wrap">
          <Image source={{ uri: SQUARE }} width={72} height={72} borderRadius={0} />
          <Image source={{ uri: SQUARE }} width={72} height={72} borderRadius={8} />
          <Image source={{ uri: SQUARE }} width={72} height={72} borderRadius={16} />
          <Image source={{ uri: SQUARE }} width={72} height={72} borderRadius={9999} />
        </XStack>
      </Section>

      <Section title="Resize modes" hint="cover · contain · stretch">
        <XStack gap="$3" flexWrap="wrap">
          {(['cover', 'contain', 'stretch'] as const).map((mode) => (
            <YStack key={mode} gap="$1" alignItems="center">
              <Image
                source={{ uri: LANDSCAPE }}
                width={140}
                height={90}
                borderRadius={8}
                resizeMode={mode}
                backgroundColor="$color3"
              />
              <SizableText size="$1" color="$color10">{mode}</SizableText>
            </YStack>
          ))}
        </XStack>
      </Section>
    </ShowcaseFrame>
  )
}
