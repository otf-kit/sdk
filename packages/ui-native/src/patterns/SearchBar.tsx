import { useState } from 'react'
import { Input, SizableText, View, XStack } from 'tamagui'
import { Search, SlidersHorizontal, X } from '@tamagui/lucide-icons'

export type SearchBarProps = {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  onFilter?: () => void
  onCancel?: () => void
  autoFocus?: boolean
}

/**
 * Search input — Lucide leading magnifier, a clear (X) button that appears once
 * there's text, an optional filter affordance, and an animated focus ring.
 * (Previously rendered unicode ⌕ / ⫏ glyphs, had no clear button and no focus
 * state.)
 */
export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search…',
  onFilter,
  onCancel,
  autoFocus,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false)
  return (
    <XStack
      height={44}
      borderRadius="$10"
      backgroundColor="$color2"
      alignItems="center"
      paddingHorizontal="$3"
      gap="$2"
      borderWidth={1}
      borderColor={focused ? '$color8' : '$color4'}
      animation="quick"
    >
      <Search size={18} color={focused ? '$color11' : '$color8'} />
      <Input
        flex={1}
        size="$4"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="$color8"
        backgroundColor="transparent"
        borderWidth={0}
        autoFocus={autoFocus}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {value.length > 0 && (
        <View
          onPress={() => onChangeText('')}
          pressStyle={{ opacity: 0.6 }}
          cursor="pointer"
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={8}
        >
          <X size={16} color="$color8" />
        </View>
      )}
      {onFilter && (
        <View onPress={onFilter} pressStyle={{ opacity: 0.6 }} cursor="pointer" hitSlop={8}>
          <SlidersHorizontal size={18} color="$color9" />
        </View>
      )}
      {onCancel && (
        <SizableText size="$3" color="$color9" pressStyle={{ opacity: 0.6 }} onPress={onCancel}>
          Cancel
        </SizableText>
      )}
    </XStack>
  )
}
