import React from 'react'
import { Popover, Adapt, YStack } from 'tamagui'

export type OtfPopoverProps = {
  trigger: React.ReactNode
  children: React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  allowFlip?: boolean
  size?: string
}

export function OtfPopover({
  trigger,
  children,
  placement = 'bottom',
  allowFlip = true,
  size = '$5',
}: OtfPopoverProps) {
  return (
    <Popover size={size as any} allowFlip={allowFlip} placement={placement}>
      <Popover.Trigger asChild>
        {trigger}
      </Popover.Trigger>

      <Adapt when={"maxMd" as any} platform="touch">
        <Popover.Sheet modal dismissOnSnapToBottom snapPointsMode="fit">
          <Popover.Sheet.Frame padding="$4">
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay />
        </Popover.Sheet>
      </Adapt>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={['quick', { opacity: { overshootClamping: true } }]}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        <YStack gap="$3" padding="$3">
          {children}
        </YStack>
      </Popover.Content>
    </Popover>
  )
}
