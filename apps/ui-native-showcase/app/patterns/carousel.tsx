import { Carousel, MediaCard, YStack, SizableText } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

const CARDS = [
  {
    image: 'https://images.unsplash.com/photo-1529693662653-9d480530a697?w=1000&q=80',
    title: 'Strength fundamentals',
    subtitle: 'A 4-week primer',
  },
  {
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1000&q=80',
    title: 'Trail running',
    subtitle: 'Starter pack',
  },
  {
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=1000&q=80',
    title: 'Mobility primer',
    subtitle: '20 minutes daily',
  },
]

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
        <SizableText size="$2" color="$color10">
          Use `snapToInterval = cardWidth + gapPx` for clean paging.
        </SizableText>
      </Section>
    </ShowcaseFrame>
  )
}
