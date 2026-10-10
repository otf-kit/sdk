import { useState } from 'react'
import { AnimatedNumber, OtfButton, YStack, XStack, SizableText } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function AnimatedNumberShowcase() {
  const [coins, setCoins] = useState(240)
  const [replay, setReplay] = useState(0)

  return (
    <ShowcaseFrame
      title="AnimatedNumber"
      description="Number that counts up to its value, with most of the web AnimatedNumber's props, plus delay. Blank figure spaces hold the final width so nothing shifts."
      docPath="packages/ui-native/src/patterns/AnimatedNumber.tsx"
    >
      <Section title="Count-up with delay" hint="duration 450, delay 300">
        <YStack gap="$3" alignItems="flex-start">
          <AnimatedNumber
            key={replay}
            value={coins}
            duration={450}
            delay={300}
            prefix="+"
          />
          <XStack gap="$2">
            <OtfButton variant="outlined" onPress={() => setReplay((r) => r + 1)}>Replay</OtfButton>
            <OtfButton variant="outlined" onPress={() => setCoins((c) => c + 125)}>Add 125</OtfButton>
          </XStack>
        </YStack>
      </Section>

      <Section title="Decimals, prefix, suffix" hint="from 0, 2 decimals">
        <AnimatedNumber value={1249.5} decimals={2} prefix="$" variant="h1" />
      </Section>

      <Section title="Static" hint="duration 0 renders the value at once">
        <AnimatedNumber value={12500} duration={0} variant="h1" />
      </Section>

      <Section title="Small amounts stay static" hint="below countMin (10) there is no tally">
        <YStack gap="$2" alignItems="flex-start">
          <AnimatedNumber value={7} duration={450} variant="h2" />
          <SizableText size="$2" color="$color11">7 shows at once; 1–9 counted is a delayed jump.</SizableText>
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
