import React from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '../utils/cn'
import { Dialog, DialogContent, DialogTitle } from '../primitives/dialog'

interface UseCommandBarReturn { open: boolean; setOpen: (v: boolean) => void }

export function useCommandBar(): UseCommandBarReturn {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen((o) => !o) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return { open, setOpen }
}

export function CommandBarEmpty({ children = 'No results found.' }: { children?: React.ReactNode }) {
  return <div className="py-6 text-center text-sm text-[hsl(var(--muted-foreground))]">{children}</div>
}

export function CommandBarGroup({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="px-2 py-1">
      <p className="mb-1 px-2 text-xs font-semibold text-[hsl(var(--muted-foreground))]">{heading}</p>
      {children}
    </div>
  )
}

interface CommandBarItemProps {
  icon?: React.ReactNode
  label: string
  shortcut?: string
  onSelect?: () => void
  active?: boolean
  className?: string
}

export function CommandBarItem({ icon, label, shortcut, onSelect, active, className }: CommandBarItemProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors',
        active ? 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]' : 'hover:bg-[hsl(var(--accent)/0.6)]',
        className
      )}
    >
      {icon && <span className="h-4 w-4 shrink-0 text-[hsl(var(--muted-foreground))]">{icon}</span>}
      <span className="flex-1 text-left truncate">{label}</span>
      {shortcut && (
        <kbd className="pointer-events-none shrink-0 inline-flex h-5 items-center rounded border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-1.5 text-[10px] font-medium text-[hsl(var(--muted-foreground))]">
          {shortcut}
        </kbd>
      )}
    </button>
  )
}

interface CommandBarProps {
  open: boolean
  onOpenChange: (v: boolean) => void
  children: React.ReactNode
  placeholder?: string
  onSearch?: (q: string) => void
}

export function CommandBar({ open, onOpenChange, children, placeholder = 'Search commands...', onSearch }: CommandBarProps) {
  const [query, setQuery] = React.useState('')

  const handleSearch = (v: string) => { setQuery(v); onSearch?.(v) }

  const items = React.useRef<HTMLDivElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onOpenChange(false); return }
    const focusable = items.current?.querySelectorAll<HTMLButtonElement>('button')
    if (!focusable?.length) return
    const arr = Array.from(focusable)
    const idx = arr.indexOf(document.activeElement as HTMLButtonElement)
    if (e.key === 'ArrowDown') { e.preventDefault(); arr[(idx + 1) % arr.length]?.focus() }
    if (e.key === 'ArrowUp')   { e.preventDefault(); arr[(idx - 1 + arr.length) % arr.length]?.focus() }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-lg overflow-hidden" onKeyDown={handleKeyDown}>
        <DialogTitle className="sr-only">Command Bar</DialogTitle>
        <div className="flex items-center gap-2 border-b border-[hsl(var(--border))] px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-[hsl(var(--muted-foreground))]" />
          <input
            autoFocus
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-[hsl(var(--muted-foreground))]"
            placeholder={placeholder}
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {query && (
            <button onClick={() => handleSearch('')} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div ref={items} className="max-h-80 overflow-y-auto py-2">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
