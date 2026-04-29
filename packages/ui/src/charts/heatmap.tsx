import React, { useMemo } from 'react'
import { cn } from '../utils/cn'

export interface HeatmapDay {
  date: string
  value: number
}

export interface HeatmapProps {
  data: HeatmapDay[]
  endDate?: Date
  weeks?: number
  cellSize?: number
  gap?: number
  colorScale?: string[]
  className?: string
  showMonthLabels?: boolean
  showDayLabels?: boolean
  showLegend?: boolean
  formatTooltip?: (day: HeatmapDay) => string
}

const DEFAULT_SCALE = [
  'hsl(var(--muted))',
  'hsl(var(--primary) / 0.25)',
  'hsl(var(--primary) / 0.5)',
  'hsl(var(--primary) / 0.75)',
  'hsl(var(--primary))',
]

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
const DAYS = ['', 'M', '', 'W', '', 'F', '']

function dateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function startOfWeek(d: Date) {
  const out = new Date(d)
  const day = out.getDay()
  const diff = day === 0 ? -6 : 1 - day
  out.setDate(out.getDate() + diff)
  out.setHours(0, 0, 0, 0)
  return out
}

export function Heatmap({
  data,
  endDate = new Date(),
  weeks = 53,
  cellSize = 11,
  gap = 3,
  colorScale = DEFAULT_SCALE,
  className,
  showMonthLabels = true,
  showDayLabels = true,
  showLegend = true,
  formatTooltip,
}: HeatmapProps) {
  const valueByDate = useMemo(() => {
    const m = new Map<string, number>()
    for (const d of data) m.set(d.date, d.value)
    return m
  }, [data])

  const max = useMemo(() => Math.max(1, ...data.map((d) => d.value)), [data])

  const grid = useMemo(() => {
    const end = startOfWeek(endDate)
    end.setDate(end.getDate() + 6)
    const cols: { date: Date; value: number; key: string }[][] = []
    const cursor = new Date(end)
    cursor.setDate(cursor.getDate() - (weeks * 7 - 1))
    for (let w = 0; w < weeks; w++) {
      const col: { date: Date; value: number; key: string }[] = []
      for (let dow = 0; dow < 7; dow++) {
        const dt = new Date(cursor)
        const k = dateKey(dt)
        col.push({ date: dt, value: valueByDate.get(k) ?? 0, key: k })
        cursor.setDate(cursor.getDate() + 1)
      }
      cols.push(col)
    }
    return cols
  }, [endDate, weeks, valueByDate])

  const monthLabels = useMemo(() => {
    const labels: { col: number; label: string }[] = []
    let lastMonth = -1
    grid.forEach((col, i) => {
      const first = col[0]
      if (!first) return
      const monthOfFirst = first.date.getMonth()
      if (monthOfFirst !== lastMonth && first.date.getDate() <= 7) {
        labels.push({ col: i, label: MONTHS[monthOfFirst] ?? '' })
        lastMonth = monthOfFirst
      }
    })
    return labels
  }, [grid])

  function colorFor(value: number) {
    if (value === 0) return colorScale[0] ?? 'transparent'
    const t = value / max
    const idx = Math.min(colorScale.length - 1, 1 + Math.floor(t * (colorScale.length - 2)))
    return colorScale[idx] ?? colorScale[0] ?? 'transparent'
  }

  const dx = cellSize + gap
  const labelGutter = showDayLabels ? 18 : 0
  const monthGutter = showMonthLabels ? 16 : 0
  const width = labelGutter + weeks * dx
  const height = monthGutter + 7 * dx

  return (
    <div data-slot="heatmap" className={cn('inline-flex flex-col gap-2', className)}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="text-[hsl(var(--muted-foreground))]"
        role="img"
      >
        {showMonthLabels &&
          monthLabels.map(({ col, label }) => (
            <text
              key={`m-${col}-${label}`}
              x={labelGutter + col * dx}
              y={11}
              fontSize={10}
              fill="currentColor"
            >
              {label}
            </text>
          ))}
        {showDayLabels &&
          DAYS.map((d, i) =>
            d ? (
              <text
                key={`d-${i}`}
                x={0}
                y={monthGutter + i * dx + cellSize - 1}
                fontSize={9}
                fill="currentColor"
              >
                {d}
              </text>
            ) : null,
          )}
        {grid.map((col, ci) =>
          col.map((cell, ri) => (
            <rect
              key={cell.key}
              x={labelGutter + ci * dx}
              y={monthGutter + ri * dx}
              width={cellSize}
              height={cellSize}
              rx={2}
              fill={colorFor(cell.value)}
            >
              <title>
                {formatTooltip
                  ? formatTooltip({ date: cell.key, value: cell.value })
                  : `${cell.key}: ${cell.value}`}
              </title>
            </rect>
          )),
        )}
      </svg>
      {showLegend && (
        <div className="flex items-center gap-1.5 text-[10px] text-[hsl(var(--muted-foreground))] self-end">
          <span>Fewer</span>
          {colorScale.map((c, i) => (
            <span
              key={i}
              className="rounded-[2px]"
              style={{ background: c, width: cellSize, height: cellSize }}
            />
          ))}
          <span>More</span>
        </div>
      )}
    </div>
  )
}
