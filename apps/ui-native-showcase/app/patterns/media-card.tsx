import { MediaCard, XStack, YStack } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

const COVER_1 = 'https://images.unsplash.com/photo-1529693662653-9d480530a697?w=1200&q=80'
const COVER_2 = 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80'
const COVER_3 = 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&q=80'
const COVER_4 = 'https://images.unsplash.com/photo-1502810190503-8303352d0dd1?w=1200&q=80'

export default function MediaCardShowcase() {
  return (
    <ShowcaseFrame
      title="Media Card"
      description="Edge-to-edge image with a gradient-overlaid title block. Used for editorial grids, hero rows, and content tiles."
      docPath="packages/ui-native/src/patterns/MediaCard.tsx"
    >
      <Section title="Default — gradient overlay, 16:9">
        <YStack>
          <MediaCard
            image={COVER_1}
            title="The new fundamentals of strength"
            subtitle="A 4-week primer for hybrid athletes"
          />
        </YStack>
      </Section>

      <Section title="With badge">
        <YStack>
          <MediaCard
            image={COVER_2}
            title="Trail running starter pack"
            subtitle="Curated by Sarah Chen"
            badge="NEW"
          />
        </YStack>
      </Section>

      <Section title="Two sizes — 16:9 vs 1:1" hint="aspectRatio prop">
        <XStack gap="$3" flexWrap="wrap">
          <YStack flex={1} minWidth={240}>
            <MediaCard
              image={COVER_3}
              title="Mobility primer"
              subtitle="20 minutes, daily"
              aspectRatio={16 / 9}
            />
          </YStack>
          <YStack flex={1} minWidth={240}>
            <MediaCard
              image={COVER_4}
              title="Recovery sessions"
              subtitle="Wind down, sleep deeper"
              aspectRatio={1}
            />
          </YStack>
        </XStack>
      </Section>

      <Section title="Dark overlay">
        <MediaCard
          image={COVER_1}
          title="Long-form interviews"
          subtitle="With Alex Rivera + Jordan Kim"
          overlay="dark"
        />
      </Section>

      <Section title="No overlay — title sits on raw image">
        <MediaCard
          image={COVER_2}
          title="Field notes"
          overlay="none"
        />
      </Section>
    </ShowcaseFrame>
  )
}
