import { Switch as TamaguiSwitch } from 'tamagui'

export type OtfSwitchProps = {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  size?: '$2' | '$3' | '$4'
  accessibilityLabel?: string
}

/**
 * Premium switch — visible track in BOTH states, a white thumb with a soft
 * drop shadow, and an accent fill when on. Wraps Tamagui's accessible Switch
 * primitive so callers never have to hand-wire `<Switch.Thumb>` or fight the
 * dim default track (which reads near-invisible on a dark surface — the
 * "not premium" tell).
 *
 *   <OtfSwitch checked={on} onCheckedChange={setOn} />
 */
export function OtfSwitch({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  size = '$3',
  accessibilityLabel,
}: OtfSwitchProps) {
  return (
    <TamaguiSwitch
      size={size}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      animation="quick"
      borderWidth={0}
      backgroundColor={checked ? '$color9' : '$color5'}
      opacity={disabled ? 0.4 : 1}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      hoverStyle={{ backgroundColor: checked ? '$color10' : '$color6' }}
      pressStyle={{ opacity: disabled ? 0.4 : 0.85 }}
      focusStyle={{ outlineWidth: 2, outlineColor: '$color8', outlineStyle: 'solid' }}
    >
      <TamaguiSwitch.Thumb
        animation="quick"
        backgroundColor="white"
        shadowColor="rgba(0,0,0,0.35)"
        shadowRadius={4}
        shadowOffset={{ width: 0, height: 2 }}
      />
    </TamaguiSwitch>
  )
}
