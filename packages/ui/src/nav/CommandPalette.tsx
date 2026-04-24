// @ts-nocheck — cmdk compiled against @types/react@19 but project uses @types/react@18
'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Command } from 'cmdk'
import { Search, X } from 'lucide-react'
import { cn } from '../utils/cn'

/* ── Types ───────────────────────────────────────────────────────── */

export interface CommandItem {
  id: string
  label: string
  icon?: React.ReactNode
  shortcut?: string
  description?: string
  onSelect: () => void
}

export interface CommandGroup {
  heading: string
  items: CommandItem[]
}

export interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  groups: CommandGroup[]
  placeholder?: string
  className?: string
}

/* ── Global open/close context ───────────────────────────────────── */

interface CommandPaletteContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const CommandPaletteCtx = createContext<CommandPaletteContextValue>({
  open: false,
  setOpen: () => {},
  toggle: () => {},
})

export function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const toggle = useCallback(() => setOpen((v) => !v), [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        // Don't hijack '/' in inputs
        if (e.key === '/' && (e.target as HTMLElement).tagName !== 'BODY') return
        e.preventDefault()
        toggle()
      }
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [toggle])

  return (
    <CommandPaletteCtx.Provider value={{ open, setOpen, toggle }}>
      {children}
    </CommandPaletteCtx.Provider>
  )
}

export function useCommandPalette() {
  return useContext(CommandPaletteCtx)
}

/* ── CommandPalette component ────────────────────────────────────── */

export function CommandPalette({
  open,
  onOpenChange,
  groups,
  placeholder = 'Search or type a command…',
  className,
}: CommandPaletteProps) {
  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className={cn(
          'fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2',
          'overflow-hidden rounded-xl border border-border',
          'bg-popover shadow-2xl',
          'animate-in fade-in-0 zoom-in-95 duration-150',
          className
        )}
      >
        <Command className="flex flex-col">
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Command.Input
              className={cn(
                'flex-1 bg-transparent text-sm text-foreground outline-none',
                'placeholder:text-muted-foreground',
              )}
              placeholder={placeholder}
            />
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-sm opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Results */}
          <Command.List className="max-h-[320px] overflow-y-auto p-2">
            <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            {groups.map((group) => (
              <Command.Group
                key={group.heading}
                heading={group.heading}
                className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider"
              >
                {group.items.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={item.label}
                    onSelect={() => {
                      item.onSelect()
                      onOpenChange(false)
                    }}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer',
                      'data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground',
                      'hover:bg-accent hover:text-accent-foreground',
                      'transition-colors outline-none',
                    )}
                  >
                    {item.icon && (
                      <span className="shrink-0 flex items-center justify-center w-4 h-4 text-muted-foreground">
                        {item.icon}
                      </span>
                    )}
                    <span className="flex-1 min-w-0 truncate">{item.label}</span>
                    {item.description && (
                      <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                        {item.description}
                      </span>
                    )}
                    {item.shortcut && (
                      <kbd className="ml-auto pointer-events-none flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                        {item.shortcut}
                      </kbd>
                    )}
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>

          {/* Footer */}
          <div className="border-t border-border px-4 py-2 flex items-center gap-4 text-[11px] text-muted-foreground">
            <span><kbd className="font-mono">↑↓</kbd> navigate</span>
            <span><kbd className="font-mono">↵</kbd> select</span>
            <span><kbd className="font-mono">esc</kbd> close</span>
          </div>
        </Command>
      </div>
    </>
  )
}
