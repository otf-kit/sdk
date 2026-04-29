import React from 'react'
import { cn } from '../utils/cn'
import { Card, CardContent } from '../primitives/card'
import { Heatmap, HeatmapDay } from '../charts/heatmap'
import { Stat } from '../components/stat'
import { ToggleGroup, ToggleGroupItem } from '../primitives/toggle-group'

interface FilterOption {
  value: string
  label: string
}

interface SummaryStat {
  label: string
  value: string | number
}

export interface ActivityHeatmapProps {
  /** The big number above the heatmap (e.g. total events) */
  total: number | string
  /** Caption above the total — e.g. "Activity" */
  caption?: string
  /** Daily values for the heatmap */
  data: HeatmapDay[]
  /** Date the heatmap should end on. Defaults to today. */
  endDate?: Date
  /** Number of week columns. Default 53. */
  weeks?: number
  /** Cell size in px. Default 11. */
  cellSize?: number
  /** Gap between cells in px. Default 3. */
  gap?: number
  /** Optional 5-step color scale. Defaults to primary opacity ramp. */
  colorScale?: string[]
  /** Optional filter — renders a ToggleGroup at the top right */
  filters?: FilterOption[]
  filterValue?: string
  onFilterChange?: (value: string) => void
  /** 4 summary stats shown below the heatmap (e.g. Most Active Month / Day / Longest / Current Streak) */
  stats?: SummaryStat[]
  /** Tooltip formatter passed to Heatmap */
  formatTooltip?: (day: HeatmapDay) => string
  /** Center the heatmap horizontally inside its scroll container. Default true. */
  centered?: boolean
  className?: string
}

const DEFAULT_SCALE = [
  'hsl(var(--muted))',
  'hsl(var(--primary) / 0.25)',
  'hsl(var(--primary) / 0.5)',
  'hsl(var(--primary) / 0.75)',
  'hsl(var(--primary))',
]

export function ActivityHeatmap({
  total,
  caption = 'Activity',
  data,
  endDate,
  weeks = 53,
  cellSize = 11,
  gap = 3,
  colorScale = DEFAULT_SCALE,
  filters,
  filterValue,
  onFilterChange,
  stats,
  formatTooltip,
  centered = true,
  className,
}: ActivityHeatmapProps) {
  const totalLabel = typeof total === 'number' ? total.toLocaleString() : total

  return (
    <Card data-slot="activity-heatmap" className={className}>
      <CardContent className="p-5">
        <div className="flex items-baseline justify-between mb-4 flex-wrap gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{caption}</p>
            <p className="text-3xl font-bold tabular-nums mt-0.5 text-[hsl(var(--foreground))]">{totalLabel}</p>
          </div>
          {filters && filters.length > 0 && (
            <ToggleGroup
              type="single"
              value={filterValue}
              onValueChange={(v) => v && onFilterChange?.(v)}
              variant="outline"
              size="sm"
            >
              {filters.map((f) => (
                <ToggleGroupItem key={f.value} value={f.value}>{f.label}</ToggleGroupItem>
              ))}
            </ToggleGroup>
          )}
        </div>

        <div className={cn('overflow-x-auto pb-2', centered && 'flex justify-center')}>
          <Heatmap
            data={data}
            endDate={endDate}
            weeks={weeks}
            cellSize={cellSize}
            gap={gap}
            colorScale={colorScale}
            formatTooltip={formatTooltip}
          />
        </div>

        {stats && stats.length > 0 && (
          <div
            className={cn('grid gap-4 mt-5 pt-5 border-t border-[hsl(var(--border))]', `grid-cols-${Math.min(stats.length, 4)}`)}
          >
            {stats.map((s) => (
              <Stat key={s.label} label={s.label} value={s.value} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
