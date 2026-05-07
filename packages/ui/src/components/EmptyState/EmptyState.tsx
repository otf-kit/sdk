import React from 'react'
import { cn } from '../../utils/cn'
import { Button } from '../../primitives/button'

export const EmptyStateIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]', className)} {...props} />
  )
)
EmptyStateIcon.displayName = 'EmptyStateIcon'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
  secondaryAction?: { label: string; onClick: () => void }
  size?: 'sm' | 'default' | 'lg'
  className?: string
}

const sizeMap = {
  sm:      'py-8 gap-2',
  default: 'py-12 gap-3',
  lg:      'py-20 gap-4',
}

const titleSizeMap = {
  sm:      'text-sm font-semibold',
  default: 'text-base font-semibold',
  lg:      'text-lg font-semibold',
}

const descSizeMap = {
  sm:      'text-xs',
  default: 'text-sm',
  lg:      'text-base',
}

const iconSizeMap = {
  sm:      'h-10 w-10',
  default: 'h-12 w-12',
  lg:      'h-16 w-16',
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  size = 'default',
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center', sizeMap[size], className)}>
      {icon && (
        <EmptyStateIcon className={iconSizeMap[size]}>
          {icon}
        </EmptyStateIcon>
      )}
      <div className="space-y-1 max-w-sm">
        <h3 className={cn(titleSizeMap[size], 'text-[hsl(var(--foreground))]')}>{title}</h3>
        {description && (
          <p className={cn(descSizeMap[size], 'text-[hsl(var(--muted-foreground))]')}>
            {description}
          </p>
        )}
      </div>
      {(action || secondaryAction) && (
        <div className="flex items-center gap-2 mt-1">
          {action && (
            <Button size={size === 'sm' ? 'sm' : 'default'} onClick={action.onClick}>
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="outline"
              size={size === 'sm' ? 'sm' : 'default'}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
