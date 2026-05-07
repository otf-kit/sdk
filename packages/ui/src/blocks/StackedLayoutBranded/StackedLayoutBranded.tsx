import React from 'react'
import { Bell, ChevronDown, ArrowRight } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Avatar, AvatarFallback } from '../../primitives/avatar'
import { Button } from '../../primitives/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../primitives/card'

const NAV_LINKS = ['Features', 'Pricing', 'Docs', 'Blog']

export interface StackedLayoutBrandedProps {
  brandName?: string
  children?: React.ReactNode
  className?: string
}

export function StackedLayoutBranded({
  brandName = 'Acme',
  children,
  className,
}: StackedLayoutBrandedProps) {
  return (
    <div className={cn('flex h-[600px] flex-col overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))]', className)}>
      <nav className="flex h-14 items-center gap-6 bg-[hsl(var(--primary))] px-6">
        <span className="font-bold text-sm text-[hsl(var(--primary-foreground))] shrink-0">{brandName}</span>
        <div className="flex flex-1 items-center gap-1">
          {NAV_LINKS.map(link => (
            <button key={link} className="px-3 py-1.5 text-sm text-[hsl(var(--primary-foreground)/0.8)] hover:text-[hsl(var(--primary-foreground))] transition-colors rounded-md hover:bg-white/10">
              {link}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Bell className="h-4 w-4 text-[hsl(var(--primary-foreground)/0.8)]" />
          <div className="flex items-center gap-1.5 cursor-pointer">
            <Avatar className="h-7 w-7 ring-2 ring-white/30">
              <AvatarFallback className="bg-white/20 text-[hsl(var(--primary-foreground))] text-xs">JD</AvatarFallback>
            </Avatar>
            <ChevronDown className="h-3 w-3 text-[hsl(var(--primary-foreground)/0.8)]" />
          </div>
        </div>
      </nav>
      <main className="flex-1 overflow-auto">
        {children ?? (
          <div className="p-6 space-y-6">
            <div>
              <h1 className="text-xl font-bold">Welcome back, Jane</h1>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">Here's what's happening today.</p>
            </div>
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,200px),1fr))' }}>
              {['Get Started', 'View Analytics', 'Manage Team'].map(action => (
                <Card key={action} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center justify-between">
                    <span className="text-sm font-medium">{action}</span>
                    <ArrowRight className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
