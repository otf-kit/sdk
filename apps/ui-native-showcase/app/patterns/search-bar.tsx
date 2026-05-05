import { useState } from 'react'
import {
  SearchBar,
  YStack,
  XStack,
  SizableText,
  OtfButton,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

const ALL_RESULTS = [
  'Strength — Upper body',
  'Strength — Lower body',
  'Mobility — Hips',
  'Mobility — Shoulders',
  'Conditioning — Intervals',
  'Conditioning — Steady state',
  'Recovery — Yoga flow',
]

export default function SearchBarShowcase() {
  const [basic, setBasic] = useState('')
  const [filtered, setFiltered] = useState('')
  const [overlayQuery, setOverlayQuery] = useState('')
  const [overlayOpen, setOverlayOpen] = useState(false)

  const matches = ALL_RESULTS.filter((r) =>
    r.toLowerCase().includes(filtered.toLowerCase())
  )

  return (
    <ShowcaseFrame
      title="Search Bar"
      description="Pill input with leading glyph + clear button. Inline default, with-filter, with-cancel, and modal-overlay variants."
      docPath="packages/ui-native/src/patterns/SearchBar.tsx"
    >
      <Section title="Default" hint={basic ? `Typed: ${basic}` : 'Empty'}>
        <SearchBar value={basic} onChangeText={setBasic} placeholder="Search workouts" />
      </Section>

      <Section title="With filter button" hint="onFilter triggers a sheet in real apps">
        <SearchBar
          value=""
          onChangeText={() => {}}
          placeholder="Filter exercises"
          onFilter={() => {}}
        />
      </Section>

      <Section title="With cancel" hint="iOS-style focused state">
        <SearchBar
          value="upper body"
          onChangeText={() => {}}
          placeholder="Search"
          onCancel={() => {}}
        />
      </Section>

      <Section title="Filters live results" hint={`${matches.length} of ${ALL_RESULTS.length}`}>
        <YStack gap="$3">
          <SearchBar
            value={filtered}
            onChangeText={setFiltered}
            placeholder="Filter the list below"
            onFilter={() => {}}
          />
          <YStack
            gap="$1"
            borderWidth={1}
            borderColor="$borderColor"
            borderRadius="$3"
            padding="$2"
            backgroundColor="$background"
          >
            {matches.length === 0 ? (
              <SizableText size="$3" color="$color10" padding="$2">
                No results. Try clearing the search.
              </SizableText>
            ) : (
              matches.map((r) => (
                <XStack
                  key={r}
                  paddingHorizontal="$3"
                  paddingVertical="$2.5"
                  borderRadius="$2"
                  hoverStyle={{ backgroundColor: '$color3' }}
                >
                  <SizableText size="$3" color="$color12">{r}</SizableText>
                </XStack>
              ))
            )}
          </YStack>
        </YStack>
      </Section>

      <Section title="Modal overlay" hint={overlayOpen ? 'Open' : 'Closed'}>
        <YStack gap="$3">
          <OtfButton variant="outlined" onPress={() => setOverlayOpen(true)}>
            Open search overlay
          </OtfButton>

          {overlayOpen ? (
            <YStack
              borderWidth={1}
              borderColor="$borderColor"
              borderRadius="$4"
              backgroundColor="$background"
              padding="$3"
              gap="$3"
            >
              <SearchBar
                value={overlayQuery}
                onChangeText={setOverlayQuery}
                placeholder="What are you looking for?"
                autoFocus
                onCancel={() => {
                  setOverlayOpen(false)
                  setOverlayQuery('')
                }}
              />
              <YStack gap="$1">
                <SizableText size="$2" color="$color10" paddingHorizontal="$2">
                  Recent
                </SizableText>
                {['Hip mobility', 'Push day', 'Recovery'].map((r) => (
                  <XStack
                    key={r}
                    paddingHorizontal="$3"
                    paddingVertical="$2.5"
                    borderRadius="$2"
                    pressStyle={{ backgroundColor: '$color3' }}
                    onPress={() => setOverlayQuery(r)}
                  >
                    <SizableText size="$3" color="$color12">{r}</SizableText>
                  </XStack>
                ))}
              </YStack>
            </YStack>
          ) : null}
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
