// @ts-nocheck
import React, { useState } from 'react'
import { LayoutDashboard, FolderOpen, Users, Settings, BarChart2, Bell } from 'lucide-react'
import { cn } from '../utils/cn'
import { Input } from '../primitives/input'
import { Separator } from '../primitives/separator'

const ALL_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: BarChart2, label: 'Analytics' },
  { icon: FolderOpen, label: 'Projects' },
  { icon: Users, label: 'Team' },
  { icon: Bell, label: 'Notifications' },
  { icon: Settings, label: 'Settings' },
]

interface NavItemProps { icon: React.ElementType; label: string; active?: boolean }

function NavItem({ icon: Icon, label, active }: NavItemProps) {
  return (
    <button className={cn(
      'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
      active
        ? 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] font-medium'
        : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]'
    )}>
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </button>
  )
}

export interface SidebarLayoutSearchProps {
  brandName?: string
  pageTitle?: string
  children?: React.ReactNode
  className?: string
}

export function SidebarLayoutSearch({
  brandName = 'Acme Inc',
  pageTitle = 'Dashboard',
  children,
  className,
}: SidebarLayoutSearchProps) {
  const [query, setQuery] = useState('')
  const filtered = ALL_ITEMS.filter(i => i.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className={cn('flex h-[600px] overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))]', className)}>
      <aside className="flex w-60 flex-col border-r border-[hsl(var(--border))] bg-[hsl(var(--card))]">
        <div className="flex h-14 items-center px-4 font-semibold text-sm">{brandName}</div>
        <Separator />
        <div className="p-2">
          <Input
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="h-8 text-sm"
          />
        </div>
        <nav className="flex-1 space-y-0.5 overflow-auto p-2">
          {filtered.length > 0
            ? filtered.map(item => <NavItem key={item.label} {...item} />)
            : <p className="px-3 py-2 text-xs text-[hsl(var(--muted-foreground))]">No results</p>
          }
        </nav>
      </aside>
      <main className="flex flex-1 flex-col overflow-auto">
        <header className="flex h-14 items-center border-b border-[hsl(var(--border))] px-6">
          <h1 className="text-sm font-semibold">{pageTitle}</h1>
        </header>
        <div className="flex-1 p-6 text-sm text-[hsl(var(--muted-foreground))]">
          {children ?? 'Page content goes here.'}
        </div>
      </main>
    </div>
  )
}
