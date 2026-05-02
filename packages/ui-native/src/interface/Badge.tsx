import { styled, SizableText, View } from 'tamagui'
import type { ReactNode } from 'react'

const BadgeFrame = styled(View, {
  name: 'OtfBadge',
  paddingHorizontal: '$2',
  paddingVertical: '$1',
  borderRadius: '$10',
  backgroundColor: '$color3',
  alignSelf: 'flex-start',
  variants: {
    variant: {
      default: { backgroundColor: '$color3' },
      success: { backgroundColor: '$green3' },
      warning: { backgroundColor: '$yellow3' },
      error: { backgroundColor: '$red3' },
      info: { backgroundColor: '$blue3' },
    },
  } as const,
  defaultVariants: { variant: 'default' },
})

const BadgeText = styled(SizableText, {
  name: 'OtfBadgeText',
  size: '$2',
  fontWeight: '600',
  color: '$color11',
})

export type BadgeProps = {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <BadgeFrame variant={variant}>
      <BadgeText>{children}</BadgeText>
    </BadgeFrame>
  )
}
