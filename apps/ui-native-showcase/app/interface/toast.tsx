import { OtfButton, SizableText, XStack, YStack, toast, useOtfToast } from '@otf/ui-native'
import { Section, ShowcaseFrame } from '../../components/ShowcaseFrame'

export default function ToastShowcase() {
  const { show } = useOtfToast()

  return (
    <ShowcaseFrame
      title="Toast"
      description="Transient banner — call toast() from anywhere, or the useOtfToast() hook inside React. Wrap your tree in OtfToastProvider once."
      docPath="packages/ui-native/src/interface/OtfToast.tsx"
    >
      <Section title="Variants" hint="Auto-dismiss after 3s">
        <XStack gap="$2" flexWrap="wrap">
          <OtfButton onPress={() => toast('Heads up.')}>Default</OtfButton>
          <OtfButton
            theme="green"
            onPress={() => toast('Profile saved.', 'success')}
          >
            Success
          </OtfButton>
          <OtfButton
            theme="red"
            onPress={() => toast('Could not save profile.', 'error')}
          >
            Error
          </OtfButton>
          <OtfButton
            theme="yellow"
            onPress={() => toast('Connection unstable.', 'warning')}
          >
            Warning
          </OtfButton>
        </XStack>
      </Section>

      <Section title="With message body">
        <XStack gap="$2" flexWrap="wrap">
          <OtfButton
            onPress={() =>
              toast('Workout logged', {
                variant: 'success',
                message: '5.2km run · 28:14 · saved to your timeline.',
              })
            }
          >
            Success + body
          </OtfButton>
          <OtfButton
            onPress={() =>
              toast('Sync failed', {
                variant: 'error',
                message: 'We could not reach the server. Retrying in 30 seconds.',
              })
            }
          >
            Error + body
          </OtfButton>
        </XStack>
      </Section>

      <Section title="Custom duration">
        <XStack gap="$2" flexWrap="wrap">
          <OtfButton
            onPress={() => toast('Quick toast', { duration: 1000 })}
          >
            1s
          </OtfButton>
          <OtfButton
            onPress={() => toast('Sticky toast', { duration: 8000 })}
          >
            8s
          </OtfButton>
        </XStack>
      </Section>

      <Section title="useOtfToast() hook" hint="Same API, scoped to React tree">
        <YStack gap="$2">
          <SizableText size="$2" color="$color10">
            Inside components, prefer the hook — it doesn&apos;t depend on the
            module-level singleton.
          </SizableText>
          <XStack gap="$2" flexWrap="wrap">
            <OtfButton onPress={() => show('Hook fired')}>show()</OtfButton>
            <OtfButton
              onPress={() =>
                show('Hook fired with body', {
                  variant: 'success',
                  message: 'This came through useOtfToast().',
                })
              }
            >
              show() + body
            </OtfButton>
          </XStack>
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
