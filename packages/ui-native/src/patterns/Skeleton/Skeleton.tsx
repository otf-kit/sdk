import { YStack } from 'tamagui'

export type SkeletonProps = { width?: number | string; height?: number; borderRadius?: number; variant?: 'text' | 'circular' | 'rectangular' }

export function Skeleton({ width, height, borderRadius, variant = 'rectangular' }: SkeletonProps) {
  const size = variant === 'circular' ? (height ?? 40) : height
  const w = variant === 'text' ? (width ?? '100%') : width
  const h = variant === 'text' ? (height ?? 16) : size
  const r = variant === 'circular' ? 9999 : (borderRadius ?? 8)
  return <YStack width={w as any} height={h} borderRadius={r} backgroundColor="$color3" opacity={0.6} animation="slow" enterStyle={{ opacity: 0.3 }} exitStyle={{ opacity: 0.3 }} />
}
