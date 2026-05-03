import {
  YStack,
  XStack,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Paragraph,
  SizableText,
  Text,
} from '@otf/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function TextShowcase() {
  return (
    <ShowcaseFrame
      title="Text"
      description="Headings, body, and sized text — all on the shared font ramp."
      docPath="packages/ui-native/src/primitives/Text.tsx"
    >
      <Section title="Heading ramp">
        <YStack gap="$2">
          <H1>H1 — display</H1>
          <H2>H2 — title</H2>
          <H3>H3 — section</H3>
          <H4>H4 — subsection</H4>
          <H5>H5 — micro-heading</H5>
          <H6>H6 — eyebrow</H6>
        </YStack>
      </Section>

      <Section title="Body">
        <YStack gap="$2">
          <Paragraph>
            The quick brown fox jumps over the lazy dog. Body paragraph
            renders at the body font with comfortable line-height for
            scanning a few sentences at a time.
          </Paragraph>
          <Paragraph theme="alt1">
            An alternate-themed paragraph for callouts.
          </Paragraph>
        </YStack>
      </Section>

      <Section title="SizableText scale">
        <YStack gap="$1">
          {(['$1', '$2', '$3', '$4', '$5', '$6', '$7', '$8'] as const).map((size) => (
            <SizableText key={size} size={size}>
              SizableText {size} — the quick brown fox
            </SizableText>
          ))}
        </YStack>
      </Section>

      <Section title="Weight">
        <XStack gap="$3" flexWrap="wrap" alignItems="baseline">
          <Text fontWeight="400">Regular</Text>
          <Text fontWeight="500">Medium</Text>
          <Text fontWeight="600">Semibold</Text>
          <Text fontWeight="700">Bold</Text>
          <Text fontWeight="800">Extra-bold</Text>
        </XStack>
      </Section>

      <Section title="Color">
        <YStack gap="$1">
          <Text color="$color12">color12 — strongest</Text>
          <Text color="$color11">color11 — strong</Text>
          <Text color="$color10">color10 — muted</Text>
          <Text color="$color8">color8 — subtle</Text>
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
