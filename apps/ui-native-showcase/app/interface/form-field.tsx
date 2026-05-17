import { useState } from 'react'
import { FormField, OtfInput, YStack } from '@otfdashkit/ui-native'
import { Section, ShowcaseFrame } from '../../components/ShowcaseFrame'

export default function FormFieldShowcase() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const showEmailError =
    email.length > 0 && !email.includes('@')

  return (
    <ShowcaseFrame
      title="Form Field"
      description="Label + input + helper / error wrapper. Composes around any input primitive."
      docPath="packages/ui-native/src/interface/FormField.tsx"
    >
      <Section title="Label only">
        <FormField label="Full name">
          <OtfInput placeholder="Sarah Chen" />
        </FormField>
      </Section>

      <Section title="With helper text">
        <FormField
          label="Workspace URL"
          helperText="Lowercase letters and dashes only."
        >
          <OtfInput placeholder="my-workspace" />
        </FormField>
      </Section>

      <Section title="Required">
        <FormField label="Email address" required helperText="We'll never share it.">
          <OtfInput placeholder="mock@otf-kit.dev" />
        </FormField>
      </Section>

      <Section title="Error state" hint="Type a value without @ to trigger">
        <FormField
          label="Email address"
          required
          error={showEmailError ? 'Enter a valid email address.' : undefined}
        >
          <OtfInput
            placeholder="mock@otf-kit.dev"
            value={email}
            onChangeText={setEmail}
          />
        </FormField>
      </Section>

      <Section title="Stacked fields">
        <YStack gap="$3">
          <FormField label="Display name" required>
            <OtfInput placeholder="Alex Rivera" />
          </FormField>
          <FormField label="Password" required helperText="At least 8 characters.">
            <OtfInput
              placeholder="••••••••"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </FormField>
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
