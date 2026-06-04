import { useState } from 'react'
import {
  OTPInput,
  YStack,
  XStack,
  SizableText,
  OtfButton,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function OTPInputShowcase() {
  const [six, setSix] = useState('')
  const [four, setFour] = useState('')
  const [masked, setMasked] = useState('')
  const [errorVal, setErrorVal] = useState('1234')
  const [completed, setCompleted] = useState<string | null>(null)

  return (
    <ShowcaseFrame
      title="OTP Input"
      description="Code-entry boxes for 2FA, magic links, and phone verification. Auto-focus, paste-aware, web + native."
      docPath="packages/ui-native/src/patterns/OTPInput.tsx"
    >
      <Section title="6-digit (default)" hint={six.length === 6 ? 'complete' : `${six.length}/6`}>
        <YStack gap="$3" alignItems="center">
          <OTPInput
            length={6}
            value={six}
            onChange={setSix}
            onComplete={(code: string) => setCompleted(code)}
          />
          {completed ? (
            <SizableText size="$2" color="$green10">
              Submitted: {completed}
            </SizableText>
          ) : (
            <SizableText size="$2" color="$color11">
              Type 6 digits to fire onComplete
            </SizableText>
          )}
        </YStack>
      </Section>

      <Section title="4-digit — short PIN" hint={four.length === 4 ? 'complete' : `${four.length}/4`}>
        <YStack gap="$3" alignItems="center">
          <OTPInput length={4} value={four} onChange={setFour} />
          <SizableText size="$2" color="$color11">
            Common for in-app PIN unlocks.
          </SizableText>
        </YStack>
      </Section>

      <Section title="Masked entry" hint="hides digits behind dots">
        <YStack gap="$3" alignItems="center">
          <OTPInput length={6} value={masked} onChange={setMasked} secureEntry />
          <SizableText size="$2" color="$color11">
            Use for password-grade codes (parental controls, secure unlocks).
          </SizableText>
        </YStack>
      </Section>

      <Section title="Error state" hint="invalid code from server">
        <YStack gap="$3" alignItems="center">
          <OTPInput length={4} value={errorVal} onChange={setErrorVal} error />
          <SizableText size="$2" color="$red10">
            That code does not match. Try again or request a new one.
          </SizableText>
          <XStack gap="$2">
            <OtfButton variant="outlined" size="sm" onPress={() => setErrorVal('')}>
              Clear
            </OtfButton>
            <OtfButton variant="primary" size="sm">
              Resend code
            </OtfButton>
          </XStack>
        </YStack>
      </Section>

      <Section title="Auth flow context" hint="magic-link verification">
        <YStack
          padding="$4"
          gap="$4"
          borderRadius="$4"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
          alignItems="center"
        >
          <YStack gap="$1" alignItems="center">
            <SizableText size="$6" fontWeight="700">
              Check your phone
            </SizableText>
            <SizableText size="$3" color="$color11" textAlign="center">
              We sent a 6-digit code to (•••) •••-4242. Enter it below to continue.
            </SizableText>
          </YStack>
          <OTPInput length={6} value={six} onChange={setSix} autoFocus />
          <SizableText size="$2" color="$color9" pressStyle={{ opacity: 0.6 }}>
            Resend in 0:30
          </SizableText>
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
