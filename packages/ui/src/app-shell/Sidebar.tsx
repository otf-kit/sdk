'use client'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../utils/cn'

// ── Context ──────────────────────────────────────────────────────
interface SidebarContextValue {
  collapsed: boolean
  toggleCollapsed: () => void
}
const SidebarCtx = createContext<SidebarContextValue>({
  collapsed: false,
  toggleCollapsed: () => {},
})
export function useSidebar() { return useContext(SidebarCtx) }

// ── Root ─────────────────────────────────────────────────────────
function SidebarRoot({ children, storageKey = 'sidebar-collapsed', defaultCollapsed = false, className }: {
  children: React.ReactNode
  storageKey?: string
  defaultCollapsed?: boolean
  className?: string
}) {
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') return defaultCollapsed
    try { return JSON.parse(localStorage.getItem(storageKey) ?? String(defaultCollapsed)) } catch { return defaultCollapsed }
  })

  const toggleCollapsed = useCallback(() => {
    setCollapsed((v: boolean) => {
      const next = !v
      try { localStorage.setItem(storageKey, JSON.stringify(next)) } catch {}
      return next
    })
  }, [storageKey])

  return (
    <SidebarCtx.Provider value={{ collapsed, toggleCollapsed }}>
      <aside
        data-slot="sidebar"
        data-collapsed={collapsed || undefined}
        className={cn(
          'relative flex flex-col h-full bg-card border-r border-border',
          'transition-[width] duration-200',
          collapsed ? 'w-[52px]' : 'w-[220px]',
          className
        )}
      >
        {children}
        {/* Collapse toggle */}
        <button
          onClick={toggleCollapsed}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={cn(
            'absolute -right-3 top-6 z-10',
            'flex h-6 w-6 items-center justify-center',
            'rounded-full border border-border bg-card shadow-sm',
            'text-muted-foreground hover:text-foreground hover:bg-accent',
            'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
        >
          {collapsed
            ? <ChevronRight className="h-3 w-3" />
            : <ChevronLeft className="h-3 w-3" />}
        </button>
      </aside>
    </SidebarCtx.Provider>
  )
}

// ── Header ───────────────────────────────────────────────────────
function SidebarHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div data-slot="sidebar-header" className={cn('flex items-center px-3 h-14 shrink-0 border-b border-border overflow-hidden', className)}>
      {children}
    </div>
  )
}

// ── Nav ──────────────────────────────────────────────────────────
function SidebarNav({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <nav data-slot="sidebar-nav" className={cn('flex-1 overflow-y-auto overflow-x-hidden py-2 px-2 space-y-0.5', className)}>
      {children}
    </nav>
  )
}

// ── Item ─────────────────────────────────────────────────────────
export interface SidebarItemProps {
  icon?: React.ReactNode
  label: string
  href?: string
  active?: boolean
  badge?: React.ReactNode
  onClick?: () => void
  className?: string
}
function SidebarItem({ icon, label, href, active, badge, onClick, className }: SidebarItemProps) {
  const { collapsed } = useSidebar()
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      href={href as string}
      onClick={onClick}
      title={collapsed ? label : undefined}
      data-slot="sidebar-item"
      data-active={active || undefined}
      className={cn(
        'flex items-center gap-2.5 w-full rounded-md px-2 py-1.5',
        'text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        active
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
        className
      )}
    >
      {icon && <span className="flex h-4 w-4 shrink-0 items-center justify-center [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
      {!collapsed && <span className="min-w-0 truncate">{label}</span>}
      {!collapsed && badge && <span className="ml-auto shrink-0">{badge}</span>}
    </Tag>
  )
}

// ── Footer ───────────────────────────────────────────────────────
function SidebarFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div data-slot="sidebar-footer" className={cn('shrink-0 border-t border-border px-2 py-2', className)}>
      {children}
    </div>
  )
}

// ── Separator ────────────────────────────────────────────────────
function SidebarSeparator({ label, className }: { label?: string; className?: string }) {
  const { collapsed } = useSidebar()
  return (
    <div data-slot="sidebar-separator" className={cn('px-2 pt-3 pb-1', className)}>
      {!collapsed && label && (
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-1">{label}</p>
      )}
      {(collapsed || !label) && <hr className="border-border" />}
    </div>
  )
}

// ── Namespace export ─────────────────────────────────────────────
export const Sidebar = Object.assign(SidebarRoot, {
  Header: SidebarHeader,
  Nav: SidebarNav,
  Item: SidebarItem,
  Footer: SidebarFooter,
  Separator: SidebarSeparator,
})
