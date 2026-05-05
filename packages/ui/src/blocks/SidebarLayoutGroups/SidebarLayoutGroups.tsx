// @ts-nocheck
import React from 'react'
import { LayoutDashboard, BarChart2, FolderOpen, Users, CreditCard, Settings, HelpCircle } from 'lucide-react'
import { cn } from '../utils/cn'
import { Separator } from '../primitives/separator'

const NAV_GROUPS = [
  {
    label: 'Main',
    items: [{ icon: LayoutDashboard, label: 'Dashboard', active: true }, { icon: BarChart2, label: 'Analytics' }],
  },
  {
    label: 'Management',
    items: [{ icon: FolderOpen, label: 'Projects' }, { icon: Users, label: 'Team' }, { icon: CreditCard, label: 'Billing' }],
  },
  {
    label: 'Account',
    items: [{ icon: Settings, label: 'Settings' }, { icon: HelpCircle, label: 'Help' }],
  },
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

export interface SidebarLayoutGroupsProps {
  brandName?: string
  pageTitle?: string
  children?: React.ReactNode
  className?: string
}

export function SidebarLayoutGroups({
  brandName = 'Acme Inc',
  pageTitle = 'Dashboard',
  children,
  className,
}: SidebarLayoutGroupsProps) {
  return (
    <div className={cn('flex h-[600px] overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))]', className)}>
      <aside className="flex w-60 flex-col border-r border-[hsl(var(--border))] bg-[hsl(var(--card))]">
        <div className="flex h-14 items-center px-4 font-semibold text-sm">{brandName}</div>
        <Separator />
        <nav className="flex-1 overflow-auto p-2 space-y-4">
          {NAV_GROUPS.map(group => (
            <div key={group.label}>
              <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map(item => <NavItem key={item.label} {...item} />)}
              </div>
            </div>
          ))}
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
