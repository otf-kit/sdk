import React from 'react'
import { cn } from '../utils/cn'

interface StructuredListSectionProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function StructuredListSection({ title, children, className }: StructuredListSectionProps) {
  return (
    <div className={cn('', className)}>
      {title && <p className="px-4 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{title}</p>}
      <div className="rounded-md border border-[hsl(var(--border))] overflow-hidden divide-y divide-[hsl(var(--border))]">
        {children}
      </div>
    </div>
  )
}

interface StructuredListItemProps {
  left?: React.ReactNode
  title: string
  description?: string
  right?: React.ReactNode
  onClick?: () => void
  className?: string
}

export function StructuredListItem({ left, title, description, right, onClick, className }: StructuredListItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn('flex items-center gap-3 px-4 py-3 bg-[hsl(var(--card))]', onClick && 'cursor-pointer hover:bg-[hsl(var(--muted)/0.5)] transition-colors', className)}
    >
      {left && <div className="shrink-0">{left}</div>}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[hsl(var(--foreground))] truncate">{title}</p>
        {description && <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">{description}</p>}
      </div>
      {right && <div className="shrink-0 text-[hsl(var(--muted-foreground))]">{right}</div>}
    </div>
  )
}

interface StructuredListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const StructuredList = React.forwardRef<HTMLDivElement, StructuredListProps>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('space-y-4', className)} {...props} />
)
StructuredList.displayName = 'StructuredList'
