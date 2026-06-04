import { useState } from 'react'
import { OtfToggleGroup, SizableText, YStack } from '@otfdashkit/ui-native'
import { Section, ShowcaseFrame } from '../../components/ShowcaseFrame'

const VIEW_OPTIONS = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'kanban', label: 'Kanban' },
]

const RANGE_OPTIONS = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
]

const UNIT_OPTIONS = [
  { value: 'metric', label: 'Metric' },
  { value: 'imperial', label: 'Imperial' },
]

export default function ToggleGroupShowcase() {
  const [view, setView] = useState('list')
  const [range, setRange] = useState('week')
  const [unit, setUnit] = useState('metric')
  const [smallVal, setSmallVal] = useState('day')
  const [largeVal, setLargeVal] = useState('month')

  return (
    <ShowcaseFrame
      title="Toggle Group"
      description="Single-select segmented control. Use for view toggles, time ranges, and unit pickers."
      docPath="packages/ui-native/src/interface/OtfToggleGroup.tsx"
    >
      <Section title="Default — three options" hint={`Selected: ${view}`}>
        <YStack gap="$2">
          <OtfToggleGroup options={VIEW_OPTIONS} value={view} onValueChange={setView} />
        </YStack>
      </Section>

      <Section title="Two options" hint={`Selected: ${unit}`}>
        <OtfToggleGroup options={UNIT_OPTIONS} value={unit} onValueChange={setUnit} />
      </Section>

      <Section title="Four options" hint={`Selected: ${range}`}>
        <OtfToggleGroup options={RANGE_OPTIONS} value={range} onValueChange={setRange} />
      </Section>

      <Section title="Sizes">
        <YStack gap="$3">
          <YStack gap="$1">
            <SizableText size="$2" color="$color11">Small</SizableText>
            <OtfToggleGroup
              options={RANGE_OPTIONS}
              value={smallVal}
              onValueChange={setSmallVal}
              size="sm"
            />
          </YStack>
          <YStack gap="$1">
            <SizableText size="$2" color="$color11">Medium (default)</SizableText>
            <OtfToggleGroup
              options={RANGE_OPTIONS}
              value={range}
              onValueChange={setRange}
              size="md"
            />
          </YStack>
          <YStack gap="$1">
            <SizableText size="$2" color="$color11">Large</SizableText>
            <OtfToggleGroup
              options={RANGE_OPTIONS}
              value={largeVal}
              onValueChange={setLargeVal}
              size="lg"
            />
          </YStack>
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
