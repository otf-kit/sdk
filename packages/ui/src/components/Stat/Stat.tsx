import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '../utils/cn'
import { Card, CardContent } from '../../primitives/card'

interface StatProps {
  label: string
  value: string | number
  trend?: number
  trendLabel?: string
  icon?: React.ReactNode
  description?: string
  className?: string
}

export function Stat({ label, value, trend, trendLabel, icon, description, className }: StatProps) {
  const isPositive = trend !== undefined && trend >= 0
  return (
    <Card className={cn('', className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1 min-w-0">
            <p className="text-sm font-medium text-[hsl(var(--muted-foreground))] truncate">{label}</p>
            <p className="text-2xl font-bold text-[hsl(var(--foreground))]">{value}</p>
          </div>
          {icon && <div className="text-[hsl(var(--muted-foreground))] shrink-0 ml-2">{icon}</div>}
        </div>
        {(trend !== undefined || description) && (
          <div className="mt-2 flex items-center gap-1">
            {trend !== undefined && (
              <span className={cn('flex items-center gap-0.5 text-xs font-medium', isPositive ? 'text-green-600' : 'text-red-600')}>
                {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(trend)}%
              </span>
            )}
            {trendLabel && <span className="text-xs text-[hsl(var(--muted-foreground))]">{trendLabel}</span>}
            {description && !trendLabel && <span className="text-xs text-[hsl(var(--muted-foreground))]">{description}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface StatGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export function StatGroup({ className, ...props }: StatGroupProps) {
  return (
    <div className={cn('grid gap-4', className)} style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))' }} {...props} />
  )
}
