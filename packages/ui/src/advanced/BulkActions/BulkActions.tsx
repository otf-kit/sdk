import React from 'react'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Button } from '../../primitives/button'

interface ActionDef {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  variant?: 'default' | 'destructive'
}

interface BulkActionsProps {
  count: number
  actions: ActionDef[]
  onClear: () => void
  className?: string
}

export function BulkActions({ count, actions, onClear, className }: BulkActionsProps) {
  if (count === 0) return null
  return (
    <div className={cn('fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2 shadow-lg', className)}>
      <span className="text-sm font-medium text-[hsl(var(--foreground))] pr-2 border-r border-[hsl(var(--border))]">
        {count} selected
      </span>
      <div className="flex items-center gap-1">
        {actions.map((action, i) => (
          <Button
            key={i}
            variant={action.variant === 'destructive' ? 'destructive' : 'ghost'}
            size="sm"
            className="h-7 gap-1.5 text-xs rounded-full px-3"
            onClick={action.onClick}
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
      <button onClick={onClear} className="ml-1 rounded-full p-0.5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
