import { useMemo, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import {
  ScrollView,
  YStack,
  XStack,
  H2,
  H3,
  Paragraph,
  SizableText,
  SearchBar,
  Pressable,
  ArrowRight,
  Boxes,
  LayoutGrid,
  LayoutTemplate,
  Shapes,
  useMedia,
} from '@otfdashkit/ui-native'
import type { ComponentType } from 'react'
import { CATALOG } from '../components/catalog'
import type { Category, Entry } from '../components/catalog'
import { INLINE_DEMOS } from '../components/inline-demos'

type CategoryId = Category['id']

interface CategoryChip {
  id: CategoryId
  label: string
  Icon: ComponentType<{ size?: number; color?: string }>
}

// Lucide icon per category gives the chip strip visual weight + a quick
// scan-anchor (emoji prefixes read template-grade in a Lucide-first kit).
const CATEGORY_CHIPS: CategoryChip[] = [
  { id: 'primitives', label: 'Primitives', Icon: Boxes },
  { id: 'interface',  label: 'Interface',  Icon: LayoutGrid },
  { id: 'layouts',    label: 'Layouts',    Icon: LayoutTemplate },
  { id: 'patterns',   label: 'Patterns',   Icon: Shapes },
]

interface FlatEntry extends Entry {
  categoryId: CategoryId
  categoryTitle: string
}

export default function ComponentsScreen() {
  const [query, setQuery] = useState('')
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<CategoryId[]>([])

  const media = useMedia()
  const insets = useSafeAreaInsets()
  const horizontalPadding = media.gtSm ? '$5' : '$4'
  const maxWidth = 720

  // Flatten the catalog so search/chip filter applies across all categories.
  const allEntries = useMemo<FlatEntry[]>(
    () =>
      CATALOG.flatMap((c) =>
        c.entries.map((e) => ({
          ...e,
          categoryId: c.id,
          categoryTitle: c.title,
        }))
      ),
    []
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const activeCategories = new Set<CategoryId>(selectedCategoryIds)

    return allEntries.filter((e) => {
      if (activeCategories.size > 0 && !activeCategories.has(e.categoryId)) {
        return false
      }
      if (q.length === 0) return true
      return (
        e.title.toLowerCase().includes(q) ||
        e.slug.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
      )
    })
  }, [allEntries, query, selectedCategoryIds])

  // Group filtered entries back by category for sectioned rendering.
  const byCategory = useMemo(() => {
    const map = new Map<CategoryId, FlatEntry[]>()
    for (const entry of filtered) {
      const list = map.get(entry.categoryId) ?? []
      list.push(entry)
      map.set(entry.categoryId, list)
    }
    return map
  }, [filtered])

  const totalCount = allEntries.length
  const filteredCount = filtered.length
  const hasActiveFilter = query.length > 0 || selectedCategoryIds.length > 0

  function toggleCategory(id: CategoryId) {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <ScrollView
      flex={1}
      backgroundColor="$background"
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 96 }}
    >
      {/* ── Header: search bar + filter icon ───────────────────────────── */}
      <YStack
        paddingHorizontal={horizontalPadding}
        paddingBottom="$4"
        maxWidth={maxWidth}
        width="100%"
        alignSelf="center"
      >
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Components, patterns"
          onFilter={() => {
            // Cycle: empty → all categories selected → empty.
            // Surfaces the chip strip below without needing a modal sheet.
            setSelectedCategoryIds((prev) =>
              prev.length === 0 ? CATEGORY_CHIPS.map((c) => c.id) : []
            )
          }}
        />
      </YStack>

      {/* ── Categories ─────────────────────────────────────────────────── */}
      <YStack
        paddingHorizontal={horizontalPadding}
        paddingBottom="$5"
        maxWidth={maxWidth}
        width="100%"
        alignSelf="center"
        gap="$3"
      >
        <H2 size="$8" fontWeight="700" letterSpacing={-0.4} color="$color12">
          Categories
        </H2>
        <XStack flexWrap="wrap" gap="$2.5">
          {CATEGORY_CHIPS.map((c) => (
            <CategoryFilterChip
              key={c.id}
              chip={c}
              active={selectedCategoryIds.includes(c.id)}
              onPress={() => toggleCategory(c.id)}
            />
          ))}
        </XStack>
      </YStack>

      {/* ── Components list ────────────────────────────────────────────── */}
      <YStack
        paddingHorizontal={horizontalPadding}
        paddingBottom="$6"
        maxWidth={maxWidth}
        width="100%"
        alignSelf="center"
        gap="$5"
      >
        <XStack alignItems="baseline" justifyContent="space-between" gap="$3">
          <H2 size="$8" fontWeight="700" letterSpacing={-0.4} color="$color12">
            {hasActiveFilter ? 'Matches' : 'Components'}
          </H2>
          <SizableText size="$2" color="$color11">
            {filteredCount === totalCount
              ? `${totalCount} total`
              : `${filteredCount} of ${totalCount}`}
          </SizableText>
        </XStack>

        {filteredCount === 0 ? (
          <EmptyResults query={query} />
        ) : (
          CATALOG.map((category) => {
            const entries = byCategory.get(category.id)
            if (!entries || entries.length === 0) return null
            return (
              <YStack key={category.id} gap="$4">
                <SizableText
                  size="$2"
                  color="$color11"
                  textTransform="uppercase"
                  letterSpacing={1}
                  fontWeight="600"
                >
                  {category.title}
                </SizableText>
                <YStack gap="$5">
                  {entries.map((entry) => (
                    <ComponentSection key={entry.slug} entry={entry} />
                  ))}
                </YStack>
              </YStack>
            )
          })
        )}
      </YStack>
    </ScrollView>
  )
}

