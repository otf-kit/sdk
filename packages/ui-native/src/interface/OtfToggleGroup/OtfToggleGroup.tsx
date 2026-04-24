import { SizableText, XStack } from 'tamagui'

export type OtfToggleOption = { value: string; label: string }
export type OtfToggleGroupProps = {
  options: OtfToggleOption[]
  value: string
  onValueChange: (value: string) => void
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = { sm: '$2' as const, md: '$3' as const, lg: '$4' as const }

export function OtfToggleGroup({ options, value, onValueChange, size = 'md' }: OtfToggleGroupProps) {
  const textSize = sizeMap[size]
  return (
    <XStack borderRadius="$4" overflow="hidden" backgroundColor="$color2">
      {options.map((option, index) => {
        const isActive = option.value === value
        return (
          <XStack
            key={option.value} flex={1} justifyContent="center" alignItems="center"
            paddingVertical="$2" paddingHorizontal="$3"
            backgroundColor={isActive ? '$color9' : '$color2'}
            borderLeftWidth={index > 0 ? 1 : 0}
            borderLeftColor={isActive ? '$color9' : '$color4'}
            pressStyle={{ opacity: 0.7 }} onPress={() => onValueChange(option.value)} cursor="pointer"
          >
            <SizableText size={textSize} fontWeight={isActive ? '600' : '400'} color={isActive ? '$color1' : '$color11'}>
              {option.label}
            </SizableText>
          </XStack>
        )
      })}
    </XStack>
  )
}
