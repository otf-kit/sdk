import { OtfAccordion, SizableText, YStack } from '@otf/ui-native'
import { Section, ShowcaseFrame } from '../../components/ShowcaseFrame'

const FAQ_ITEMS = [
  {
    id: 'install',
    title: 'How do I install @otf/ui-native?',
    content: (
      <SizableText size="$3" color="$color11">
        Run <SizableText fontFamily="$mono">bun add @otf/ui-native</SizableText> at any
        Expo or Next.js workspace. The package ships pre-bundled tokens and
        themes — no extra setup beyond wrapping your app in OtfProvider.
      </SizableText>
    ),
  },
  {
    id: 'theme',
    title: 'Can I theme it?',
    content: (
      <SizableText size="$3" color="$color11">
        Yes — pass any of the 16 design themes via the `theme` prop on
        OtfProvider, or build your own with createTheme.
      </SizableText>
    ),
  },
  {
    id: 'web',
    title: 'Does it work on web?',
    content: (
      <SizableText size="$3" color="$color11">
        Every primitive is web-compatible out of the box. Native-only patterns
        (BottomSheet, SwipeableRow) gracefully degrade to web equivalents.
      </SizableText>
    ),
  },
] as const

const SETTINGS_ITEMS = [
  {
    id: 'notif',
    title: 'Notifications',
    content: (
      <SizableText size="$3" color="$color11">
        Push, email, and in-app notification preferences live here.
      </SizableText>
    ),
  },
  {
    id: 'privacy',
    title: 'Privacy',
    content: (
      <SizableText size="$3" color="$color11">
        Control who can see your activity and message you.
      </SizableText>
    ),
  },
  {
    id: 'billing',
    title: 'Billing',
    content: (
      <SizableText size="$3" color="$color11">
        Update your card on file and view past invoices.
      </SizableText>
    ),
  },
] as const

export default function AccordionShowcase() {
  return (
    <ShowcaseFrame
      title="Accordion"
      description="Expand/collapse list of disclosure rows. Single-open by default — pass allowMultiple to keep multiple panels open."
      docPath="packages/ui-native/src/interface/OtfAccordion.tsx"
    >
      <Section title="Single open" hint="Default behaviour">
        <YStack>
          <OtfAccordion items={[...FAQ_ITEMS]} defaultOpen={['install']} />
        </YStack>
      </Section>

      <Section title="Allow multiple" hint="allowMultiple">
        <YStack>
          <OtfAccordion
            items={[...SETTINGS_ITEMS]}
            allowMultiple
            defaultOpen={['notif', 'privacy']}
          />
        </YStack>
      </Section>

      <Section title="All collapsed by default">
        <YStack>
          <OtfAccordion items={[...FAQ_ITEMS]} />
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
