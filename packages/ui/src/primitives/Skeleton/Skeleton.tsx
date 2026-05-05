import React from 'react'
import { cn } from '../utils/cn'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'pulse' | 'shimmer'
  width?: string | number
  height?: string | number
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

const roundedMap: Record<NonNullable<SkeletonProps['rounded']>, string> = {
  none: 'rounded-none',
  sm:   'rounded-sm',
  md:   'rounded-md',
  lg:   'rounded-lg',
  full: 'rounded-full',
}

export function Skeleton({
  className,
  variant = 'pulse',
  width,
  height,
  rounded = 'md',
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        roundedMap[rounded],
        variant === 'pulse' && 'animate-pulse bg-muted',
        variant === 'shimmer' && [
          'bg-gradient-to-r from-muted via-muted/50 to-muted',
          'bg-[length:400%_100%]',
          'animate-[shimmer_2s_ease-in-out_infinite]',
        ],
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
      {...props}
    />
  )
}

/** Convenience: a row of skeleton items */
export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number
  className?: string
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          height={14}
          width={i === lines - 1 ? '66%' : '100%'}
          variant="shimmer"
        />
      ))}
    </div>
  )
}
