import { SepHeading, SizableText, SubHeading, YStack } from '@otfdashkit/ui-native'
import { Section, ShowcaseFrame } from '../../components/ShowcaseFrame'

export default function HeadingsShowcase() {
  return (
    <ShowcaseFrame
      title="Headings"
      description="SubHeading + SepHeading — secondary text + section dividers used across long-form pages."
      docPath="packages/ui-native/src/interface/Headings.tsx"
    >
      <Section title="SubHeading" hint="Muted lead-in text">
        <YStack gap="$1">
          <SizableText size="$8" fontWeight="700" color="$color12">
            Welcome back
          </SizableText>
          <SubHeading>
            Pick up where you left off — your draft autosaved 2 minutes ago.
          </SubHeading>
        </YStack>
      </Section>

      <Section title="SubHeading — overrides">
        <YStack gap="$3">
          <SubHeading>Default size $5 / weight 300</SubHeading>
          <SubHeading size="$6" fontWeight="500">
            Bumped to $6 with weight 500
          </SubHeading>
          <SubHeading color="$color12">
            Override color to full-contrast color12
          </SubHeading>
        </YStack>
      </Section>

      <Section title="SepHeading" hint="Section divider with rule">
        <YStack>
          <SepHeading>Account</SepHeading>
          <SizableText size="$3" color="$color11">
            Email, password, and recovery options.
          </SizableText>
          <SepHeading>Notifications</SepHeading>
          <SizableText size="$3" color="$color11">
            Push, email, and in-app channels.
          </SizableText>
          <SepHeading>Danger zone</SepHeading>
          <SizableText size="$3" color="$color11">
            Permanent and irreversible actions.
          </SizableText>
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
