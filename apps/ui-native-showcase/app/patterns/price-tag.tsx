import { PriceTag, YStack } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function PriceTagShowcase() {
  return (
    <ShowcaseFrame
      title="Price Tag"
      description="Formatted currency price with an optional compare-at strikethrough and discount pill. Amounts are minor units (cents) so there's no float drift."
      docPath="packages/ui-native/src/patterns/PriceTag.tsx"
    >
      <Section title="Default">
        <PriceTag amount={1800} />
      </Section>
      <Section title="On sale — compare-at + discount pill">
        <PriceTag amount={1800} compareAt={2400} />
      </Section>
      <Section title="Sizes">
        <YStack gap="$3" alignItems="flex-start">
          <PriceTag amount={1800} compareAt={2400} size="sm" />
          <PriceTag amount={1800} compareAt={2400} size="md" />
          <PriceTag amount={1800} compareAt={2400} size="lg" />
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
