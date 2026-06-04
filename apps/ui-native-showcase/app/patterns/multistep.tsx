import { useState } from 'react'
import {
  MultiStep,
  Step,
  useMultiStep,
  OtfButton,
  OtfInput,
  XStack,
  YStack,
  SizableText,
  H4,
  type MultiStepProgress,
  type MultiStepTransition,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

function StepBody({ title, body }: { title: string; body: string }) {
  return (
    <YStack padding="$4" gap="$2">
      <H4 size="$7" fontWeight="700">
        {title}
      </H4>
      <SizableText size="$3" color="$color11">
        {body}
      </SizableText>
    </YStack>
  )
}

function WizardFooter() {
  const { index, total, next, back, canGoNext } = useMultiStep()
  const isLast = index === total - 1
  return (
    <XStack padding="$4" gap="$3" justifyContent="space-between">
      <OtfButton variant="outlined" onPress={back} disabled={index === 0}>
        Back
      </OtfButton>
      <OtfButton variant="primary" onPress={next} disabled={!canGoNext}>
        {isLast ? 'Done' : 'Next'}
      </OtfButton>
    </XStack>
  )
}

function BasicWizard({
  progress = 'bar',
  transition = 'slide_horizontal',
}: {
  progress?: MultiStepProgress
  transition?: MultiStepTransition
}) {
  return (
    <YStack height={260} borderWidth={1} borderColor="$borderColor" borderRadius="$4" overflow="hidden">
      <MultiStep progress={progress} transition={transition}>
        <Step name="name">
          <YStack flex={1} justifyContent="space-between">
            <StepBody title="Your name" body="What should we call you?" />
            <WizardFooter />
          </YStack>
        </Step>
        <Step name="email">
          <YStack flex={1} justifyContent="space-between">
            <StepBody title="Your email" body="We'll send a verification link." />
            <WizardFooter />
          </YStack>
        </Step>
        <Step name="done">
          <YStack flex={1} justifyContent="space-between">
            <StepBody title="All set" body="You're ready to dive in." />
            <WizardFooter />
          </YStack>
        </Step>
      </MultiStep>
    </YStack>
  )
}

function GatedNameStep() {
  const { set, setCanGoNext } = useMultiStep()
  const [name, setName] = useState('')
  return (
    <YStack flex={1} justifyContent="space-between">
      <YStack padding="$4" gap="$3">
        <H4 size="$7" fontWeight="700">
          Your name
        </H4>
        <OtfInput
          placeholder="Type at least 2 characters"
          value={name}
          onChangeText={(v: string) => {
            setName(v)
            set('name', v)
            setCanGoNext(v.trim().length >= 2)
          }}
        />
      </YStack>
      <WizardFooter />
    </YStack>
  )
}

export default function MultiStepShowcase() {
  return (
    <ShowcaseFrame
      title="MultiStep"
      description="Declarative wizard primitive with progress, transitions, and a per-step canGoNext flag."
      docPath="packages/ui-native/src/patterns/MultiStep.tsx"
    >
      <Section title="Basic 3-step wizard" hint="progress=bar">
        <BasicWizard />
      </Section>

      <Section title="Progress variants">
        <YStack gap="$4">
          {(['bar', 'dots', 'segments', 'none'] as MultiStepProgress[]).map((p) => (
            <YStack key={p} gap="$2">
              <SizableText size="$2" color="$color11">
                progress=&quot;{p}&quot;
              </SizableText>
              <BasicWizard progress={p} />
            </YStack>
          ))}
        </YStack>
      </Section>

      <Section title="Transitions">
        <YStack gap="$4">
          {(['slide_horizontal', 'fade', 'none'] as MultiStepTransition[]).map((t) => (
            <YStack key={t} gap="$2">
              <SizableText size="$2" color="$color11">
                transition=&quot;{t}&quot;
              </SizableText>
              <BasicWizard transition={t} />
            </YStack>
          ))}
        </YStack>
      </Section>

      <Section title="Disabled Next" hint="canGoNext flips when input fills">
        <YStack height={260} borderWidth={1} borderColor="$borderColor" borderRadius="$4" overflow="hidden">
          <MultiStep>
            <Step name="name" canGoNext={false}>
              <GatedNameStep />
            </Step>
            <Step name="done">
              <YStack flex={1} justifyContent="space-between">
                <StepBody title="Nice" body="Forward motion was gated until you typed." />
                <WizardFooter />
              </YStack>
            </Step>
          </MultiStep>
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
