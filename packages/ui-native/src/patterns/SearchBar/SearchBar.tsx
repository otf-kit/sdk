import { Input, SizableText, XStack } from 'tamagui'

export type SearchBarProps = {
  value: string; onChangeText: (text: string) => void; placeholder?: string
  onFilter?: () => void; onCancel?: () => void; autoFocus?: boolean
}

export function SearchBar({ value, onChangeText, placeholder = 'Search\u2026', onFilter, onCancel, autoFocus }: SearchBarProps) {
  return (
    <XStack height={44} borderRadius="$10" backgroundColor="$color2" alignItems="center" paddingHorizontal="$3" gap="$2">
      <SizableText size="$4" color="$color8">{'\u2315'}</SizableText>
      <Input flex={1} size="$4" value={value} onChangeText={onChangeText} placeholder={placeholder}
        placeholderTextColor="$color8" backgroundColor="transparent" borderWidth={0} autoFocus={autoFocus} />
      {onFilter && <SizableText size="$4" color="$color9" pressStyle={{ opacity: 0.6 }} onPress={onFilter}>{'\u2ACF'}</SizableText>}
      {onCancel && <SizableText size="$3" color="$color9" pressStyle={{ opacity: 0.6 }} onPress={onCancel}>Cancel</SizableText>}
    </XStack>
  )
}
