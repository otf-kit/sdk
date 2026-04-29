import React from 'react'
import { cn } from '../utils/cn'

export interface BarListItem {
  label: string
  value: number
  color?: string
  href?: string
  icon?: React.ReactNode
  meta?: React.ReactNode
}

export interface BarListProps {
  data: BarListItem[]
  valueFormatter?: (v: number) => string
  sort?: boolean
  max?: number
  className?: string
  emptyMessage?: string
}

const DEFAULT_COLOR = 'hsl(var(--primary) / 0.4)'

export function BarList({
  data,
  valueFormatter = (v) => v.toLocaleString(),
  sort = true,
  max,
  className,
  emptyMessage = 'No data',
}: BarListProps) {
  const items = sort ? [...data].sort((a, b) => b.value - a.value) : data
  const peak = max ?? Math.max(1, ...items.map((i) => i.value))

  if (items.length === 0) {
    return (
      <div className={cn('text-sm text-[hsl(var(--muted-foreground))] py-6 text-center', className)}>
        {emptyMessage}
      </div>
    )
  }

  return (
    <div data-slot="bar-list" className={cn('flex flex-col gap-2', className)}>
      {items.map((item, i) => {
        const pct = (item.value / peak) * 100
        const Wrapper = item.href ? 'a' : 'div'
        return (
          <Wrapper
            key={`${item.label}-${i}`}
            {...(item.href ? { href: item.href } : {})}
            className={cn(
              'group relative flex items-center justify-between gap-3 rounded-md px-2.5 py-1.5 text-sm overflow-hidden',
              item.href && 'hover:bg-[hsl(var(--accent)/0.4)] transition-colors',
            )}
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 rounded-md transition-[width] duration-300"
              style={{ width: `${pct}%`, background: item.color ?? DEFAULT_COLOR }}
            />
            <span className="relative z-10 flex items-center gap-2 min-w-0 flex-1">
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              <span className="truncate text-[hsl(var(--foreground))]">{item.label}</span>
            </span>
            <span className="relative z-10 flex items-center gap-3 shrink-0 tabular-nums text-[hsl(var(--foreground))]">
              {item.meta}
              <span className="font-medium">{valueFormatter(item.value)}</span>
            </span>
          </Wrapper>
        )
      })}
    </div>
  )
}
