import { useState } from 'react'
import { Button, XStack, SizableText, Heart } from '@otf/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function ButtonShowcase() {
  const [count, setCount] = useState(0)
  return (
    <ShowcaseFrame
      title="Button"
      description="Press target — used for primary CTAs, secondary actions, and inline actions."
      docPath="packages/ui-native/src/primitives/Button.tsx"
    >
      <Section title="Sizes">
        <XStack gap="$3" alignItems="center" flexWrap="wrap">
          <Button size="$2">Small</Button>
          <Button size="$3">Default</Button>
          <Button size="$4">Medium</Button>
          <Button size="$5">Large</Button>
        </XStack>
      </Section>

      <Section title="Themes">
        <XStack gap="$3" alignItems="center" flexWrap="wrap">
          <Button>Default</Button>
          <Button theme="active">Active</Button>
          <Button theme="alt1">Alt 1</Button>
          <Button theme="alt2">Alt 2</Button>
        </XStack>
      </Section>

      <Section title="Disabled">
        <XStack gap="$3" alignItems="center" flexWrap="wrap">
          <Button disabled>Disabled</Button>
          <Button disabled theme="active">Disabled active</Button>
        </XStack>
      </Section>

      <Section title="With icon">
        <XStack gap="$3" alignItems="center" flexWrap="wrap">
          <Button icon={Heart}>Like</Button>
          <Button iconAfter={Heart}>Like</Button>
          <Button icon={Heart} circular accessibilityLabel="Like" />
        </XStack>
      </Section>

      <Section title="Interactive" hint={`Pressed ${count} time${count === 1 ? '' : 's'}`}>
        <XStack gap="$3" alignItems="center" flexWrap="wrap">
          <Button onPress={() => setCount((c) => c + 1)}>Increment</Button>
          <Button onPress={() => setCount(0)} theme="alt2">
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
