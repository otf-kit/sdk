// @ts-nocheck
import React from 'react'
import { LayoutDashboard, FolderOpen, Users, Settings, Bell } from 'lucide-react'
import { cn } from '../utils/cn'
import { Avatar, AvatarFallback } from '../primitives/avatar'
import { Badge } from '../primitives/badge'
import { Separator } from '../primitives/separator'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: FolderOpen, label: 'Projects' },
  { icon: Users, label: 'Team' },
  { icon: Bell, label: 'Notifications', badge: '3' },
  { icon: Settings, label: 'Settings' },
]

interface NavItemProps { icon: React.ElementType; label: string; active?: boolean; badge?: string }

function NavItem({ icon: Icon, label, active, badge }: NavItemProps) {
  return (
    <button className={cn(
      'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
      active
        ? 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] font-medium'
        : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]'
    )}>
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {badge && <Badge className="text-[10px] px-1.5 py-0.5 shrink-0">{badge}</Badge>}
    </button>
  )
}

export interface SidebarLayoutUserProps {
  userName?: string
  userEmail?: string
  userRole?: string
  pageTitle?: string
  children?: React.ReactNode
  className?: string
}

export function SidebarLayoutUser({
  userName = 'Jane Doe',
  userEmail = 'jane@acme.com',
  userRole = 'Admin',
  pageTitle = 'Dashboard',
  children,
  className,
}: SidebarLayoutUserProps) {
  return (
    <div className={cn('flex h-[600px] overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))]', className)}>
      <aside className="flex w-60 flex-col border-r border-[hsl(var(--border))] bg-[hsl(var(--card))]">
        <div className="p-4">
          <div className="flex items-center gap-3 rounded-md bg-[hsl(var(--accent))] p-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="text-xs">{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{userName}</p>
              <p className="truncate text-xs text-[hsl(var(--muted-foreground))]">{userRole}</p>
            </div>
          </div>
        </div>
        <Separator />
        <nav className="flex-1 space-y-0.5 p-2">
          {NAV_ITEMS.map(item => <NavItem key={item.label} {...item} />)}
        </nav>
        <Separator />
        <p className="p-4 text-xs text-[hsl(var(--muted-foreground))] truncate">{userEmail}</p>
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
