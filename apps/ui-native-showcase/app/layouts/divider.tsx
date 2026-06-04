import { Divider, SizableText, YStack, XStack } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function DividerShowcase() {
  return (
    <ShowcaseFrame
      title="Divider"
      description="Hairline separator with optional inline label — used to break up sections, group settings, or mark an OR-divider in auth flows."
      docPath="packages/ui-native/src/layouts/Divider.tsx"
    >
      <Section title="Plain">
        <YStack gap="$3">
          <SizableText size="$3" color="$color12">Account</SizableText>
          <Divider />
          <SizableText size="$3" color="$color12">Notifications</SizableText>
          <Divider />
          <SizableText size="$3" color="$color12">Privacy</SizableText>
        </YStack>
      </Section>

      <Section title="With label" hint="Common in OR-divider auth flows">
        <YStack gap="$4">
          <Divider label="OR" />
          <Divider label="Continue with email" />
          <Divider label="More options" />
        </YStack>
      </Section>

      <Section title="Between content blocks">
        <YStack gap="$3">
          <YStack gap="$1">
            <SizableText size="$5" fontWeight="600">Personal info</SizableText>
            <SizableText size="$2" color="$color11">Name, email, profile photo.</SizableText>
          </YStack>
          <Divider />
          <YStack gap="$1">
            <SizableText size="$5" fontWeight="600">Billing</SizableText>
            <SizableText size="$2" color="$color11">Plan, payment method, invoices.</SizableText>
          </YStack>
          <Divider />
          <YStack gap="$1">
            <SizableText size="$5" fontWeight="600">Danger zone</SizableText>
            <SizableText size="$2" color="$color11">Delete account, export data.</SizableText>
          </YStack>
        </YStack>
      </Section>

      <Section title="Inline labelled stack">
        <YStack gap="$3">
          <XStack gap="$2" alignItems="center">
            <SizableText size="$3" color="$color12">Recent</SizableText>
          </XStack>
          <Divider label="Today" />
          <SizableText size="$3" color="$color11">Reviewed weekly metrics</SizableText>
          <SizableText size="$3" color="$color11">Pushed v2.4 to staging</SizableText>
          <Divider label="Yesterday" />
          <SizableText size="$3" color="$color11">Scoped Q3 roadmap</SizableText>
          <SizableText size="$3" color="$color11">Closed onboarding tickets</SizableText>
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
