import { SafeArea, YStack, SizableText } from '@otf/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

// Each demo wraps SafeArea in a fixed-size box so the inset shows up. The
// shaded inner block is the actual content; the outer container is the
// "screen" boundary so you can see how much space SafeArea reserves on each
// edge.

function ScreenFrame({ children }: { children: React.ReactNode }) {
  return (
    <YStack
      height={220}
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      backgroundColor="$color3"
      overflow="hidden"
    >
      {children}
    </YStack>
  )
}

function ContentBlock({ label }: { label: string }) {
  return (
    <YStack
      flex={1}
      borderRadius="$3"
      backgroundColor="$color5"
      alignItems="center"
      justifyContent="center"
    >
      <SizableText size="$3" fontWeight="600" color="$color12">{label}</SizableText>
    </YStack>
  )
}

export default function SafeAreaShowcase() {
  return (
    <ShowcaseFrame
      title="Safe Area"
      description="Edge-aware padding wrapper. Reserves space on the requested edges so content avoids the status bar, home indicator, and gesture areas. The shaded outer band is the inset; the inner block is your content."
      docPath="packages/ui-native/src/layouts/SafeArea.tsx"
    >
      <Section title="Default" hint="edges = ['top', 'bottom']">
        <ScreenFrame>
          <SafeArea>
            <ContentBlock label="top + bottom inset" />
          </SafeArea>
        </ScreenFrame>
      </Section>

      <Section title="Top only">
        <ScreenFrame>
          <SafeArea edges={['top']}>
            <ContentBlock label="top inset only" />
          </SafeArea>
        </ScreenFrame>
      </Section>

      <Section title="Bottom only">
        <ScreenFrame>
          <SafeArea edges={['bottom']}>
            <ContentBlock label="bottom inset only" />
          </SafeArea>
        </ScreenFrame>
      </Section>

      <Section title="All edges" hint="Modal-style padding">
        <ScreenFrame>
          <SafeArea edges={['top', 'bottom', 'left', 'right']}>
            <ContentBlock label="all four insets" />
          </SafeArea>
        </ScreenFrame>
      </Section>

      <Section title="Horizontal only" hint="edges = ['left', 'right']">
        <ScreenFrame>
          <SafeArea edges={['left', 'right']}>
            <ContentBlock label="left + right inset" />
          </SafeArea>
        </ScreenFrame>
      </Section>
    </ShowcaseFrame>
  )
}
