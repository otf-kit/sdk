import React from 'react'
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { cn } from '../utils/cn'

const DEFAULT_COLORS = [
  'hsl(var(--primary))',
  'hsl(217 91% 60%)',
  'hsl(142 71% 45%)',
  'hsl(38 92% 50%)',
  'hsl(280 65% 60%)',
]

export interface BarChartProps {
  data: Record<string, unknown>[]
  dataKey: string | string[]
  xAxisKey?: string
  height?: number
  colors?: string[]
  showGrid?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  layout?: 'vertical' | 'horizontal'
  stacked?: boolean
  className?: string
}

export function BarChart({
  data,
  dataKey,
  xAxisKey = 'name',
  height = 300,
  colors = DEFAULT_COLORS,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  layout = 'horizontal',
  stacked = false,
  className,
}: BarChartProps) {
  const keys = Array.isArray(dataKey) ? dataKey : [dataKey]
  const isVertical = layout === 'vertical'

  return (
    <div className={cn('w-full overflow-hidden', className)} style={{ minWidth: 0 }}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} layout={layout} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />}
          {isVertical ? (
            <>
              <XAxis type="number" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey={xAxisKey} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
            </>
          ) : (
            <>
              <XAxis dataKey={xAxisKey} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
            </>
          )}
          {showTooltip && (
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
                fontSize: 12,
              }}
            />
          )}
          {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
          {keys.map((key, i) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[i % colors.length]}
              radius={isVertical ? [0, 4, 4, 0] : [4, 4, 0, 0]}
              stackId={stacked ? 'stack' : undefined}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
