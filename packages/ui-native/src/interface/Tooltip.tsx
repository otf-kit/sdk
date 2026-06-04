import { type ReactNode } from 'react'
import { Popover, SizableText, View } from 'tamagui'

export type TooltipProps = { content: string; children: ReactNode; side?: 'top' | 'bottom' | 'left' | 'right' }

export function OtfTooltip({ content, children, side = 'top' }: TooltipProps) {
  return (
    <Popover size="$2" placement={side}>
      {/* Wrap in a host View so the trigger ref is always a measurable DOM
          node on web — Tamagui's Popover positions via @floating-ui/dom,
          which calls getBoundingClientRect on the trigger. `asChild` passing
          straight to a non-host child (e.g. an Icon/SVG) crashed with
          "getBoundingClientRect is not a function". The View forwards to a
          div on web and a measurable host on native. */}
      <Popover.Trigger asChild>
        <View>{children}</View>
      </Popover.Trigger>
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