// ── Category chip ─────────────────────────────────────────────────────────
//
// Filled neutral pill with emoji + label. Mirrors the reference layout
// (gray fill, no border, generous padding). Active state swaps fill to
// the active palette's `$color5` band so the chip reads as "selected"
// without breaking the soft visual rhythm.
function CategoryFilterChip({
  chip,
  active,
  onPress,
}: {
  chip: CategoryChip
  active: boolean
  onPress: () => void
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <XStack
        paddingHorizontal="$3.5"
        paddingVertical="$2.5"
        borderRadius="$4"
        backgroundColor={active ? '$color5' : '$color3'}
        alignItems="center"
        gap="$2"
        hoverStyle={{ backgroundColor: active ? '$color6' : '$color4' }}
        pressStyle={{ scale: 0.97 }}
      >
        <chip.Icon size={16} color={active ? '$color12' : '$color11'} />
        <SizableText
          size="$3"
          fontWeight={active ? '700' : '500'}
          color="$color12"
        >
          {chip.label}
        </SizableText>
      </XStack>
    </Pressable>
  )
}

function ComponentSection({ entry }: { entry: FlatEntry }) {
  const Demo = INLINE_DEMOS[entry.slug]
  return (
    <YStack gap="$3">
      <YStack gap="$0.5">
        <H3 size="$7" fontWeight="700" letterSpacing={-0.3}>
          {entry.title}
        </H3>
        <Paragraph size="$3" color="$color11" maxWidth={620}>
          {entry.description}
        </Paragraph>
      </YStack>
      {Demo ? <Demo /> : <LinkOutCard entry={entry} />}
    </YStack>
  )
}

function LinkOutCard({ entry }: { entry: FlatEntry }) {
  const href = `/${entry.categoryId}/${entry.slug}`
  return (
    <Link href={href as never} asChild>
      <XStack
        padding="$4"
        borderRadius="$4"
        borderWidth={1}
        borderColor="$borderColor"
        backgroundColor="$color2"
        alignItems="center"
        justifyContent="space-between"
        gap="$3"
        hoverStyle={{ backgroundColor: '$color3', borderColor: '$borderColorHover' }}
        pressStyle={{ scale: 0.99 }}
        cursor="pointer"
      >
        <YStack gap="$0.5" flex={1}>
          <SizableText size="$3" fontWeight="600" color="$color12">
            View full demo
          </SizableText>
          <SizableText size="$2" color="$color11">
            All variants of {entry.title}
          </SizableText>
        </YStack>
        <ArrowRight size={18} color="$color11" />
      </XStack>
    </Link>
  )
}

function EmptyResults({ query }: { query: string }) {
  return (
    <YStack
      padding="$6"
      borderRadius="$5"
      borderWidth={1}
      borderColor="$borderColor"
      backgroundColor="$color2"
      alignItems="center"
      justifyContent="center"
      gap="$2"
      minHeight={180}
    >
      <SizableText size="$5" fontWeight="700" color="$color12">
        No matches
      </SizableText>
      <SizableText size="$3" color="$color11" textAlign="center" maxWidth={420}>
        {query
          ? `Nothing matches "${query}". Try a different search or clear filters.`
          : 'No components match the active category filter.'}
      </SizableText>
    </YStack>
  )
}
