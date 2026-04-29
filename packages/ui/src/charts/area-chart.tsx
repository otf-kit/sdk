import React from 'react'
import {
  AreaChart as RechartsAreaChart,
  Area,
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

export interface AreaChartProps {
  data: Record<string, unknown>[]
  dataKey: string | string[]
  xAxisKey?: string
  height?: number
  colors?: string[]
  showGrid?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  curved?: boolean
  className?: string
}

export function AreaChart({
  data,
  dataKey,
  xAxisKey = 'name',
  height = 300,
  colors = DEFAULT_COLORS,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  curved = true,
  className,
}: AreaChartProps) {
  const keys = Array.isArray(dataKey) ? dataKey : [dataKey]
  const curve = curved ? 'monotone' : 'linear'

  return (
    <div className={cn('w-full overflow-hidden', className)} style={{ minWidth: 0 }}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data.map((d) => ({ ...d }))} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />}
          <XAxis dataKey={xAxisKey} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
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
            <Area
              key={key}
              type={curve}
              dataKey={key}
              stroke={colors[i % colors.length]}
              fill={colors[i % colors.length]}
              fillOpacity={0.15}
              strokeWidth={2}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}
