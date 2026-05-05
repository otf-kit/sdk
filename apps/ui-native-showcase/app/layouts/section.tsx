import {
  Section as OtfSection,
  YStack,
  XStack,
  Card,
  SizableText,
  Button,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function SectionShowcase() {
  return (
    <ShowcaseFrame
      title="Section"
      description="Titled grouping of content with optional description. Used universally for screen sub-blocks."
      docPath="packages/ui-native/src/layouts/Section.tsx"
    >
      <Section title="Title only">
        <OtfSection title="Today's plan">
          <Card padded bordered>
            <SizableText size="$3">3 workouts queued</SizableText>
          </Card>
        </OtfSection>
      </Section>

      <Section title="Title + description">
        <OtfSection
          title="Devices"
          description="Sensors that have synced in the last 30 days."
        >
          <YStack gap="$2">
            <Card padded bordered>
              <SizableText size="$3">Apple Watch</SizableText>
            </Card>
            <Card padded bordered>
              <SizableText size="$3">Heart-rate monitor</SizableText>
            </Card>
          </YStack>
        </OtfSection>
      </Section>

      <Section title="Composed group">
        <OtfSection title="Notifications" description="Inline action lives outside Section's API — wrap in your own row.">
          <XStack alignItems="center" justifyContent="space-between" gap="$2">
            <SizableText size="$3" color="$color11">Push, email, sms</SizableText>
            <Button size="$2">Edit</Button>
          </XStack>
        </OtfSection>
      </Section>
    </ShowcaseFrame>
  )
}
