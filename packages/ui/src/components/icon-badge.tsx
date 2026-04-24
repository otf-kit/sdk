import React from 'react'
import { cn } from '../utils/cn'

type IconBadgeColor = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'purple'
type IconBadgeSize = 'sm' | 'md' | 'lg'

const colorMap: Record<IconBadgeColor, string> = {
  default: 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]',
  primary: 'bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]',
  success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
}

const sizeMap: Record<IconBadgeSize, string> = {
  sm: 'h-7 w-7 [&>*]:h-3.5 [&>*]:w-3.5',
  md: 'h-10 w-10 [&>*]:h-5 [&>*]:w-5',
  lg: 'h-14 w-14 [&>*]:h-7 [&>*]:w-7',
}

interface IconBadgeProps {
  icon: React.ReactNode
  color?: IconBadgeColor
  size?: IconBadgeSize
  className?: string
}

export function IconBadge({ icon, color = 'default', size = 'md', className }: IconBadgeProps) {
  return (
    <div className={cn('inline-flex items-center justify-center rounded-full shrink-0', colorMap[color], sizeMap[size], className)}>
      {icon}
    </div>
  )
}
