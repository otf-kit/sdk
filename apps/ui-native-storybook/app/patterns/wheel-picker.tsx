import { useState } from 'react'
import {
  WheelPicker,
  YStack,
  SizableText,
  type WheelPickerOption,
} from '@otf/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

const HEIGHT_OPTIONS: WheelPickerOption<number>[] = Array.from(
  { length: 81 },
  (_, i) => ({ value: 140 + i, label: String(140 + i) }),
)

const WEIGHT_OPTIONS: WheelPickerOption<number>[] = Array.from(
  { length: 111 },
  (_, i) => ({ value: 40 + i, label: String(40 + i) }),
)

type Size = 'sm' | 'md' | 'lg'
const SIZE_OPTIONS: WheelPickerOption<Size>[] = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
]

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

export default function WheelPickerShowcase() {
  const [height, setHeight] = useState<number>(170)
  const [weight, setWeight] = useState<number>(70)
  const [size, setSize] = useState<Size>('md')
  const [heightNoHaptic, setHeightNoHaptic] = useState<number>(170)
  const [heightDisabled, setHeightDisabled] = useState<number>(170)

  return (
    <ShowcaseFrame
      title="WheelPicker"
      description="Vertical scroll-wheel picker — premium iOS-flavored single-value picker for height, weight, or any enumerable scalar."
      docPath="packages/ui-native/src/patterns/WheelPicker.tsx"
    >
      <Section title="Height (cm)" hint="card variant">
        <YStack gap="$2">
          <CurrentValue label={`${height} cm`} />
          <WheelPicker
            options={HEIGHT_OPTIONS}
            value={height}
            onChange={setHeight}
            unitLabel="cm"
            variant="card"
          />
        </YStack>
      </Section>

      <Section title="Weight (kg)" hint="plain variant">
        <YStack gap="$2">
          <CurrentValue label={`${weight} kg`} />
          <WheelPicker
            options={WEIGHT_OPTIONS}
            value={weight}
            onChange={setWeight}
            unitLabel="kg"
            variant="plain"
          />
        </YStack>
      </Section>

      <Section title="Custom enum" hint="non-numeric values">
        <YStack gap="$2">
          <CurrentValue label={size} />
          <WheelPicker<Size>
            options={SIZE_OPTIONS}
            value={size}
            onChange={setSize}
            variant="card"
          />
        </YStack>
      </Section>

      <Section title="No haptic" hint="visual only — haptic={false}">
        <YStack gap="$2">
          <CurrentValue label={`${heightNoHaptic} cm`} />
          <WheelPicker
            options={HEIGHT_OPTIONS}
            value={heightNoHaptic}
            onChange={setHeightNoHaptic}
            unitLabel="cm"
            variant="card"
            haptic={false}
          />
        </YStack>
      </Section>

      <Section title="Disabled">
        <YStack gap="$2">
          <CurrentValue label={`${heightDisabled} cm`} />
          <WheelPicker
            options={HEIGHT_OPTIONS}
            value={heightDisabled}
            onChange={setHeightDisabled}
            unitLabel="cm"
            variant="card"
            disabled
          />
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
