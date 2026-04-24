import { styled, View, type GetProps } from 'tamagui'

/**
 * Native Skeleton — mirrors @otf/ui Skeleton API.
 * Uses Tamagui $color scale tokens for background.
 */
export const Skeleton = styled(View, {
  name: 'OtfSkeleton',
  backgroundColor: '$color4',
  borderRadius: '$3',
  opacity: 0.6,
  animation: 'medium',

  enterStyle: { opacity: 0.3 },
  exitStyle: { opacity: 0 },

  variants: {
    variant: {
      pulse: {},
      static: { animation: undefined as any },
    },
    rounded: {
      full: { borderRadius: 999 },
      lg: { borderRadius: '$5' },
      md: { borderRadius: '$3' },
      sm: { borderRadius: '$2' },
    },
  } as const,

  defaultVariants: {
    variant: 'pulse',
  },
})

export type SkeletonProps = GetProps<typeof Skeleton>

/**
 * SkeletonText — text-shaped skeleton placeholder
 */
export const SkeletonText = styled(Skeleton, {
  name: 'OtfSkeletonText',
  height: 14,
  width: '70%',
  borderRadius: '$2',

  variants: {
    lines: {
      1: {},
      2: { height: 30 },
      3: { height: 46 },
    },
  } as const,

  defaultVariants: {
    lines: 1,
  },
})

export type SkeletonTextProps = GetProps<typeof SkeletonText>
