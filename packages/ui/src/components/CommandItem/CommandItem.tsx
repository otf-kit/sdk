import React from 'react'
import { cn } from '../utils/cn'

interface CommandItemProps {
  icon?: React.ReactNode
  label: string
  description?: string
  shortcut?: string
  active?: boolean
  onClick?: () => void
  className?: string
}

export function CommandItem({ icon, label, description, shortcut, active, onClick, className }: CommandItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 cursor-pointer transition-colors',
        active ? 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]' : 'hover:bg-[hsl(var(--accent)/0.6)]',
        className
      )}
    >
      {icon && <span className="shrink-0 text-[hsl(var(--muted-foreground))] h-4 w-4 flex items-center justify-center">{icon}</span>}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate">{label}</p>
        {description && <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">{description}</p>}
      </div>
      {shortcut && (
        <kbd className="shrink-0 pointer-events-none inline-flex h-5 items-center gap-1 rounded border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-1.5 text-[10px] font-medium text-[hsl(var(--muted-foreground))]">
          {shortcut}
        </kbd>
      )}
    </div>
  )
}
