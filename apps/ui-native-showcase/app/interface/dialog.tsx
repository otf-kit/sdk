import { useState } from 'react'
import {
  OtfButton,
  SizableText,
  XStack,
  YStack,
  dialogConfirm,
  showError,
} from '@otfdashkit/ui-native'
import { Section, ShowcaseFrame } from '../../components/ShowcaseFrame'

export default function DialogShowcase() {
  const [lastResult, setLastResult] = useState<string>('No dialog shown yet')

  const handleConfirm = async () => {
    const ok = await dialogConfirm({
      title: 'Delete workspace?',
      description:
        'This will permanently remove the workspace and all of its data.',
    })
    setLastResult(ok ? 'Confirmed' : 'Cancelled')
  }

  const handleConfirmDefaults = async () => {
    const ok = await dialogConfirm({})
    setLastResult(ok ? 'Confirmed (defaults)' : 'Cancelled (defaults)')
  }

  return (
    <ShowcaseFrame
      title="Dialog"
      description="Imperative AlertDialog — wrap your tree in DialogProvider once, then call dialogConfirm() / showError() from anywhere."
      docPath="packages/ui-native/src/interface/Dialog.tsx"
    >
      <Section title="dialogConfirm()" hint={`Last result: ${lastResult}`}>
        <YStack gap="$2">
          <SizableText size="$2" color="$color10">
            Returns a Promise&lt;boolean&gt; — true if the user clicked Confirm.
          </SizableText>
          <XStack gap="$2" flexWrap="wrap">
            <OtfButton onPress={handleConfirm}>Delete workspace</OtfButton>
            <OtfButton variant="outlined" onPress={handleConfirmDefaults}>
              Use defaults
            </OtfButton>
          </XStack>
        </YStack>
      </Section>

      <Section title="showError() — Error instance">
        <OtfButton
          theme="red"
          onPress={() => showError(new Error('Network request timed out after 30s.'))}
        >
          Throw network error
        </OtfButton>
      </Section>

      <Section title="showError() — string">
        <OtfButton
          theme="red"
          onPress={() => showError('Email is already in use.', 'Sign-up failed')}
        >
          Sign-up error
        </OtfButton>
      </Section>

      <Section title="showError() — custom title">
        <OtfButton
          theme="red"
          onPress={() =>
            showError(
              { message: 'You do not have permission to view this workspace.' },
              'Access denied'
            )
          }
        >
          Access denied
        </OtfButton>
      </Section>
    </ShowcaseFrame>
  )
}
