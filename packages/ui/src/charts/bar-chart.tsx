import React from 'react'
import {
  BarChart as RechartsBarChart,
  ComposedChart,
  Bar,
  Line,
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
  /** Exact bar width/height in px. Defaults to 28 for a slim, elegant look. */
  barSize?: number
  /** Maximum bar width/height in px */
  maxBarSize?: number
  /** Gap between bar groups. Defaults to '45%' for generous whitespace. */
  barCategoryGap?: number | string
  /** Optional line overlay key — switches to ComposedChart with second Y axis */
  lineDataKey?: string
  lineColor?: string
  lineStrokeWidth?: number
  rightAxisFormatter?: (v: number) => string
  rightAxisDomain?: [number | string, number | string]
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
  barSize = 28,
  maxBarSize,
  barCategoryGap = '45%',
  lineDataKey,
  lineColor = 'hsl(var(--foreground))',
  lineStrokeWidth = 2,
  rightAxisFormatter,
  rightAxisDomain,
  className,
}: BarChartProps) {
  const keys = Array.isArray(dataKey) ? dataKey : [dataKey]
  const isVertical = layout === 'vertical'
  const Chart = lineDataKey ? ComposedChart : RechartsBarChart

  return (
    <div className={cn('w-full overflow-hidden', className)} style={{ minWidth: 0 }}>
      <ResponsiveContainer width="100%" height={height}>
        <Chart
          data={data}
          layout={layout}
          margin={{ top: 4, right: lineDataKey ? 8 : 4, left: -20, bottom: 0 }}
          barSize={barSize}
          maxBarSize={maxBarSize}
          barCategoryGap={barCategoryGap}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />}
          {isVertical ? (
            <>
              <XAxis type="number" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey={xAxisKey} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
            </>
          ) : (
            <>
              <XAxis dataKey={xAxisKey} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              {lineDataKey && (
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                  domain={rightAxisDomain}
                  tickFormatter={rightAxisFormatter}
                />
              )}
            </>
          )}
          {showTooltip && (
            <Tooltip
              cursor={false}
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
              yAxisId={isVertical ? undefined : 'left'}
              fill={colors[i % colors.length]}
              radius={isVertical ? [0, 6, 6, 0] : [6, 6, 0, 0]}
              stackId={stacked ? 'stack' : undefined}
            />
          ))}
          {lineDataKey && !isVertical && (
            <Line
              type="monotone"
              dataKey={lineDataKey}
              yAxisId="right"
              stroke={lineColor}
              strokeWidth={lineStrokeWidth}
              dot={false}
              activeDot={{ r: 4 }}
            />
          )}
        </Chart>
      </ResponsiveContainer>
    </div>
  )
}
