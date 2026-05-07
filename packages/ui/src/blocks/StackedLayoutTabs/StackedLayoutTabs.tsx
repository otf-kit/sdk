import React, { useState } from 'react'
import { Bell, ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Avatar, AvatarFallback } from '../../primitives/avatar'
import { Button } from '../../primitives/button'
import { Separator } from '../../primitives/separator'

const NAV_LINKS = ['Home', 'Projects', 'Analytics', 'Team']
const TABS = ['Overview', 'Activity', 'Settings', 'Billing']

export interface StackedLayoutTabsProps {
  brandName?: string
  children?: React.ReactNode
  className?: string
}

export function StackedLayoutTabs({
  brandName = 'Acme Inc',
  children,
  className,
}: StackedLayoutTabsProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [activeNav, setActiveNav] = useState(0)

  return (
    <div className={cn('flex h-[600px] flex-col overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))]', className)}>
      <nav className="flex h-14 items-center gap-6 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4">
        <span className="font-semibold text-sm shrink-0">{brandName}</span>
        <div className="flex flex-1 items-center gap-1">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link}
              onClick={() => setActiveNav(i)}
              className={cn(
                'px-3 py-1.5 text-sm rounded-md transition-colors',
                i === activeNav
                  ? 'bg-[hsl(var(--accent))] font-medium'
                  : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))]'
              )}
            >
              {link}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <div className="flex items-center gap-1.5 cursor-pointer">
            <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">JD</AvatarFallback></Avatar>
            <ChevronDown className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
          </div>
        </div>
      </nav>
      <div className="border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4">
        <div className="flex gap-4">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={cn(
                'py-3 text-sm transition-colors border-b-2',
                i === activeTab
                  ? 'border-[hsl(var(--primary))] font-medium'
                  : 'border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <main className="flex-1 overflow-auto p-6">
        {children ?? (
          <div className="text-sm text-[hsl(var(--muted-foreground))]">
            Content for <strong>{TABS[activeTab]}</strong> tab
          </div>
        )}
      </main>
    </div>
  )
}
