import { GlassCard, YStack, XStack, SizableText, H4 } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

function ColorBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <YStack
      borderRadius="$4"
      overflow="hidden"
      padding="$5"
      minHeight={180}
      // Vibrant gradient backdrop so the frosted glass effect is visible.
      style={{
        background:
          'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #6366f1 100%)',
      }}
    >
      {children}
    </YStack>
  )
}

export default function GlassCardShowcase() {
  return (
    <ShowcaseFrame
      title="Glass Card"
      description="Frosted-glass surface — backdrop-filter blur over a colorful background. Multiple intensities and tints."
      docPath="packages/ui-native/src/patterns/GlassCard.tsx"
    >
      <Section title="Intensities" hint="light · medium · heavy blur">
        <ColorBackdrop>
          <YStack gap="$3">
            <GlassCard intensity="light">
              <H4 color="white">Light blur</H4>
              <SizableText size="$3" color="white" opacity={0.85}>
                Subtle frost — backdrop reads through clearly.
              </SizableText>
            </GlassCard>
            <GlassCard intensity="medium">
              <H4 color="white">Medium blur</H4>
              <SizableText size="$3" color="white" opacity={0.85}>
                Default. Balances depth with legibility.
              </SizableText>
            </GlassCard>
            <GlassCard intensity="heavy">
              <H4 color="white">Heavy blur</H4>
              <SizableText size="$3" color="white" opacity={0.85}>
                Strong frost — content sits firmly on top.
              </SizableText>
            </GlassCard>
          </YStack>
        </ColorBackdrop>
      </Section>

      <Section title="Tints" hint="light · dark">
        <ColorBackdrop>
          <XStack gap="$3" flexWrap="wrap">
            <GlassCard tint="light" padding="$4">
              <SizableText fontWeight="700" color="white">Light tint</SizableText>
              <SizableText size="$2" color="white" opacity={0.85}>
                White wash on color.
              </SizableText>
            </GlassCard>
            <GlassCard tint="dark" padding="$4">
              <SizableText fontWeight="700" color="white">Dark tint</SizableText>
              <SizableText size="$2" color="white" opacity={0.85}>
                Black wash, deeper feel.
              </SizableText>
            </GlassCard>
          </XStack>
        </ColorBackdrop>
      </Section>

      <Section title="Elevated">
        <ColorBackdrop>
          <GlassCard intensity="medium" elevated padding="$5">
            <H4 color="white">Floating glass</H4>
            <SizableText size="$3" color="white" opacity={0.85}>
              Shadow lifts the card off the surface.
            </SizableText>
          </GlassCard>
        </ColorBackdrop>
      </Section>

      <Section title="Custom radius">
        <ColorBackdrop>
          <YStack gap="$3">
            <GlassCard borderRadius={4}>
              <SizableText color="white">Sharp corners (4px)</SizableText>
            </GlassCard>
            <GlassCard borderRadius={28}>
              <SizableText color="white">Pillow corners (28px)</SizableText>
            </GlassCard>
          </YStack>
        </ColorBackdrop>
      </Section>
    </ShowcaseFrame>
  )
}
