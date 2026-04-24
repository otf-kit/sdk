import React from 'react'
import { cn } from '../utils/cn'

const colorMap = {
  primary: 'bg-[hsl(var(--primary))]',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
}

const sizeMap = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2.5 w-2.5',
  lg: 'h-3.5 w-3.5',
}

export interface BeaconProps {
  color?: keyof typeof colorMap
  size?: keyof typeof sizeMap
  children?: React.ReactNode
  className?: string
}

function BeaconDot({ color = 'primary', size = 'md' }: Pick<BeaconProps, 'color' | 'size'>) {
  return (
    <span className="relative flex">
      <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', colorMap[color])} />
      <span className={cn('relative inline-flex rounded-full', sizeMap[size], colorMap[color])} />
    </span>
  )
}

export function Beacon({ color = 'primary', size = 'md', children, className }: BeaconProps) {
  if (!children) {
    return (
      <span className={cn('inline-flex', className)}>
        <BeaconDot color={color} size={size} />
      </span>
    )
  }

  return (
    <span className={cn('relative inline-flex', className)}>
      {children}
      <span className="absolute -top-1 -right-1 flex">
        <BeaconDot color={color} size={size} />
      </span>
    </span>
  )
}
