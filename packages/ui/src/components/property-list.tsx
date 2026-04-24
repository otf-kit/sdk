import React from 'react'
import { cn } from '../utils/cn'

interface PropertyListProps extends React.HTMLAttributes<HTMLDListElement> {}

export const PropertyList = React.forwardRef<HTMLDListElement, PropertyListProps>(
  ({ className, ...props }, ref) => (
    <dl ref={ref} className={cn('divide-y divide-[hsl(var(--border))]', className)} {...props} />
  )
)
PropertyList.displayName = 'PropertyList'

interface PropertyItemProps {
  label: string
  value: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function PropertyItem({ label, value, orientation = 'horizontal', className }: PropertyItemProps) {
  return (
    <div className={cn('py-3', orientation === 'horizontal' ? 'flex gap-4' : 'space-y-1', className)}>
      <dt className={cn('text-sm font-medium text-[hsl(var(--muted-foreground))] shrink-0', orientation === 'horizontal' && 'w-[40%]')}>
        {label}
      </dt>
      <dd className="text-sm text-[hsl(var(--foreground))] min-w-0">{value}</dd>
    </div>
  )
}
