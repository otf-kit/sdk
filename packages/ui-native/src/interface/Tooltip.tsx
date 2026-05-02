import { type ReactNode } from 'react'
import { Popover, SizableText } from 'tamagui'

export type TooltipProps = { content: string; children: ReactNode; side?: 'top' | 'bottom' | 'left' | 'right' }

export function OtfTooltip({ content, children, side = 'top' }: TooltipProps) {
  return (
    <Popover size="$2" placement={side}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Content
        backgroundColor="$color11" borderRadius="$2"
        paddingHorizontal="$2.5" paddingVertical="$1.5" elevate
        enterStyle={{ opacity: 0, y: side === 'bottom' ? -4 : 4 }}
        exitStyle={{ opacity: 0, y: side === 'bottom' ? -4 : 4 }}
        opacity={1} y={0} animation="quick"
      >
        <Popover.Arrow backgroundColor="$color11" size="$1" />
        <SizableText size="$2" color="$color1">{content}</SizableText>
      </Popover.Content>
    </Popover>
  )
}
