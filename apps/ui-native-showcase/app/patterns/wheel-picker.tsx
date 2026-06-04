import { useState } from 'react'
import {
  WheelPicker,
  type WheelPickerOption,
} from '@otfdashkit/ui-native'
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

export default function WheelPickerShowcase() {
  const [height, setHeight] = useState<number>(170)
  const [weight, setWeight] = useState<number>(70)
  const [size, setSize] = useState<Size>('md')
  const [heightNoHaptic, setHeightNoHaptic] = useState<number>(170)
  const [heightDisabled, setHeightDisabled] = useState<number>(170)

  return (
    <ShowcaseFrame
      title="WheelPicker"
      description="Vertical scroll-wheel — iOS-flavored with color interpolation, accent hairlines, and built-in value display. Like RulerScrubber but vertical."
      docPath="packages/ui-native/src/patterns/WheelPicker.tsx"
    >
      <Section title="Height (cm)" hint="showValue + card variant">
        <WheelPicker
          options={HEIGHT_OPTIONS}
          value={height}
          onChange={setHeight}
          unitLabel="cm"
          variant="card"
          showValue
        />
      </Section>

      <Section title="Weight (kg)" hint="showValue + plain variant">
        <WheelPicker
          options={WEIGHT_OPTIONS}
          value={weight}
          onChange={setWeight}
          unitLabel="kg"
          variant="plain"
          showValue
        />
      </Section>

      <Section title="Custom enum" hint="non-numeric values">
        <WheelPicker<Size>
          options={SIZE_OPTIONS}
          value={size}
          onChange={setSize}
          variant="card"
          showValue
        />
      </Section>

      <Section title="No haptic" hint="haptic={false}">
        <WheelPicker
          options={HEIGHT_OPTIONS}
          value={heightNoHaptic}
          onChange={setHeightNoHaptic}
          unitLabel="cm"
          variant="card"
          showValue
          haptic={false}
        />
      </Section>

      <Section title="Disabled">
        <WheelPicker
          options={HEIGHT_OPTIONS}
          value={heightDisabled}
          onChange={setHeightDisabled}
          unitLabel="cm"
          variant="card"
          showValue
          disabled
        />
      </Section>
    </ShowcaseFrame>
  )
}
