'use client'

import React from 'react'
import { cn } from '../utils/cn'

export interface AppShellProps {
  sidebar: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function AppShell({ sidebar, children, className }: AppShellProps) {
  return (
    <div
      data-slot="app-shell"
      className={cn('flex h-screen overflow-hidden bg-background', className)}
    >
      {sidebar}
      <main className="flex-1 overflow-auto min-w-0">
        {children}
      </main>
    </div>
  )
}
