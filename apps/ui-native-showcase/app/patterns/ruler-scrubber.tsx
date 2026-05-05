import { useState } from 'react'
import { RulerScrubber, YStack, SizableText } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

interface CurrentValueProps {
  label: string
}

function CurrentValue({ label }: CurrentValueProps) {
  return (
    <SizableText size="$3" color="$color11" fontWeight="600">
      {label}
    </SizableText>
  )
}

export default function RulerScrubberShowcase() {
  const [weight, setWeight] = useState<number>(70)
  const [calories, setCalories] = useState<number>(2000)
  const [distance, setDistance] = useState<number>(10)
  const [compactWeight, setCompactWeight] = useState<number>(70)
  const [shortRange, setShortRange] = useState<number>(5)

  return (
    <ShowcaseFrame
      title="RulerScrubber"
      description="Horizontal ruler-style numeric value picker. Apple-Health-flavored continuous-range input with snap-on-release + tick haptics."
      docPath="packages/ui-native/src/patterns/RulerScrubber.tsx"
    >
      <Section title="Target weight (kg)" hint="50–120, 0.5 step">
        <YStack gap="$3">
          <RulerScrubber
            min={50}
            max={120}
            step={0.5}
            value={weight}
            onChange={setWeight}
            unit="kg"
            labelEvery={10}
          />
          <CurrentValue label={`${weight.toFixed(1)} kg`} />
        </YStack>
      </Section>

      <Section title="Calorie goal" hint="1200–3500, 50 step → labels every 500 cal">
        <YStack gap="$3">
          <RulerScrubber
            min={1200}
            max={3500}
            step={50}
            value={calories}
            onChange={setCalories}
            unit="cal"
            labelEvery={10}
          />
          <CurrentValue label={`${calories} cal`} />
        </YStack>
      </Section>

      <Section title="Distance (km)" hint="1–42, 0.5 step">
        <YStack gap="$3">
          <RulerScrubber
            min={1}
            max={42}
            step={0.5}
            value={distance}
            onChange={setDistance}
            unit="km"
            labelEvery={5}
          />
          <CurrentValue label={`${distance.toFixed(1)} km`} />
        </YStack>
      </Section>

      <Section title="No value display" hint="showValue={false} — compact in a settings row">
        <YStack gap="$3">
          <RulerScrubber
            min={50}
            max={120}
            step={0.5}
            value={compactWeight}
            onChange={setCompactWeight}
            unit="kg"
            labelEvery={10}
            showValue={false}
          />
          <CurrentValue label={`${compactWeight.toFixed(1)} kg`} />
        </YStack>
      </Section>

      <Section title="Disabled" hint="short range, disabled prop">
        <YStack gap="$3">
          <RulerScrubber
            min={0}
            max={10}
            step={1}
            value={shortRange}
            onChange={setShortRange}
            unit="reps"
            labelEvery={2}
            disabled
          />
          <CurrentValue label={`${shortRange} reps`} />
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
