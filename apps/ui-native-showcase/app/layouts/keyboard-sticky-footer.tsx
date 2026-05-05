import { useState } from 'react'
import {
  KeyboardStickyFooter,
  YStack,
  XStack,
  OtfButton,
  OtfInput,
  SizableText,
  Label,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

// On a real device, KeyboardStickyFooter sits above the keyboard so the
// primary CTA stays reachable while the user types. In the showcase we wrap
// it in a fixed-height frame to demonstrate the bottom-pinned layout.

function FormFrame({ children }: { children: React.ReactNode }) {
  return (
    <YStack
      height={360}
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

export default function KeyboardStickyFooterShowcase() {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [name, setName] = useState('')
  const valid = email.includes('@') && pw.length >= 6

  return (
    <ShowcaseFrame
      title="Keyboard Sticky Footer"
      description="Pins a footer (typically a primary CTA) to the bottom of a form. On device the footer floats above the keyboard so the action stays reachable."
      docPath="packages/ui-native/src/layouts/KeyboardStickyFooter.tsx"
    >
      <Section title="Login form" hint="Footer pinned at bottom of frame">
        <FormFrame>
          <YStack flex={1} padding="$4" gap="$3">
            <SizableText size="$6" fontWeight="700">Sign in</SizableText>
            <YStack gap="$2">
              <Label>Email</Label>
              <OtfInput value={email} onChangeText={setEmail} placeholder="you@example.com" />
            </YStack>
            <YStack gap="$2">
              <Label>Password</Label>
              <OtfInput
                value={pw}
                onChangeText={setPw}
                placeholder="At least 6 characters"
                secureTextEntry
              />
            </YStack>
          </YStack>
          <KeyboardStickyFooter>
            <OtfButton disabled={!valid} onPress={() => {}}>Continue</OtfButton>
          </KeyboardStickyFooter>
        </FormFrame>
      </Section>

      <Section title="Single-field" hint="Just one input + CTA">
        <FormFrame>
          <YStack flex={1} padding="$4" gap="$3" justifyContent="center">
            <YStack gap="$2">
              <Label>Display name</Label>
              <OtfInput value={name} onChangeText={setName} placeholder="What should we call you?" />
              <SizableText size="$1" color="$color10">
                You can change this later in settings.
              </SizableText>
            </YStack>
          </YStack>
          <KeyboardStickyFooter>
            <OtfButton disabled={name.trim().length < 2} onPress={() => {}}>
              Save
            </OtfButton>
          </KeyboardStickyFooter>
        </FormFrame>
      </Section>

      <Section title="Two-button footer">
        <FormFrame>
          <YStack flex={1} padding="$4" gap="$2">
            <SizableText size="$5" fontWeight="600">Confirm details</SizableText>
            <SizableText size="$3" color="$color10">
              Review the information you entered before continuing.
            </SizableText>
          </YStack>
          <KeyboardStickyFooter>
            <XStack gap="$3">
              <OtfButton variant="outlined" flex={1} onPress={() => {}}>Back</OtfButton>
              <OtfButton flex={1} onPress={() => {}}>Confirm</OtfButton>
            </XStack>
          </KeyboardStickyFooter>
        </FormFrame>
      </Section>

      <Section title="With offset" hint="offset prop adds extra bottom padding">
        <FormFrame>
          <YStack flex={1} padding="$4" justifyContent="center">
            <SizableText size="$3" color="$color10">
              Pass `offset` to lift the footer above the home indicator on devices without safe-area handling.
            </SizableText>
          </YStack>
          <KeyboardStickyFooter offset={24}>
            <OtfButton onPress={() => {}}>Continue</OtfButton>
          </KeyboardStickyFooter>
        </FormFrame>
      </Section>
    </ShowcaseFrame>
  )
}
