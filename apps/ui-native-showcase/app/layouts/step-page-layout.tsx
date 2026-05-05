import { useState } from 'react'
import {
  StepPageLayout,
  YStack,
  XStack,
  SizableText,
  OtfButton,
  OtfInput,
  Label,
  Selectable,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

// Renders StepPageLayout inside a bordered frame so the title + description +
// content + bottom slot composition reads as a single onboarding step.

function StepFrame({ children }: { children: React.ReactNode }) {
  return (
    <YStack
      height={420}
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      backgroundColor="$background"
      overflow="hidden"
    >
      {children}
    </YStack>
  )
}

export default function StepPageLayoutShowcase() {
  const [name, setName] = useState('')
  const [goal, setGoal] = useState<string>('balance')

  return (
    <ShowcaseFrame
      title="Step Page Layout"
      description="Vertical scaffold for one step in an onboarding or wizard flow — title, optional description, content area, and an optional bottom slot reserved for the primary CTA."
      docPath="packages/ui-native/src/layouts/StepPageLayout.tsx"
    >
      <Section title="Title + description only" hint="Intro / welcome steps">
        <StepFrame>
          <StepPageLayout
            title="Welcome aboard"
            description="Let's set up your account in three quick steps. You can change anything later in settings."
          >
            <YStack
              padding="$4"
              borderRadius="$4"
              backgroundColor="$color2"
              borderWidth={1}
              borderColor="$borderColor"
              gap="$2"
            >
              <SizableText size="$3" fontWeight="600">What you'll do</SizableText>
              <SizableText size="$2" color="$color10">1. Pick a display name</SizableText>
              <SizableText size="$2" color="$color10">2. Choose your primary goal</SizableText>
              <SizableText size="$2" color="$color10">3. Enable notifications</SizableText>
            </YStack>
          </StepPageLayout>
        </StepFrame>
      </Section>

      <Section title="With form + bottom CTA" hint="Most onboarding steps">
        <StepFrame>
          <StepPageLayout
            title="What should we call you?"
            description="This is shown on your profile and in shared spaces."
            bottom={
              <XStack gap="$3">
                <OtfButton variant="outlined" flex={1} onPress={() => {}}>Skip</OtfButton>
                <OtfButton flex={1} disabled={name.trim().length < 2} onPress={() => {}}>
                  Continue
                </OtfButton>
              </XStack>
            }
          >
            <YStack gap="$2">
              <Label>Display name</Label>
              <OtfInput
                value={name}
                onChangeText={setName}
                placeholder="At least 2 characters"
                autoFocus={false}
              />
              <SizableText size="$1" color="$color10">
                Letters, numbers, and underscores only.
              </SizableText>
            </YStack>
          </StepPageLayout>
        </StepFrame>
      </Section>

      <Section title="With selection + CTA">
        <StepFrame>
          <StepPageLayout
            title="What's your primary goal?"
            description="Pick one — we'll tailor recommendations accordingly."
            bottom={<OtfButton onPress={() => {}}>Continue</OtfButton>}
          >
            <YStack gap="$2">
              <Selectable
                selected={goal === 'balance'}
                onPress={() => setGoal('balance')}
                label="Balance"
                description="Keep things steady"
              />
              <Selectable
                selected={goal === 'grow'}
                onPress={() => setGoal('grow')}
                label="Grow"
                description="Push your output higher"
              />
              <Selectable
                selected={goal === 'focus'}
                onPress={() => setGoal('focus')}
                label="Focus"
                description="Cut distractions"
              />
            </YStack>
          </StepPageLayout>
        </StepFrame>
      </Section>

      <Section title="Short content" hint="Confirmation / final step">
        <StepFrame>
          <StepPageLayout
            title="You're all set"
            description="We've saved your preferences. You can refine them anytime from settings."
            bottom={<OtfButton onPress={() => {}}>Get started</OtfButton>}
          >
            <YStack alignItems="center" paddingVertical="$6">
              <SizableText size="$8">DONE</SizableText>
            </YStack>
          </StepPageLayout>
        </StepFrame>
      </Section>
    </ShowcaseFrame>
  )
}
