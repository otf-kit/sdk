import { TestimonialCard, XStack, YStack } from '@otf/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

const SARAH = 'https://i.pravatar.cc/120?u=sarah-chen'
const ALEX = 'https://i.pravatar.cc/120?u=alex-rivera'
const JORDAN = 'https://i.pravatar.cc/120?u=jordan-kim'
const MAYA = 'https://i.pravatar.cc/120?u=maya-patel'
const DIEGO = 'https://i.pravatar.cc/120?u=diego-costa'

export default function TestimonialCardShowcase() {
  return (
    <ShowcaseFrame
      title="Testimonial Card"
      description="Quote with author + role + avatar. Three variants — card (default), minimal (inline), and featured (hero)."
      docPath="packages/ui-native/src/patterns/TestimonialCard.tsx"
    >
      <Section title="Card — bordered, rated">
        <TestimonialCard
          quote="It replaced three tools for us in the first week. We shipped the redesign two sprints early."
          author="Sarah Chen"
          role="Product Lead, Northbeam"
          avatar={SARAH}
          rating={5}
        />
      </Section>

      <Section title="Minimal — inline, no card chrome">
        <TestimonialCard
          variant="minimal"
          quote="Sane defaults, escape hatches when you need them, and the docs are actually good."
          author="Alex Rivera"
          role="Engineering Manager"
          avatar={ALEX}
          rating={5}
        />
      </Section>

      <Section title="Featured — hero treatment">
        <TestimonialCard
          variant="featured"
          quote="The fastest a tool has gone from trial to team-wide adoption since I joined."
          author="Jordan Kim"
          role="Head of Design, Coastline"
          avatar={JORDAN}
          rating={5}
        />
      </Section>

      <Section title="3 variants side-by-side" hint="Mock landing strip">
        <YStack gap="$3">
          <TestimonialCard
            quote="Onboarding took ten minutes. Migration took an afternoon."
            author="Maya Patel"
            role="Founder"
            avatar={MAYA}
            rating={4}
          />
          <TestimonialCard
            quote="Feels designed for teams, not solo tinkerers. That's rare."
            author="Diego Costa"
            role="Staff Engineer"
            avatar={DIEGO}
            rating={5}
          />
          <XStack gap="$3" flexWrap="wrap">
            <YStack flex={1} minWidth={260}>
              <TestimonialCard
                variant="minimal"
                quote="Our weekly demo cut from 40 minutes to 15."
                author="Sarah Chen"
                avatar={SARAH}
                rating={5}
              />
            </YStack>
            <YStack flex={1} minWidth={260}>
              <TestimonialCard
                variant="minimal"
                quote="The kind of foundation you wish you'd started with."
                author="Alex Rivera"
                avatar={ALEX}
                rating={4}
              />
            </YStack>
          </XStack>
        </YStack>
      </Section>

      <Section title="No avatar — text only">
        <TestimonialCard
          quote="Production-grade out of the box. We barely had to touch the defaults."
          author="Maya Patel"
          role="VP Engineering"
          rating={5}
        />
      </Section>
    </ShowcaseFrame>
  )
}
