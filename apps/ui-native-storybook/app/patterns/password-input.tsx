import { useState } from 'react'
import { PasswordInput, YStack } from '@otf/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function PasswordInputShowcase() {
  const [a, setA] = useState('')
  const [b, setB] = useState('hunter2')
  const [c, setC] = useState('Str0ng!Pass')
  const [d, setD] = useState('weak')

  return (
    <ShowcaseFrame
      title="Password Input"
      description="Secure-text field with show/hide toggle and optional strength meter."
      docPath="packages/ui-native/src/patterns/PasswordInput.tsx"
    >
      <Section title="Default — placeholder">
        <YStack gap="$3" maxWidth={360}>
          <PasswordInput value={a} onChangeText={setA} placeholder="Enter password" />
        </YStack>
      </Section>

      <Section title="With label">
        <YStack gap="$3" maxWidth={360}>
          <PasswordInput
            label="Password"
            value={b}
            onChangeText={setB}
            placeholder="At least 8 characters"
          />
        </YStack>
      </Section>

      <Section title="Strength indicator" hint="weak / medium / strong">
        <YStack gap="$3" maxWidth={360}>
          <PasswordInput
            label="Strong password"
            value={c}
            onChangeText={setC}
            strengthIndicator
          />
          <PasswordInput
            label="Weak password"
            value={d}
            onChangeText={setD}
            strengthIndicator
          />
        </YStack>
      </Section>

      <Section title="Sizes">
        <YStack gap="$3" maxWidth={360}>
          <PasswordInput value={a} onChangeText={setA} size="$3" placeholder="Small" />
          <PasswordInput value={a} onChangeText={setA} size="$4" placeholder="Medium" />
          <PasswordInput value={a} onChangeText={setA} size="$5" placeholder="Large" />
        </YStack>
      </Section>

      <Section title="Error state">
        <YStack gap="$3" maxWidth={360}>
          <PasswordInput
            label="Password"
            value="abc"
            error="Password must be at least 8 characters"
          />
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
