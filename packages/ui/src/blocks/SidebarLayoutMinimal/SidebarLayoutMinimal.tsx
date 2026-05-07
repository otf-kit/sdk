// @ts-nocheck
import React from 'react'
import { LayoutDashboard, FolderOpen, Users, Settings } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Avatar, AvatarFallback } from '../../primitives/avatar'
import { Separator } from '../../primitives/separator'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: FolderOpen, label: 'Projects' },
  { icon: Users, label: 'Team' },
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

export interface SidebarLayoutMinimalProps {
  brandName?: string
  pageTitle?: string
  children?: React.ReactNode
  className?: string
}

export function SidebarLayoutMinimal({
  brandName = 'Acme Inc',
  pageTitle = 'Dashboard',
  children,
  className,
}: SidebarLayoutMinimalProps) {
  return (
    <div className={cn('flex h-[600px] overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))]', className)}>
      <aside className="flex w-60 flex-col border-r border-[hsl(var(--border))] bg-[hsl(var(--card))]">
        <div className="flex h-14 items-center px-4 font-semibold text-sm">{brandName}</div>
        <Separator />
        <nav className="flex-1 space-y-0.5 p-2">
          {NAV_ITEMS.map(item => <NavItem key={item.label} {...item} />)}
        </nav>
        <Separator />
        <div className="flex items-center gap-3 p-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">JD</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Jane Doe</p>
            <p className="truncate text-xs text-[hsl(var(--muted-foreground))]">jane@acme.com</p>
          </div>
        </div>
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
