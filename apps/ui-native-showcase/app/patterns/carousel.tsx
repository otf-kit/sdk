import { Carousel, MediaCard, YStack, SizableText } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'
import { SCENES } from '../../lib/fixtures'

// Real, self-hosted editorial scenes (R2) — the carousel reuses the scene set.
const CARDS = SCENES.slice(0, 5).map((s) => ({
  image: s.image,
  title: s.title,
  subtitle: s.subtitle,
}))

const CARD_WIDTH = 280
const CARD_GAP = 12

export default function CarouselShowcase() {
  return (
    <ShowcaseFrame
      title="Carousel"
      description="Horizontal snap-scroller with optional paged indicators. Best for editorial rows, onboarding, and hero discovery."
      docPath="packages/ui-native/src/patterns/Carousel.tsx"
    >
      <Section title="3-card paged carousel" hint="Indicators on">
        <YStack marginHorizontal="$-4">
          <Carousel showIndicators snapToInterval={CARD_WIDTH + CARD_GAP}>
            {CARDS.map((c) => (
              <YStack key={c.title} width={CARD_WIDTH}>
                <MediaCard image={c.image} title={c.title} subtitle={c.subtitle} />
              </YStack>
            ))}
          </Carousel>
        </YStack>
      </Section>

      <Section title="No indicators — free scroll">
        <YStack marginHorizontal="$-4">
          <Carousel>
            {CARDS.map((c) => (
              <YStack key={c.title} width={220}>
                <MediaCard image={c.image} title={c.title} aspectRatio={1} />
              </YStack>
            ))}
          </Carousel>
        </YStack>
      </Section>

      <Section title="Tighter gap — `$2`">
        <YStack marginHorizontal="$-4">
          <Carousel gap="$2" showIndicators snapToInterval={200 + 8}>
            {CARDS.map((c) => (
              <YStack key={c.title} width={200}>
                <MediaCard image={c.image} title={c.title} aspectRatio={1} />
              </YStack>
            ))}
          </Carousel>
        </YStack>
        <SizableText size="$2" color="$color11">
          Use `snapToInterval = cardWidth + gapPx` for clean paging.
        </SizableText>
      </Section>
    </ShowcaseFrame>
  )
}
