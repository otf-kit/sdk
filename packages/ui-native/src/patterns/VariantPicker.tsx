import { SizableText, XStack, YStack } from 'tamagui'

export type VariantOption = {
  value: string
  label: string
  /** Optional color swatch — a CSS color from product data (not a design token). */
  swatch?: string
  disabled?: boolean
}

export type VariantPickerProps = {
  /** Group label, e.g. "Grind" or "Size". */
  label?: string
  options: VariantOption[]
  value?: string
  onChange?: (value: string) => void
  /** Selected border tint. Default `$color9`. */
  accent?: string
}

/** Single-select product-option picker (grind, size, color) with selected + out-of-stock states. */
export function VariantPicker({ label, options, value, onChange, accent = '$color9' }: VariantPickerProps) {
  return (
    <YStack gap="$2">
      {label ? (
        <SizableText size="$1" fontWeight="700" color="$color10" textTransform="uppercase" letterSpacing={0.6}>
          {label}
        </SizableText>
      ) : null}
      <XStack gap="$2" flexWrap="wrap">
        {options.map((opt) => {
          const selected = value === opt.value
          return (
            <XStack
              key={opt.value}
              alignItems="center"
              gap="$2"
              paddingHorizontal="$3"
              paddingVertical="$2"
              borderRadius="$4"
              borderWidth={1}
              borderColor={selected ? accent : '$color5'}
              backgroundColor={selected ? '$color3' : 'transparent'}
              opacity={opt.disabled ? 0.4 : 1}
              onPress={opt.disabled ? undefined : () => onChange?.(opt.value)}
              pressStyle={opt.disabled ? undefined : { scale: 0.97, opacity: 0.9 }}
              cursor={opt.disabled ? 'default' : 'pointer'}
              accessibilityRole="radio"
              accessibilityState={{ selected, disabled: !!opt.disabled }}
            >
              {opt.swatch ? (
                <YStack
                  width={16}
                  height={16}
                  borderRadius={8}
                  backgroundColor={opt.swatch as never}
                  borderWidth={1}
                  borderColor="$color5"
                />
              ) : null}
              <SizableText
                size="$3"
                fontWeight="600"
                color={selected ? '$color12' : '$color11'}
                textDecorationLine={opt.disabled ? 'line-through' : 'none'}
              >
                {opt.label}
              </SizableText>
            </XStack>
          )
        })}
      </XStack>
    </YStack>
  )
}
