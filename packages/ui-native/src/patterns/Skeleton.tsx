import { useEffect, useState } from 'react'
import { YStack } from 'tamagui'

export type SkeletonProps = { width?: number | string; height?: number; borderRadius?: number; variant?: 'text' | 'circular' | 'rectangular' }

// Premium loading skeleton — a continuous opacity pulse (0.35↔0.7) driven by
// Tamagui's own animation system (no react-native-reanimated peer). A static
// gray box reads "broken"; the pulse reads "loading". Marked as a progressbar
// for assistive tech.
export function Skeleton({ width, height, borderRadius, variant = 'rectangular' }: SkeletonProps) {
  const size = variant === 'circular' ? (height ?? 40) : height
  const w = variant === 'text' ? (width ?? '100%') : width
  const h = variant === 'text' ? (height ?? 16) : size
  const r = variant === 'circular' ? 9999 : (borderRadius ?? 8)

  const [bright, setBright] = useState(false)
  useEffect(() => {
    const id = setInterval(() => setBright((b) => !b), 700)
    return () => clearInterval(id)
  }, [])

  return (
    <YStack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      width={w as any}
      height={h}
      borderRadius={r}
      backgroundColor="$color3"
      opacity={bright ? 0.7 : 0.35}
      animation="slow"
      accessibilityRole="progressbar"
      aria-label="Loading"
    />
  )
}
