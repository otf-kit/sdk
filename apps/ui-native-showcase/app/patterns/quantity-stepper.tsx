import { useState } from 'react'
import { QuantityStepper, YStack } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function QuantityStepperShowcase() {
  const [qty, setQty] = useState(1)
  const [clamped, setClamped] = useState(5)
  return (
    <ShowcaseFrame
      title="Quantity Stepper"
      description="Increment / decrement quantity control with min/max clamping. Decrement disables at min, increment at max."
      docPath="packages/ui-native/src/patterns/QuantityStepper.tsx"
    >
      <Section title="Default" hint={`qty: ${qty}`}>
        <QuantityStepper value={qty} onChange={setQty} />
      </Section>
      <Section title="Small">
        <QuantityStepper value={qty} onChange={setQty} size="sm" />
      </Section>
      <Section title="Clamped 1–5">
        <QuantityStepper value={clamped} onChange={setClamped} min={1} max={5} />
      </Section>
      <Section title="Disabled">
        <YStack alignItems="flex-start">
          <QuantityStepper value={3} disabled />
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
