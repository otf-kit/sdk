'use client'

import React, { useEffect, useRef, useState } from 'react'
import { LogOut, Settings, User } from 'lucide-react'
import { cn } from '../utils/cn'
import { useSidebar } from './Sidebar'

export interface AppShellUserMenuProps {
  name: string
  email: string
  avatar?: string
  onSignOut: () => void
  onProfile?: () => void
  onSettings?: () => void
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

export function AppShellUserMenu({ name, email, avatar, onSignOut, onProfile, onSettings, className }: AppShellUserMenuProps) {
  const { collapsed } = useSidebar()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

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
    <div ref={ref} data-slot="user-menu" className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          'flex items-center gap-2.5 w-full rounded-md px-2 py-1.5',
          'text-sm transition-colors',
          'hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          collapsed ? 'justify-center' : ''
        )}
      >
        {/* Avatar */}
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="h-7 w-7 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            className={cn(
              'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
              'bg-primary/15 text-primary text-xs font-semibold leading-none'
            )}
          >
            {getInitials(name)}
          </span>
        )}
        {!collapsed && (
          <span className="flex flex-col items-start min-w-0 flex-1">
            <span className="truncate text-sm font-medium text-foreground leading-tight">{name}</span>
            <span className="truncate text-xs text-muted-foreground leading-tight">{email}</span>
          </span>
        )}
      </button>

      {open && (
        <div
          role="menu"
          aria-label="User menu"
          className={cn(
            'absolute z-50 w-52 rounded-md border border-border bg-popover shadow-md',
            collapsed ? 'left-full ml-2 bottom-0' : 'left-0 bottom-full mb-1'
          )}
        >
          {/* User info header */}
          <div className="px-3 py-2 border-b border-border">
            <p className="text-sm font-medium text-foreground truncate">{name}</p>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
          <div className="py-1">
            {onProfile && (
              <button
                role="menuitem"
                type="button"
                onClick={() => { onProfile?.(); setOpen(false) }}
                className="flex items-center gap-2.5 w-full px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                <User className="h-4 w-4 shrink-0" />
                Profile
              </button>
            )}
            {onSettings && (
              <button
                role="menuitem"
                type="button"
                onClick={() => { onSettings?.(); setOpen(false) }}
                className="flex items-center gap-2.5 w-full px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                <Settings className="h-4 w-4 shrink-0" />
                Settings
              </button>
            )}
          </div>
          <div className="border-t border-border py-1">
            <button
              role="menuitem"
              type="button"
              onClick={() => { onSignOut(); setOpen(false) }}
              className="flex items-center gap-2.5 w-full px-3 py-1.5 text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
