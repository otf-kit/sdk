import { Minus, Plus } from '@tamagui/lucide-icons'
import { SizableText, XStack } from 'tamagui'

export type QuantityStepperProps = {
  value: number
  onChange?: (value: number) => void
  /** Minimum (decrement disables here). Default 1. */
  min?: number
  /** Maximum (increment disables here). Default 99. */
  max?: number
  step?: number
  size?: 'sm' | 'md'
  disabled?: boolean
}

/** Increment / decrement quantity control with min/max clamping. */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  step = 1,
  size = 'md',
  disabled = false,
}: QuantityStepperProps) {
  const dim = size === 'sm' ? 30 : 38
  const iconSize = size === 'sm' ? 14 : 18
  const commit = (next: number) => onChange?.(Math.max(min, Math.min(max, next)))
  const atMin = disabled || value <= min
  const atMax = disabled || value >= max
  return (
    <XStack alignItems="center" borderWidth={1} borderColor="$color5" borderRadius="$4" overflow="hidden">
      <XStack
        width={dim}
        height={dim}
        alignItems="center"
        justifyContent="center"
        opacity={atMin ? 0.4 : 1}
        onPress={atMin ? undefined : () => commit(value - step)}
        pressStyle={atMin ? undefined : { backgroundColor: '$color3' }}
        cursor={atMin ? 'default' : 'pointer'}
        accessibilityRole="button"
        accessibilityLabel="Decrease quantity"
      >
        <Minus size={iconSize} color="$color11" />
      </XStack>
      <SizableText
        size={size === 'sm' ? '$3' : '$4'}
        fontWeight="600"
        color="$color12"
        minWidth={28}
        textAlign="center"
      >
        {value}
      </SizableText>
      <XStack
        width={dim}
        height={dim}
        alignItems="center"
        justifyContent="center"
        opacity={atMax ? 0.4 : 1}
        onPress={atMax ? undefined : () => commit(value + step)}
        pressStyle={atMax ? undefined : { backgroundColor: '$color3' }}
        cursor={atMax ? 'default' : 'pointer'}
        accessibilityRole="button"
        accessibilityLabel="Increase quantity"
      >
        <Plus size={iconSize} color="$color11" />
      </XStack>
    </XStack>
  )
}
