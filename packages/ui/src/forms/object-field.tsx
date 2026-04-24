import React, { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '../utils/cn'

export interface ObjectFieldProps {
  title: string
  description?: string
  collapsible?: boolean
  defaultOpen?: boolean
  children: React.ReactNode
  className?: string
}

export function ObjectField({
  title,
  description,
  collapsible = false,
  defaultOpen = true,
  children,
  className,
}: ObjectFieldProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={cn('rounded-md border border-[hsl(var(--border))] overflow-hidden', className)}>
      <div
        className={cn(
          'flex items-center justify-between px-4 py-3 bg-[hsl(var(--muted)/0.4)]',
          collapsible && 'cursor-pointer hover:bg-[hsl(var(--accent))] transition-colors'
        )}
        onClick={() => collapsible && setOpen(o => !o)}
        role={collapsible ? 'button' : undefined}
        tabIndex={collapsible ? 0 : undefined}
        onKeyDown={e => collapsible && e.key === 'Enter' && setOpen(o => !o)}
      >
        <div>
          <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">{title}</h4>
          {description && <p className="text-xs text-[hsl(var(--muted-foreground))]">{description}</p>}
        </div>
        {collapsible && (
          open
            ? <ChevronDown className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            : <ChevronRight className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
        )}
      </div>
      {(!collapsible || open) && (
        <div className="p-4 flex flex-col gap-4">
          {children}
        </div>
      )}
    </div>
  )
}
