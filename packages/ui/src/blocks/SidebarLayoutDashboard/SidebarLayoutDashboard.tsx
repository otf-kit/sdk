// @ts-nocheck
import React from 'react'
import { LayoutDashboard, FolderOpen, Users, Settings, Bell, TrendingUp } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Avatar, AvatarFallback } from '../../primitives/avatar'
import { Badge } from '../../primitives/badge'
import { Separator } from '../../primitives/separator'
import { Card, CardContent } from '../../primitives/card'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: FolderOpen, label: 'Projects' },
  { icon: Users, label: 'Team' },
  { icon: Settings, label: 'Settings' },
]

const KPIS = [
  { label: 'Total Revenue', value: '$48,295', change: '+12.5%' },
  { label: 'Active Users', value: '2,847', change: '+8.3%' },
  { label: 'New Orders', value: '384', change: '+3.1%' },
  { label: 'Conversion', value: '3.24%', change: '-0.4%' },
]

const TABLE_ROWS = [
  { name: 'Alpha Project', status: 'Active', team: 'Design', progress: 72 },
  { name: 'Beta Launch', status: 'Review', team: 'Engineering', progress: 45 },
  { name: 'Gamma Research', status: 'Active', team: 'Product', progress: 89 },
]

function NavItem({ icon: Icon, label, active }: { icon: React.ElementType; label: string; active?: boolean }) {
  return (
    <button className={cn(
      'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
      active ? 'bg-[hsl(var(--accent))] font-medium' : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))]'
    )}>
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </button>
  )
}

export interface SidebarLayoutDashboardProps { className?: string }

export function SidebarLayoutDashboard({ className }: SidebarLayoutDashboardProps) {
  return (
    <div className={cn('flex h-[600px] overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))]', className)}>
      <aside className="flex w-56 flex-col border-r border-[hsl(var(--border))] bg-[hsl(var(--card))]">
        <div className="flex h-12 items-center px-4 font-semibold text-sm">Acme Inc</div>
        <Separator />
        <nav className="flex-1 space-y-0.5 p-2">
          {NAV_ITEMS.map(i => <NavItem key={i.label} {...i} />)}
        </nav>
        <Separator />
        <div className="flex items-center gap-2 p-3">
          <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">JD</AvatarFallback></Avatar>
          <span className="truncate text-xs font-medium">Jane Doe</span>
        </div>
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-12 items-center justify-between border-b border-[hsl(var(--border))] px-4">
          <h1 className="text-sm font-semibold">Dashboard</h1>
          <button className="relative"><Bell className="h-4 w-4" /><span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[hsl(var(--primary))]" /></button>
        </header>
        <div className="flex-1 overflow-auto p-4 space-y-4">
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,130px),1fr))' }}>
            {KPIS.map(k => (
              <Card key={k.label}>
                <CardContent className="p-3">
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{k.label}</p>
                  <p className="text-lg font-bold mt-0.5">{k.value}</p>
                  <p className={cn('text-xs flex items-center gap-0.5 mt-0.5', k.change.startsWith('+') ? 'text-green-600' : 'text-red-500')}>
                    <TrendingUp className="h-3 w-3" />{k.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="rounded-md border border-[hsl(var(--border))]">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-[hsl(var(--border))]">
                {['Project', 'Status', 'Team', 'Progress'].map(h => <th key={h} className="px-3 py-2 text-left font-medium text-[hsl(var(--muted-foreground))]">{h}</th>)}
              </tr></thead>
              <tbody>{TABLE_ROWS.map(r => (
                <tr key={r.name} className="border-b border-[hsl(var(--border))] last:border-0">
                  <td className="px-3 py-2 font-medium">{r.name}</td>
                  <td className="px-3 py-2"><Badge variant="secondary" className="text-[10px]">{r.status}</Badge></td>
                  <td className="px-3 py-2 text-[hsl(var(--muted-foreground))]">{r.team}</td>
                  <td className="px-3 py-2"><div className="h-1.5 w-20 rounded-full bg-[hsl(var(--muted))]"><div className="h-full rounded-full bg-[hsl(var(--primary))]" style={{ width: `${r.progress}%` }} /></div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
