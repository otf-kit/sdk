import { useState } from 'react'
import {
  AnimatedView,
  YStack,
  XStack,
  SizableText,
  OtfButton,
  OtfCard,
  type AnimationPreset,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

const PRESETS: AnimationPreset[] = [
  'fade',
  'slide-up',
  'slide-down',
  'slide-left',
  'slide-right',
  'zoom-in',
  'zoom-out',
  'flip',
  'pop',
  'bounce',
]

const STAGGER_ITEMS = ['Apples', 'Berries', 'Carrots', 'Dates', 'Eggs', 'Figs']

function PresetTile({ preset }: { preset: AnimationPreset }) {
  const [count, setCount] = useState(0)
  return (
    <YStack
      flex={1}
      minWidth={150}
      padding="$3"
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius="$4"
      backgroundColor="$background"
      gap="$2"
    >
      <SizableText size="$2" color="$color11">
        {preset}
      </SizableText>
      <YStack height={60} alignItems="center" justifyContent="center">
        <AnimatedView key={count} animation={preset} duration={400}>
          <OtfCard padding="$3" backgroundColor="$color4" borderRadius="$3">
            <SizableText size="$3" fontWeight="600" color="$color12">
              Hello
            </SizableText>
          </OtfCard>
        </AnimatedView>
      </YStack>
      <OtfButton size="sm" variant="outlined" onPress={() => setCount((c) => c + 1)}>
        Replay
      </OtfButton>
    </YStack>
  )
}

function StaggerDemo() {
  const [count, setCount] = useState(0)
  return (
    <YStack gap="$3">
      <AnimatedView key={count} animation="slide-up" stagger={50}>
        {STAGGER_ITEMS.map((item) => (
          <YStack
            key={item}
            padding="$3"
            marginBottom="$2"
            borderWidth={1}
            borderColor="$borderColor"
            borderRadius="$3"
            backgroundColor="$background"
          >
            <SizableText size="$3" fontWeight="500" color="$color12">
              {item}
            </SizableText>
          </YStack>
        ))}
      </AnimatedView>
      <OtfButton size="sm" variant="outlined" onPress={() => setCount((c) => c + 1)}>
        Replay
      </OtfButton>
    </YStack>
  )
}

function DelayDemo() {
  const [count, setCount] = useState(0)
  return (
    <YStack gap="$3">
      <YStack gap="$2">
        <AnimatedView key={`a-${count}`} animation="slide-up" delay={0} duration={300}>
          <YStack padding="$3" borderWidth={1} borderColor="$borderColor" borderRadius="$3" backgroundColor="$background">
            <SizableText size="$3" fontWeight="500" color="$color12">
              First — delay 0ms
            </SizableText>
          </YStack>
        </AnimatedView>
        <AnimatedView key={`b-${count}`} animation="slide-up" delay={150} duration={300}>
          <YStack padding="$3" borderWidth={1} borderColor="$borderColor" borderRadius="$3" backgroundColor="$background">
            <SizableText size="$3" fontWeight="500" color="$color12">
              Second — delay 150ms
            </SizableText>
          </YStack>
        </AnimatedView>
        <AnimatedView key={`c-${count}`} animation="slide-up" delay={300} duration={300}>
          <YStack padding="$3" borderWidth={1} borderColor="$borderColor" borderRadius="$3" backgroundColor="$background">
            <SizableText size="$3" fontWeight="500" color="$color12">
              Third — delay 300ms
            </SizableText>
          </YStack>
        </AnimatedView>
      </YStack>
      <OtfButton size="sm" variant="outlined" onPress={() => setCount((c) => c + 1)}>
        Replay
      </OtfButton>
    </YStack>
  )
}

export default function AnimatedViewShowcase() {
  return (
    <ShowcaseFrame
      title="AnimatedView"
      description="Generic enter-animation wrapper with 10 presets, optional stagger, and reduced-motion fallback."
      docPath="packages/ui-native/src/patterns/AnimatedView.tsx"
    >
      <Section title="All 10 presets" hint="tap Replay to remount">
        <XStack flexWrap="wrap" gap="$3">
          {PRESETS.map((p) => (
            <PresetTile key={p} preset={p} />
          ))}
        </XStack>
      </Section>

      <Section title="Stagger" hint="stagger=50ms">
        <StaggerDemo />
      </Section>

      <Section title="Delay + duration" hint="chained 0ms / 150ms / 300ms">
        <DelayDemo />
      </Section>

      <Section title="Reduced motion">
        <SizableText size="$3" color="$color11">
          AnimatedView calls useReducedMotion() internally. When the OS pref is on, it renders a plain View and skips the entering animation entirely — no opacity gating, no transform. Set the system pref or test on a device with Reduce Motion enabled to verify.
        </SizableText>
      </Section>
    </ShowcaseFrame>
  )
}
