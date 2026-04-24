import React from 'react'
import { styled, View, SizableText, type GetProps, type SizeTokens } from 'tamagui'

// ── Styled sub-parts ─────────────────────────────────────────────

const EmptyStateFrame = styled(View, {
  name: 'OtfEmptyState',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: '$6',
  paddingHorizontal: '$4',
  gap: '$3',
})

const EmptyStateTitle = styled(SizableText, {
  name: 'OtfEmptyStateTitle',
  fontWeight: '600',
  color: '$color12',
  textAlign: 'center',
})

const EmptyStateDescription = styled(SizableText, {
  name: 'OtfEmptyStateDescription',
  color: '$color8',
  textAlign: 'center',
  size: '$4',
})

// ── Component ────────────────────────────────────────────────────

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  secondaryAction?: React.ReactNode
  size?: 'sm' | 'default' | 'lg'
}

const sizeMap: Record<string, { titleSize: SizeTokens; iconSize: number; py: SizeTokens }> = {
  sm: { titleSize: '$5', iconSize: 32, py: '$4' },
  default: { titleSize: '$6', iconSize: 40, py: '$6' },
  lg: { titleSize: '$7', iconSize: 56, py: '$8' },
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  size = 'default',
}: EmptyStateProps) {
  const s = sizeMap[size]!

  return (
    <EmptyStateFrame paddingVertical={s.py}>
      {icon && (
        <View opacity={0.5} marginBottom="$1">
          {icon}
        </View>
      )}
      <EmptyStateTitle size={s.titleSize as any}>{title}</EmptyStateTitle>
      {description && <EmptyStateDescription>{description}</EmptyStateDescription>}
      {action && <View marginTop="$2">{action}</View>}
      {secondaryAction && <View marginTop="$1">{secondaryAction}</View>}
    </EmptyStateFrame>
  )
}
