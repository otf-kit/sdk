import { useState } from 'react'
import { Input, YStack, XStack, SizableText, Label, Search } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function InputShowcase() {
  const [value, setValue] = useState('')
  const [email, setEmail] = useState('')

  return (
    <ShowcaseFrame
      title="Input"
      description="Single-line text field — sizes, focus states, disabled, with label."
      docPath="packages/ui-native/src/primitives/Input.tsx"
    >
      <Section title="Sizes">
        <YStack gap="$3">
          <Input size="$2" placeholder="Small" />
          <Input size="$3" placeholder="Default" />
          <Input size="$4" placeholder="Medium" />
          <Input size="$5" placeholder="Large" />
        </YStack>
      </Section>

      <Section title="With label">
        <YStack gap="$2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="hello@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <SizableText size="$1" color="$color10">
            We never sell your address.
          </SizableText>
        </YStack>
      </Section>

      <Section title="Disabled">
        <Input placeholder="Disabled" disabled value="Read-only" />
      </Section>

      <Section title="Controlled" hint={`Length: ${value.length}`}>
        <YStack gap="$2">
          <Input
            placeholder="Type something…"
            value={value}
            onChangeText={setValue}
          />
          <SizableText size="$2" color="$color11">
            Value: {value || <SizableText color="$color8">empty</SizableText>}
          </SizableText>
        </YStack>
      </Section>

      <Section title="Inline composition">
        <XStack gap="$2" alignItems="center">
          <Search size={16} />
          <Input flex={1} placeholder="Search activities…" />
        </XStack>
      </Section>
    </ShowcaseFrame>
  )
}
