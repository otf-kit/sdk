import React from 'react'
import { cn } from '../utils/cn'

interface HotkeyBadgeProps {
  children: React.ReactNode
  className?: string
}

export function HotkeyBadge({ children, className }: HotkeyBadgeProps) {
  return (
    <kbd className={cn(
      'inline-flex items-center justify-center rounded border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-1.5 py-0.5 text-[11px] font-medium text-[hsl(var(--muted-foreground))] shadow-[0_1px_0_rgba(0,0,0,0.1)] min-w-[20px] h-5',
      className
    )}>
      {children}
    </kbd>
  )
}

interface HotkeysProps {
  keys: string[]
  className?: string
}

export function Hotkeys({ keys, className }: HotkeysProps) {
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)}>
      {keys.map((key, i) => <HotkeyBadge key={i}>{key}</HotkeyBadge>)}
    </span>
  )
}
