import { useState } from 'react'
import { Chip, ChipGroup, XStack, YStack, SizableText } from '@otf/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function ChipShowcase() {
  const [selected, setSelected] = useState<string[]>(['react'])

  const tags = [
    { id: 'react', label: 'React' },
    { id: 'ts', label: 'TypeScript' },
    { id: 'expo', label: 'Expo' },
    { id: 'tamagui', label: 'Tamagui' },
    { id: 'reanimated', label: 'Reanimated' },
  ]

  return (
    <ShowcaseFrame
      title="Chip"
      description="Selectable pill — used for filters, tags, and toggle groups."
      docPath="packages/ui-native/src/patterns/Chip.tsx"
    >
      <Section title="Variants">
        <XStack gap="$2" flexWrap="wrap">
          <Chip label="Filled" variant="filled" />
          <Chip label="Outlined" variant="outlined" />
        </XStack>
      </Section>

      <Section title="Sizes">
        <XStack gap="$2" alignItems="center" flexWrap="wrap">
          <Chip label="Small" size="sm" />
          <Chip label="Medium" size="md" />
          <Chip label="Large" size="lg" />
        </XStack>
      </Section>

      <Section title="Selected state">
        <XStack gap="$2" flexWrap="wrap">
          <Chip label="Inactive" />
          <Chip label="Active" selected />
          <Chip label="Active outlined" selected variant="outlined" />
        </XStack>
      </Section>

      <Section title="With remove">
        <XStack gap="$2" flexWrap="wrap">
          <Chip label="React" onRemove={() => {}} />
          <Chip label="TypeScript" onRemove={() => {}} />
          <Chip label="Expo" onRemove={() => {}} />
        </XStack>
      </Section>

      <Section title="ChipGroup — multi-select" hint={`Selected: ${selected.length}`}>
        <YStack gap="$2">
          <ChipGroup
            chips={tags}
            selected={selected}
            onSelectionChange={setSelected}
            multiSelect
          />
          <SizableText size="$2" color="$color10">
            {selected.length === 0 ? 'No chips selected' : selected.join(', ')}
          </SizableText>
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
