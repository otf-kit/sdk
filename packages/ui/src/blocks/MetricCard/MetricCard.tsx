import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Card, CardContent } from '../../primitives/card'
import { Button } from '../../primitives/button'

export interface MetricCardProps {
  label?: string
  value?: string
  change?: string
  trend?: 'up' | 'down'
  className?: string
}

export function MetricCard({ label = 'Total Revenue', value = '$48,295', change = '+12.5%', trend = 'up', className }: MetricCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown
  const trendColor = trend === 'up' ? 'text-green-600' : 'text-red-500'
  return (
    <Card className={cn('', className)}>
      <CardContent className="p-4">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">{label}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <p className={cn('flex items-center gap-1 text-sm mt-1', trendColor)}>
          <TrendIcon className="h-4 w-4" />{change} from last month
        </p>
      </CardContent>
    </Card>
  )
}

export interface MetricCardWithIconProps extends MetricCardProps {
  icon?: React.ReactNode
  iconColor?: string
}

export function MetricCardWithIcon({ icon, iconColor = 'bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]', ...props }: MetricCardWithIconProps) {
  const TrendIcon = (props.trend ?? 'up') === 'up' ? TrendingUp : TrendingDown
  const trendColor = (props.trend ?? 'up') === 'up' ? 'text-green-600' : 'text-red-500'
  return (
    <Card className={cn('', props.className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">{props.label ?? 'Total Revenue'}</p>
            <p className="text-2xl font-bold mt-1">{props.value ?? '$48,295'}</p>
            <p className={cn('flex items-center gap-1 text-sm mt-1', trendColor)}>
              <TrendIcon className="h-4 w-4" />{props.change ?? '+12.5%'}
            </p>
          </div>
          <div className={cn('flex h-10 w-10 items-center justify-center rounded-md', iconColor)}>
            {icon ?? <TrendingUp className="h-5 w-5" />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export interface MetricCardWithButtonProps extends MetricCardProps {
  actionLabel?: string
  onAction?: () => void
}

export function MetricCardWithButton({ actionLabel = 'View details', onAction, ...props }: MetricCardWithButtonProps) {
  const TrendIcon = (props.trend ?? 'up') === 'up' ? TrendingUp : TrendingDown
  const trendColor = (props.trend ?? 'up') === 'up' ? 'text-green-600' : 'text-red-500'
  return (
    <Card className={cn('', props.className)}>
      <CardContent className="p-4">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">{props.label ?? 'Total Revenue'}</p>
        <p className="text-2xl font-bold mt-1">{props.value ?? '$48,295'}</p>
        <p className={cn('flex items-center gap-1 text-sm mt-1 mb-3', trendColor)}>
          <TrendIcon className="h-4 w-4" />{props.change ?? '+12.5%'}
        </p>
        <Button size="sm" variant="outline" className="w-full" onClick={onAction}>{actionLabel}</Button>
      </CardContent>
    </Card>
  )
}
