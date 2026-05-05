import {
  Card,
  YStack,
  XStack,
  H4,
  Paragraph,
  Button,
  SizableText,
  Heart,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function CardShowcase() {
  return (
    <ShowcaseFrame
      title="Card"
      description="Surface container — used to group related content with elevation, padding, and a subtle border."
      docPath="packages/ui-native/src/primitives/Card.tsx"
    >
      <Section title="Default">
        <Card padded bordered>
          <Card.Header>
            <H4>Featured workout</H4>
            <Paragraph theme="alt2" size="$2">
              Pyramid intervals · 32 min
            </Paragraph>
          </Card.Header>
          <Card.Footer padded>
            <XStack flex={1} />
            <Button size="$3">Start</Button>
          </Card.Footer>
        </Card>
      </Section>

      <Section title="Sizes">
        <YStack gap="$3">
          <Card padded bordered size="$2">
            <SizableText size="$3" fontWeight="600">Compact card</SizableText>
            <SizableText size="$2" color="$color10">Tight padding for dense lists.</SizableText>
          </Card>
          <Card padded bordered size="$4">
            <SizableText size="$5" fontWeight="600">Standard card</SizableText>
            <SizableText size="$3" color="$color10">Default padding for content rows.</SizableText>
          </Card>
          <Card padded bordered size="$6">
            <SizableText size="$7" fontWeight="700">Hero card</SizableText>
            <SizableText size="$4" color="$color10">Generous padding for landing-page tiles.</SizableText>
          </Card>
        </YStack>
      </Section>

      <Section title="Elevation">
        <XStack gap="$3" flexWrap="wrap">
          <Card padded bordered elevate flex={1} minWidth={200}>
            <SizableText size="$4" fontWeight="600">Elevated</SizableText>
            <SizableText size="$2" color="$color10">Subtle shadow lift.</SizableText>
          </Card>
          <Card padded bordered flex={1} minWidth={200}>
            <SizableText size="$4" fontWeight="600">Flat</SizableText>
            <SizableText size="$2" color="$color10">Border only — no shadow.</SizableText>
          </Card>
        </XStack>
      </Section>

      <Section title="With trailing action">
        <Card padded bordered>
          <XStack alignItems="center" gap="$3">
            <YStack flex={1}>
              <H4>Daily streak</H4>
              <Paragraph theme="alt2" size="$2">14 days</Paragraph>
            </YStack>
            <Button icon={Heart} size="$3" circular accessibilityLabel="Save streak" />
          </XStack>
        </Card>
      </Section>
    </ShowcaseFrame>
  )
}
