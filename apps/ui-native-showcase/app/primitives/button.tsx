import { useState } from 'react'
import { Button, XStack, YStack, SizableText, Heart, Trash2, Download, ChevronRight, Plus, Send } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function ButtonShowcase() {
  const [count, setCount] = useState(0)
  return (
    <ShowcaseFrame
      title="Button"
      description="Pill-shaped press targets with clear variant hierarchy — primary CTA, default secondary, outlined, ghost, destructive, and shimmer hero."
      docPath="packages/ui-native/src/primitives/Button.tsx"
    >

      {/* ── Variants ───────────────────────────────────────────────── */}
      <Section title="Variants" hint="primary pops off the surface; each step down recedes">
        <YStack gap="$3">
          <XStack gap="$3" alignItems="center" flexWrap="wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="default">Default</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="transparent">Ghost</Button>
          </XStack>
          <XStack gap="$3" alignItems="center" flexWrap="wrap">
            <Button variant="destructive">Delete</Button>
            <Button variant="floating">Floating</Button>
            <Button variant="shimmer">Shimmer</Button>
          </XStack>
        </YStack>
      </Section>

      {/* ── Shimmer hero CTA ───────────────────────────────────────── */}
      <Section title="Shimmer — hero CTA" hint="paywall / onboarding / landing conversion button">
        <YStack gap="$2.5">
          <Button variant="shimmer" size="$5" fullWidth>
            Get started — it's free
          </Button>
          <Button variant="primary" size="$5" fullWidth iconAfter={ChevronRight}>
            Continue
          </Button>
        </YStack>
      </Section>

      {/* ── Sizes ──────────────────────────────────────────────────── */}
      <Section title="Sizes">
        <XStack gap="$3" alignItems="center" flexWrap="wrap">
          <Button variant="primary" size="$2">XS</Button>
          <Button variant="primary" size="$3">Small</Button>
          <Button variant="primary" size="$4">Default</Button>
          <Button variant="primary" size="$5">Large</Button>
        </XStack>
      </Section>

      {/* ── With icons ─────────────────────────────────────────────── */}
      <Section title="With icons">
        <XStack gap="$3" alignItems="center" flexWrap="wrap">
          <Button variant="primary" icon={Send}>Send</Button>
          <Button variant="default" icon={Download}>Save</Button>
          <Button variant="outlined" iconAfter={ChevronRight}>Continue</Button>
          <Button variant="primary" icon={Plus} circular accessibilityLabel="Add" />
          <Button variant="outlined" icon={Heart} circular accessibilityLabel="Like" />
          <Button variant="destructive" icon={Trash2} circular accessibilityLabel="Delete" />
        </XStack>
      </Section>

      {/* ── Full width ─────────────────────────────────────────────── */}
      <Section title="Full width">
        <YStack gap="$2.5">
          <Button variant="primary" size="$5" fullWidth>Create account</Button>
          <Button variant="outlined" size="$5" fullWidth>Sign in instead</Button>
          <Button variant="transparent" size="$4" fullWidth>Skip for now</Button>
        </YStack>
      </Section>

      {/* ── Disabled ───────────────────────────────────────────────── */}
      <Section title="Disabled states">
        <XStack gap="$3" alignItems="center" flexWrap="wrap">
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="default" disabled>Default</Button>
          <Button variant="outlined" disabled>Outlined</Button>
          <Button variant="destructive" disabled>Delete</Button>
        </XStack>
      </Section>

      {/* ── Interactive ────────────────────────────────────────────── */}
      <Section title="Interactive" hint={`Pressed ${count} time${count === 1 ? '' : 's'}`}>
        <XStack gap="$3" alignItems="center" flexWrap="wrap">
          <Button variant="primary" onPress={() => setCount((c) => c + 1)}>
            Increment
          </Button>
          <Button variant="outlined" onPress={() => setCount(0)}>
            Reset
          </Button>
          <SizableText size="$3" color="$color11">
            Count: {count}
          </SizableText>
        </XStack>
      </Section>

    </ShowcaseFrame>
  )
}
