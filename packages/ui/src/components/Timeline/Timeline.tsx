import React from 'react'
import { cn } from '../utils/cn'

type TimelineVariant = 'default' | 'success' | 'error' | 'warning'

const dotColors: Record<TimelineVariant, string> = {
  default: 'bg-[hsl(var(--primary))]',
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500',
}

interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('pb-1', className)} {...props} />
)
TimelineContent.displayName = 'TimelineContent'

export function TimelineConnector({ className }: { className?: string }) {
  return <div className={cn('absolute left-[7px] top-5 bottom-0 w-0.5 bg-[hsl(var(--border))]', className)} />
}

interface TimelineItemProps {
  icon?: React.ReactNode
  title: string
  description?: string
  timestamp?: string
  variant?: TimelineVariant
  isLast?: boolean
  className?: string
}

export function TimelineItem({ icon, title, description, timestamp, variant = 'default', isLast, className }: TimelineItemProps) {
  return (
    <div className={cn('relative flex gap-4', !isLast && 'pb-6', className)}>
      <div className="relative flex-none">
        <div className={cn('h-4 w-4 rounded-full border-2 border-[hsl(var(--background))] flex items-center justify-center mt-0.5', dotColors[variant])}>
          {icon && <span className="text-white text-[8px]">{icon}</span>}
        </div>
        {!isLast && <TimelineConnector />}
      </div>
      <TimelineContent>
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-sm font-medium text-[hsl(var(--foreground))]">{title}</p>
          {timestamp && <span className="text-xs text-[hsl(var(--muted-foreground))] shrink-0">{timestamp}</span>}
        </div>
        {description && <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">{description}</p>}
      </TimelineContent>
    </div>
  )
}

interface TimelineProps {
  children: React.ReactNode
  className?: string
}

export function Timeline({ children, className }: TimelineProps) {
  const items = React.Children.toArray(children)
  return (
    <div className={cn('', className)}>
      {items.map((child, i) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<TimelineItemProps>, { isLast: i === items.length - 1 })
          : child
      )}
    </div>
  )
}
