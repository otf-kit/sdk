import React from 'react'
import { cn } from '../utils/cn'
import { Button } from '../primitives/button'

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
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-12 text-center', className)}>
      {icon && <EmptyStateIcon>{icon}</EmptyStateIcon>}
      <div className="space-y-1">
        <h3 className="font-semibold text-[hsl(var(--foreground))]">{title}</h3>
        {description && <p className="text-sm text-[hsl(var(--muted-foreground))]">{description}</p>}
      </div>
      {action && <Button onClick={action.onClick} className="mt-1">{action.label}</Button>}
    </div>
  )
}
