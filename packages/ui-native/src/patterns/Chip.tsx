import { type ReactNode, useCallback } from 'react'
import { SizableText, XStack } from 'tamagui'
import { Check, X } from '@tamagui/lucide-icons'

export type ChipProps = {
  label: string
  selected?: boolean
  onPress?: () => void
  onRemove?: () => void
  variant?: 'filled' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  color?: string
}

export type ChipGroupProps = {
  chips: { id: string; label: string; icon?: ReactNode }[]
  selected?: string[]
  onSelectionChange?: (selected: string[]) => void
  multiSelect?: boolean
  variant?: 'filled' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
}

const sizes = { sm: { h: 28, px: '$2', text: '$2' }, md: { h: 34, px: '$3', text: '$3' }, lg: { h: 42, px: '$4', text: '$4' } } as const

export function Chip({ label, selected, onPress, onRemove, variant = 'filled', size = 'md', icon, color }: ChipProps) {
  const s = sizes[size]
  const filled = variant === 'filled'
  const active = selected ?? false
  const bg = active ? (color ?? '$color9') : filled ? '$color3' : 'transparent'
  const border = active ? (color ?? '$color9') : '$color6'
  const fg = active ? '$color1' : '$color11'

  return (
    <XStack
      height={s.h} borderRadius="$10" paddingHorizontal={s.px}
      backgroundColor={bg} borderWidth={filled ? 0 : 1} borderColor={border}
      alignItems="center" gap="$1.5" pressStyle={{ scale: 0.96, opacity: 0.85 }}
      animation="quick" onPress={onPress} cursor="pointer"
    >
      {active && <Check size={14} color={fg} />}
      {icon && <SizableText color={fg}>{icon}</SizableText>}
      <SizableText size={s.text} color={fg} fontWeight="500">{label}</SizableText>
      {onRemove && (
        <XStack marginLeft="$1" opacity={0.7} pressStyle={{ opacity: 1 }} cursor="pointer"
          onPress={(e: any) => { e.stopPropagation?.(); onRemove() }}>
          <X size={14} color={fg} />
        </XStack>
      )}
    </XStack>
  )
}

export function ChipGroup({ chips, selected = [], onSelectionChange, multiSelect = true, variant, size }: ChipGroupProps) {
  const toggle = useCallback((id: string) => {
    if (!onSelectionChange) return
    const isSelected = selected.includes(id)
    if (multiSelect) {
      onSelectionChange(isSelected ? selected.filter(s => s !== id) : [...selected, id])
    } else {
      onSelectionChange(isSelected ? [] : [id])
    }
  }, [selected, onSelectionChange, multiSelect])

  return (
    <XStack flexWrap="wrap" gap="$2">
      {chips.map(chip => (
        <Chip key={chip.id} label={chip.label} icon={chip.icon} selected={selected.includes(chip.id)}
          onPress={() => toggle(chip.id)} variant={variant} size={size} />
      ))}
    </XStack>
  )
}
