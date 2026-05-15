import { useState } from 'react'
import { FloatingLabelInput, YStack } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function FloatingLabelInputShowcase() {
  const [email, setEmail]   = useState('')
  const [name,  setName]    = useState('Dave')
  const [bad,   setBad]     = useState('Has Spaces')

  return (
    <ShowcaseFrame
      title="Floating Label Input"
      description="Label sits inside the field at rest, floats up + shrinks on focus or when the field has content. Reanimated 4 spring; respects useReducedMotion()."
      docPath="packages/ui-native/src/patterns/FloatingLabelInput.tsx"
    >
      <Section title="Empty (rest state)">
        <YStack gap="$3">
          <FloatingLabelInput label="Email" value={email} onChangeText={setEmail} />
        </YStack>
      </Section>

      <Section title="Pre-filled (floated by default)">
        <YStack gap="$3">
          <FloatingLabelInput label="Full name" value={name} onChangeText={setName} />
        </YStack>
      </Section>

      <Section title="With hint">
        <YStack gap="$3">
          <FloatingLabelInput
            label="Workspace name"
            hint="Lowercase letters, numbers, and dashes only."
          />
        </YStack>
      </Section>

      <Section title="With error">
        <YStack gap="$3">
          <FloatingLabelInput
            label="Workspace name"
            value={bad}
            onChangeText={setBad}
            error="Spaces are not allowed."
          />
        </YStack>
      </Section>

      <Section title="Stacked form">
        <YStack gap="$3">
          <FloatingLabelInput label="Full name" />
          <FloatingLabelInput label="Email" keyboardType="email-address" autoCapitalize="none" />
          <FloatingLabelInput label="Workspace" hint="You can rename this later." />
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
