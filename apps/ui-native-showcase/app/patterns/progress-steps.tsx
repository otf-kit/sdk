import { useState } from 'react'
import {
  ProgressSteps,
  Button,
  XStack,
  YStack,
  SizableText,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

const STEPS = ['Account', 'Profile', 'Plan', 'Confirm']
const SHORT_STEPS = ['Idea', 'Build', 'Ship']

export default function ProgressStepsShowcase() {
  const [current, setCurrent] = useState(1)

  return (
    <ShowcaseFrame
      title="Progress Steps"
      description="Linear stepper for multi-page flows. Three variants — dots, numbered, bar — each driven by a current index."
      docPath="packages/ui-native/src/patterns/ProgressSteps.tsx"
    >
      <Section title="Numbered — 4 steps, current at index 2">
        <ProgressSteps steps={STEPS} currentStep={1} variant="numbered" />
      </Section>

      <Section title="Dots — minimal indicator">
        <ProgressSteps steps={STEPS} currentStep={2} variant="dots" />
      </Section>

      <Section title="Bar — fills as user advances">
        <YStack gap="$3">
          <ProgressSteps steps={STEPS} currentStep={1} variant="bar" />
          <ProgressSteps steps={STEPS} currentStep={3} variant="bar" />
        </YStack>
      </Section>

      <Section title="Interactive — drive currentStep" hint={`Step ${current + 1} of ${STEPS.length}`}>
        <YStack gap="$4">
          <ProgressSteps steps={STEPS} currentStep={current} variant="numbered" />
          <XStack gap="$2" justifyContent="center">
            <Button
              size="$3"
              disabled={current === 0}
              onPress={() => setCurrent((c) => Math.max(0, c - 1))}
            >
              Back
            </Button>
            <Button
              size="$3"
              disabled={current === STEPS.length - 1}
              onPress={() => setCurrent((c) => Math.min(STEPS.length - 1, c + 1))}
            >
              Next
            </Button>
          </XStack>
          <SizableText size="$2" color="$color11" textAlign="center">
            {STEPS[current]}
          </SizableText>
        </YStack>
      </Section>

      <Section title="Short flow — 3 steps">
        <ProgressSteps steps={SHORT_STEPS} currentStep={1} variant="numbered" />
      </Section>
    </ShowcaseFrame>
  )
}
