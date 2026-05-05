import {
  ScreenLayout,
  ScrollView,
  YStack,
  XStack,
  SizableText,
  OtfButton,
  Separator,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

// Wraps a ScreenLayout in a fixed-height, bordered frame so its variants
// (padded, centered, safe) read against the showcase background.

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <YStack
      height={400}
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      overflow="hidden"
    >
      {children}
    </YStack>
  )
}

const items = [
  { id: 'i1', title: 'Activity summary', meta: 'Updated 2 min ago' },
  { id: 'i2', title: 'Weekly goals', meta: '4 of 6 complete' },
  { id: 'i3', title: 'Pinned reminders', meta: '3 active' },
  { id: 'i4', title: 'Insights', meta: 'New report available' },
  { id: 'i5', title: 'Saved drafts', meta: '2 in progress' },
  { id: 'i6', title: 'Archive', meta: '128 items' },
]

export default function ScreenLayoutShowcase() {
  return (
    <ShowcaseFrame
      title="Screen Layout"
      description="Root container for a screen — provides background, optional padding, centering, and safe-area top inset via variants. Compose with a header, scrollable body, and a CTA footer."
      docPath="packages/ui-native/src/layouts/ScreenLayout.tsx"
    >
      <Section title="Header + scroll + footer" hint="Most common screen shape">
        <Frame>
          <ScreenLayout>
            <XStack
              padding="$4"
              alignItems="center"
              justifyContent="space-between"
              borderBottomWidth={1}
              borderBottomColor="$borderColor"
            >
              <SizableText size="$6" fontWeight="700">Inbox</SizableText>
              <SizableText size="$2" color="$color10">{items.length} items</SizableText>
            </XStack>
            <ScrollView flex={1}>
              <YStack padding="$4" gap="$3">
                {items.map((it, i) => (
                  <YStack key={it.id} gap="$2">
                    <YStack gap="$1">
                      <SizableText size="$4" fontWeight="600">{it.title}</SizableText>
                      <SizableText size="$2" color="$color10">{it.meta}</SizableText>
                    </YStack>
                    {i < items.length - 1 && <Separator />}
                  </YStack>
                ))}
              </YStack>
            </ScrollView>
            <XStack
              padding="$4"
              borderTopWidth={1}
              borderTopColor="$borderColor"
              backgroundColor="$background"
            >
              <OtfButton flex={1} onPress={() => {}}>New message</OtfButton>
            </XStack>
          </ScreenLayout>
        </Frame>
      </Section>

      <Section title="Padded" hint="padded variant adds $4 inset">
        <Frame>
          <ScreenLayout padded>
            <YStack gap="$2">
              <SizableText size="$6" fontWeight="700">Settings</SizableText>
              <SizableText size="$3" color="$color10">
                Padding is applied uniformly so simple stacks sit comfortably without manual insets.
              </SizableText>
            </YStack>
          </ScreenLayout>
        </Frame>
      </Section>

      <Section title="Centered" hint="Empty / loading / paywall states">
        <Frame>
          <ScreenLayout centered padded>
            <YStack gap="$2" alignItems="center" maxWidth={280}>
              <SizableText size="$7" fontWeight="800">All caught up</SizableText>
              <SizableText size="$3" color="$color10" textAlign="center">
                You have no new notifications. Anything new will appear here.
              </SizableText>
              <OtfButton marginTop="$3" onPress={() => {}}>Refresh</OtfButton>
            </YStack>
          </ScreenLayout>
        </Frame>
      </Section>

      <Section title="Safe — top inset" hint="safe variant reserves $6 at top">
        <Frame>
          <ScreenLayout safe padded>
            <SizableText size="$6" fontWeight="700">Profile</SizableText>
            <SizableText size="$3" color="$color10">
              The safe variant pushes content below the status bar on devices without explicit safe-area context.
            </SizableText>
          </ScreenLayout>
        </Frame>
      </Section>
    </ShowcaseFrame>
  )
}
