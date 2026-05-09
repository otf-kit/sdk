// Generic "this component is native-only" notice. Used on the WEB build
// of the showcase whenever a route imports modules that don't run in
// react-native-web (Skia shaders, native haptics, camera, etc).
//
// Intentionally NO QR code in here — the outer phone-frame shell at
// apps/ui-native-storybook-preview/index.html owns the QR card and shows
// a per-component QR for every route. Embedding another QR here would
// just create visual redundancy.
//
// Wire-up per route is a 4-liner:
//
//   if (Platform.OS === 'web') {
//     return <MobileOnlyFallback title="Shockwave" tags={['Skia', 'Reanimated']} />
//   }
//   return <Demo />

import { View } from 'react-native'
import {
  YStack,
  XStack,
  H4,
  SizableText,
  Paragraph,
  Smartphone,
  ArrowRight,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from './ShowcaseFrame'

const isIframed =
  typeof window !== 'undefined' && window.self !== window.top

interface MobileOnlyFallbackProps {
  /** Display title — usually the component name. */
  title: string
  /** One-line description shown under the title. Optional. */
  description?: string
  /** Native-stack tags rendered as pills. e.g. ['Skia', 'Reanimated', 'Worklets']. */
  tags?: readonly string[]
  /**
   * Optional preview node — a static rendering of the component (no native
   * animations) so visitors see what they'd be testing.
   */
  preview?: React.ReactNode
}

export function MobileOnlyFallback({
  title,
  description,
  tags = [],
  preview,
}: MobileOnlyFallbackProps) {
  return (
    <ShowcaseFrame
      title={title}
      description={
        description ??
        'This component uses native-only modules and does not render on web. Open it on a real device to play with the real thing.'
      }
    >
      <Section title="Native-only component">
        <YStack
          padding="$5"
          gap="$4"
          borderRadius="$5"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
          alignItems="center"
        >
          {/* Native-only badge row */}
          <XStack gap="$2" alignItems="center" flexWrap="wrap" justifyContent="center">
            <XStack
              alignItems="center"
              gap="$2"
              paddingHorizontal="$3"
              paddingVertical="$2"
              borderRadius="$10"
              backgroundColor="$orange4"
            >
              <Smartphone size={14} color="$orange11" />
              <SizableText size="$1" color="$orange11" fontWeight="700">
                NATIVE ONLY
              </SizableText>
            </XStack>
            {tags.map((tag) => (
              <View
                key={tag}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: 'rgba(127,127,127,0.25)',
                }}
              >
                <SizableText size="$1" color="$color11" fontWeight="600">
                  {tag}
                </SizableText>
              </View>
            ))}
          </XStack>

          {/* Pointer copy. When iframed by the storybook-preview shell the
              outer QR card sits to the right; otherwise we just instruct the
              user to open the showcase on a device. */}
          {isIframed ? (
            <XStack alignItems="center" gap="$2" marginTop="$2">
              <H4 color="$color12" textAlign="center">
                Scan the QR
              </H4>
              <ArrowRight size={20} color="$color12" />
            </XStack>
          ) : (
            <H4 color="$color12" textAlign="center">
              Open on a device to interact
            </H4>
          )}

          <Paragraph
            size="$3"
            color="$color10"
            textAlign="center"
            maxWidth={460}
          >
            We don't approximate native effects on web — they look wrong.
            The OTF Native UI preview app shows every component with full
            fidelity on iOS and Android.
          </Paragraph>
        </YStack>
      </Section>

      {preview ? (
        <Section title="Preview (static, no animation)">
          <Paragraph size="$2" color="$color10" marginBottom="$3">
            What you'd see on a device — minus the native effect this
            component is built for.
          </Paragraph>
          <YStack alignItems="center">{preview}</YStack>
        </Section>
      ) : null}
    </ShowcaseFrame>
  )
}
