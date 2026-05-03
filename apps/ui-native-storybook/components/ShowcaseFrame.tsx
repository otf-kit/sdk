import type { ReactNode } from 'react'
import { Platform } from 'react-native'
import {
  YStack,
  XStack,
  H2,
  SizableText,
  ScrollView,
  Separator,
  useMedia,
} from '@otf/ui-native'

interface ShowcaseFrameProps {
  title: string
  description?: string
  // Path to the design-references brief / PATTERNS.md doc for this primitive.
  // Rendered as muted footer text. Optional.
  docPath?: string
  children: ReactNode
}

// Consistent wrapper for every showcase entry.
// Renders a header (title + description), scrollable padded body, optional
// docs footer link. The Section helper below is the building block every
// entry uses to group prop variants.
export function ShowcaseFrame({ title, description, docPath, children }: ShowcaseFrameProps) {
  const media = useMedia()
  const horizontalPadding = media.gtSm ? '$6' : '$4'
  const maxWidth = 880

  return (
    <ScrollView flex={1} backgroundColor="$background" contentContainerStyle={{ paddingBottom: 80 }}>
      <YStack
        paddingHorizontal={horizontalPadding}
        paddingTop="$5"
        paddingBottom="$3"
        maxWidth={maxWidth}
        width="100%"
        alignSelf="center"
        gap="$2"
      >
        <H2 size="$10" fontWeight="800" letterSpacing={-0.6}>
          {title}
        </H2>
        {description ? (
          <SizableText size="$5" color="$color11" maxWidth={640}>
            {description}
          </SizableText>
        ) : null}
      </YStack>
      <Separator marginTop="$4" />
      <YStack
        paddingHorizontal={horizontalPadding}
        paddingVertical="$5"
        maxWidth={maxWidth}
        width="100%"
        alignSelf="center"
        gap="$6"
      >
        {children}
        {docPath ? (
          <YStack paddingTop="$4" borderTopWidth={1} borderTopColor="$borderColor">
            <SizableText size="$2" color="$color10">
              Reference: <SizableText size="$2" color="$color12">{docPath}</SizableText>
            </SizableText>
          </YStack>
        ) : null}
      </YStack>
    </ScrollView>
  )
}

interface SectionProps {
  title: string
  hint?: string
  children: ReactNode
}

// Titled grouping inside a ShowcaseFrame body. One per prop axis:
// "Variants", "Sizes", "Selected state", "With remove", etc.
export function Section({ title, hint, children }: SectionProps) {
  return (
    <YStack gap="$3">
      <YStack gap="$1">
        <XStack alignItems="baseline" justifyContent="space-between" gap="$3">
          <SizableText size="$5" fontWeight="600" color="$color12">
            {title}
          </SizableText>
          {hint ? (
            <SizableText size="$2" color="$color10">
              {hint}
            </SizableText>
          ) : null}
        </XStack>
        <Separator />
      </YStack>
      <YStack
        padding="$4"
        borderRadius="$4"
        borderWidth={1}
        borderColor="$borderColor"
        backgroundColor="$backgroundHover"
        gap="$3"
        // Web: subtle inner glow to lift the demo surface above the page bg.
        {...(Platform.OS === 'web'
          ? { style: { boxShadow: '0 1px 0 rgba(255,255,255,0.02) inset' } }
          : {})}
      >
        {children}
      </YStack>
    </YStack>
  )
}

interface ComingSoonProps {
  title?: string
  body?: string
}

// Drop-in for primitives that haven't been built yet (MultiStep, Selectable,
// AnimatedView, Expandable). Keeps the route browsable so the sidebar stays
// a complete map of where the SDK is headed.
export function ComingSoon({
  title = 'Coming in Wave 1',
  body = 'This primitive is on the mobile flow primitives milestone backlog. See the PRD for shape + acceptance.',
}: ComingSoonProps) {
  return (
    <YStack
      padding="$6"
      borderRadius="$5"
      borderWidth={1}
      borderColor="$borderColor"
      backgroundColor="$backgroundHover"
      alignItems="center"
      justifyContent="center"
      gap="$2"
      minHeight={220}
    >
      <SizableText size="$6" fontWeight="700" color="$color12">
        {title}
      </SizableText>
      <SizableText size="$3" color="$color10" textAlign="center" maxWidth={420}>
        {body}
      </SizableText>
    </YStack>
  )
}
