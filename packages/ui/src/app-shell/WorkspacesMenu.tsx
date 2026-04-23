'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '../utils/cn'
import { useSidebar } from './Sidebar'

export interface Workspace {
  id: string
  name: string
  logo?: React.ReactNode
}

export interface WorkspacesMenuProps {
  workspaces: Workspace[]
  current: string
  onSelect: (id: string) => void
  className?: string
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export function WorkspacesMenu({ workspaces, current, onSelect, className }: WorkspacesMenuProps) {
  const { collapsed } = useSidebar()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const currentWorkspace = workspaces.find((w) => w.id === current)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div ref={ref} data-slot="workspaces-menu" className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          'flex items-center gap-2 w-full rounded-md px-2 py-1.5',
          'text-sm font-medium transition-colors',
          'hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          collapsed ? 'justify-center' : 'justify-between'
        )}
      >
        <span className="flex items-center gap-2 min-w-0">
          {/* Logo / initials avatar */}
          <span
            className={cn(
              'flex h-6 w-6 shrink-0 items-center justify-center rounded',
              'bg-primary/10 text-primary text-[10px] font-bold leading-none overflow-hidden'
            )}
          >
            {currentWorkspace?.logo ?? getInitials(currentWorkspace?.name ?? '?')}
          </span>
          {!collapsed && (
            <span className="truncate text-foreground">{currentWorkspace?.name ?? 'Select workspace'}</span>
          )}
        </span>
        {!collapsed && <ChevronDown className={cn('h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} />}
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Workspaces"
          className={cn(
            'absolute z-50 mt-1 w-52 rounded-md border border-border bg-popover shadow-md',
            collapsed ? 'left-full ml-2 top-0' : 'left-0'
          )}
        >
          <div className="py-1">
            {workspaces.map((ws) => (
              <button
                key={ws.id}
                role="option"
                aria-selected={ws.id === current}
                type="button"
                onClick={() => { onSelect(ws.id); setOpen(false) }}
                className={cn(
                  'flex items-center gap-2 w-full px-3 py-1.5 text-sm',
                  'hover:bg-accent transition-colors',
                  ws.id === current ? 'text-foreground font-medium' : 'text-muted-foreground'
                )}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary/10 text-primary text-[9px] font-bold overflow-hidden">
                  {ws.logo ?? getInitials(ws.name)}
                </span>
                <span className="flex-1 truncate text-left">{ws.name}</span>
                {ws.id === current && <Check className="h-3.5 w-3.5 shrink-0 text-primary" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
