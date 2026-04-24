import type { ReactNode } from 'react'
import { styled, YStack } from 'tamagui'

export type GlassCardProps = {
  children: ReactNode
  intensity?: 'light' | 'medium' | 'heavy'
  tint?: 'light' | 'dark'
  borderRadius?: number | string
  padding?: number | string
  elevated?: boolean
}

const BLUR: Record<string, number> = { light: 8, medium: 16, heavy: 24 }
const TINT_BG: Record<string, string> = {
  light: 'rgba(255,255,255,0.15)',
  dark: 'rgba(0,0,0,0.25)',
}

const GlassFrame = styled(YStack, {
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.2)',
  overflow: 'hidden',
})

export function GlassCard({
  children,
  intensity = 'medium',
  tint = 'light',
  borderRadius = '$4',
  padding = '$4',
  elevated = false,
}: GlassCardProps) {
  const blur = BLUR[intensity]

  return (
    <GlassFrame
      borderRadius={borderRadius as any}
      padding={padding as any}
      backgroundColor={TINT_BG[tint]}
      elevation={elevated ? 4 : 0}
      shadowColor={elevated ? '$shadowColor' : undefined}
      shadowRadius={elevated ? 20 : undefined}
      shadowOpacity={elevated ? 0.3 : undefined}
      // @ts-ignore — backdropFilter supported on web + iOS
      style={{ backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)` }}
    >
      {children}
    </GlassFrame>
  )
}
