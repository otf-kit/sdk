import React from 'react'
import { Select, Adapt, Sheet, YStack, SizableText, type GetProps } from 'tamagui'
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'

export type OtfSelectItem = {
  label: string
  value: string
}

export type OtfSelectProps = {
  items: OtfSelectItem[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  label?: string
  size?: GetProps<typeof Select.Trigger>['size']
  disabled?: boolean
  width?: string | number
}

export function OtfSelect({
  items,
  value,
  onValueChange,
  placeholder = 'Select...',
  label,
  size = '$4',
  disabled,
  width = '100%',
}: OtfSelectProps) {
  return (
    <YStack gap="$1.5" width={width}>
      {label ? <SizableText size="$3" fontWeight="600">{label}</SizableText> : null}
      <Select
        value={value}
        onValueChange={onValueChange}
        disablePreventBodyScroll
        {...(disabled ? { disabled: true } : {})}
      >
        <Select.Trigger width="100%" iconAfter={() => <ChevronDown size={16} color="$color11" />} size={size}>
          <Select.Value placeholder={placeholder} />
        </Select.Trigger>

        <Adapt when={"maxMd" as any} platform="touch">
          <Sheet modal dismissOnSnapToBottom snapPointsMode="fit">
            <Sheet.Frame padding="$4">
              <Adapt.Contents />
            </Sheet.Frame>
            <Sheet.Overlay />
          </Sheet>
        </Adapt>

        <Select.Content zIndex={200000}>
          <Select.ScrollUpButton alignItems="center" justifyContent="center" height="$3">
            <ChevronUp size={16} color="$color11" />
          </Select.ScrollUpButton>
          <Select.Viewport minWidth={200}>
            <Select.Group>
              {items.map((item, i) => (
                <Select.Item index={i} key={item.value} value={item.value}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator marginLeft="auto">
                    <Check size={16} color="$color11" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton alignItems="center" justifyContent="center" height="$3">
            <ChevronDown size={16} color="$color11" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>
    </YStack>
  )
}
