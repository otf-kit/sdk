'use client'

import React from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import {
  addDays,
  addMonths,
  addWeeks,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarWeeks,
  endOfMonth,
  endOfWeek,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { cn } from '../utils/cn'

// ── Types ────────────────────────────────────────────────────────

export type GanttItem = {
  id: string
  title: string
  start: Date
  end: Date
  /** 0..100. Default 0. */
  progress?: number
  /** CSS color (e.g. 'hsl(var(--chart-1))' or '#hex'). */
  color?: string
  /** ids of upstream items — render arrows */
  dependsOn?: string[]
  /** optional row grouping label */
  group?: string
}

export type GanttScale = 'days' | 'weeks' | 'months'

export type GanttProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onMove'
> & {
  items: GanttItem[]
  scale?: GanttScale
  startDate?: Date
  endDate?: Date
  rowHeight?: number
  /** Omit = read-only. */
  onItemMove?: (id: string, newStart: Date, newEnd: Date) => void
  /** Omit = no resize. */
  onItemResize?: (id: string, newEnd: Date) => void
  onItemClick?: (item: GanttItem) => void
  showDependencies?: boolean
  showProgress?: boolean
  showToday?: boolean
}

// ── Constants ────────────────────────────────────────────────────

const DEFAULT_COLUMN_WIDTH: Record<GanttScale, number> = {
  days: 56,
  weeks: 80,
  months: 120,
}
const SIDEBAR_WIDTH = 280
const HEADER_HEIGHT = 44
const DEFAULT_ROW_HEIGHT = 40
const DEFAULT_COLOR = 'hsl(var(--chart-1))'
const EDGE_HIT_PX = 8
const LONG_PRESS_MS = 300

// ── Scale helpers ────────────────────────────────────────────────

function startOfScale(date: Date, scale: GanttScale): Date {
  if (scale === 'days') return startOfDay(date)
  if (scale === 'weeks') return startOfWeek(date, { weekStartsOn: 1 })
  return startOfMonth(date)
}

function endOfScale(date: Date, scale: GanttScale): Date {
  if (scale === 'days') return startOfDay(date)
  if (scale === 'weeks') return endOfWeek(date, { weekStartsOn: 1 })
  return endOfMonth(date)
}

function addUnits(date: Date, n: number, scale: GanttScale): Date {
  if (scale === 'days') return addDays(date, n)
  if (scale === 'weeks') return addWeeks(date, n)
  return addMonths(date, n)
}

/** Float distance in scale-units between two dates (a -> b). */
function unitsBetween(a: Date, b: Date, scale: GanttScale): number {
  if (scale === 'days') {
    return (b.getTime() - a.getTime()) / 86_400_000
  }
  if (scale === 'weeks') {
    return (b.getTime() - a.getTime()) / (7 * 86_400_000)
  }
  // Months: blend integer month delta + fractional day-in-month.
  const wholeMonths = differenceInCalendarMonths(b, a)
  const monthAnchor = addMonths(a, wholeMonths)
  const monthLen =
    (endOfMonth(monthAnchor).getTime() - startOfMonth(monthAnchor).getTime()) /
      86_400_000 +
    1
  const remainderDays =
    (b.getTime() - monthAnchor.getTime()) / 86_400_000
  return wholeMonths + remainderDays / monthLen
}

/** Total integer columns spanning [viewportStart, viewportEnd]. */
function totalColumns(
  viewportStart: Date,
  viewportEnd: Date,
  scale: GanttScale
): number {
  if (scale === 'days') {
    return Math.max(1, differenceInCalendarDays(viewportEnd, viewportStart) + 1)
  }
  if (scale === 'weeks') {
    return Math.max(1, differenceInCalendarWeeks(viewportEnd, viewportStart, { weekStartsOn: 1 }) + 1)
  }
  return Math.max(1, differenceInCalendarMonths(viewportEnd, viewportStart) + 1)
}

function formatColumnLabel(date: Date, scale: GanttScale): string {
  if (scale === 'days') return format(date, 'EEE d')
  if (scale === 'weeks') return `Week ${format(date, 'w')}`
  return format(date, 'MMM yyyy')
}

function formatColumnSubLabel(date: Date, scale: GanttScale): string | null {
  if (scale === 'days') return format(date, 'MMM')
  if (scale === 'weeks') return format(date, 'MMM yyyy')
  return null
}

function snapDate(date: Date, scale: GanttScale): Date {
  return startOfScale(date, scale)
}

// ── Gantt ────────────────────────────────────────────────────────

export const Gantt = React.forwardRef<HTMLDivElement, GanttProps>(
  (
    {
      items,
      scale = 'days',
      startDate,
      endDate,
      rowHeight = DEFAULT_ROW_HEIGHT,
      onItemMove,
      onItemResize,
      onItemClick,
      showDependencies = true,
      showProgress = true,
      showToday = true,
      className,
      ...props
    },
    ref
  ) => {
    const interactive = !!onItemMove || !!onItemResize
    const columnWidth = DEFAULT_COLUMN_WIDTH[scale]

    // ── Viewport range ──────────────────────────────────────────
    const viewport = React.useMemo(() => {
      const earliest =
        startDate ??
        (items.length
          ? new Date(Math.min(...items.map((i) => i.start.getTime())))
          : new Date())
      const latest =
        endDate ??
        (items.length
          ? new Date(Math.max(...items.map((i) => i.end.getTime())))
          : addDays(new Date(), 14))
      return {
        start: startOfScale(earliest, scale),
        end: endOfScale(latest, scale),
      }
    }, [items, startDate, endDate, scale])

    const colCount = totalColumns(viewport.start, viewport.end, scale)
    const timelineWidth = colCount * columnWidth

    // ── Group rows ──────────────────────────────────────────────
    const grouped = React.useMemo(() => {
      const map = new Map<string | undefined, GanttItem[]>()
      for (const it of items) {
        const k = it.group ?? undefined
        if (!map.has(k)) map.set(k, [])
        map.get(k)!.push(it)
      }
      return Array.from(map.entries()) // preserves insertion order
    }, [items])

    const hasGroups = grouped.some(([k]) => k !== undefined)

    const [collapsed, setCollapsed] = React.useState<Set<string>>(() => new Set())
    const toggleGroup = (key: string) => {
      setCollapsed((prev) => {
        const next = new Set(prev)
        if (next.has(key)) next.delete(key)
        else next.add(key)
        return next
      })
    }

    // Build flat row layout: each row is a header or an item.
    type Row =
      | { kind: 'group'; key: string; count: number }
      | { kind: 'item'; item: GanttItem }
    const rows = React.useMemo<Row[]>(() => {
      const out: Row[] = []
      for (const [groupKey, list] of grouped) {
        if (groupKey !== undefined) {
          out.push({ kind: 'group', key: groupKey, count: list.length })
          if (collapsed.has(groupKey)) continue
        }
        for (const it of list) out.push({ kind: 'item', item: it })
      }
      return out
    }, [grouped, collapsed])

    // ── Item position lookup (for dependency arrows) ────────────
    const itemRowIndex = React.useMemo(() => {
      const m = new Map<string, number>()
      rows.forEach((r, i) => {
        if (r.kind === 'item') m.set(r.item.id, i)
      })
      return m
    }, [rows])

    // ── Today line ──────────────────────────────────────────────
    const todayOffsetPx = React.useMemo(() => {
      if (!showToday) return null
      const now = new Date()
      const u = unitsBetween(viewport.start, now, scale)
      if (u < 0 || u > colCount) return null
      return u * columnWidth
    }, [showToday, viewport.start, scale, colCount, columnWidth])

    // ── Column header cells ─────────────────────────────────────
    const columnDates = React.useMemo(() => {
      return Array.from({ length: colCount }, (_, i) =>
        addUnits(viewport.start, i, scale)
      )
    }, [viewport.start, colCount, scale])

    return (
      <div
        ref={ref}
        data-slot="gantt"
        className={cn(
          'flex w-full overflow-hidden rounded-lg border border-border bg-card text-foreground',
          className
        )}
        {...props}
      >
        {/* ── LEFT: sidebar (sticky-ish via flex layout) ─────── */}
        <div
          data-slot="gantt-sidebar"
          className="flex shrink-0 flex-col border-r border-border bg-card"
          style={{ width: SIDEBAR_WIDTH }}
        >
          <div
            className="flex items-center border-b border-border px-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
            style={{ height: HEADER_HEIGHT }}
          >
            Task
          </div>
          <div className="flex flex-col">
            {rows.map((row, idx) => {
              if (row.kind === 'group') {
                const isCollapsed = collapsed.has(row.key)
                return (
                  <button
                    key={`g:${row.key}`}
                    type="button"
                    onClick={() => toggleGroup(row.key)}
                    aria-expanded={!isCollapsed}
                    className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-3 text-left text-xs font-semibold text-foreground hover:bg-muted/60"
                    style={{ height: rowHeight }}
                  >
                    {isCollapsed ? (
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    <span className="truncate">{row.key}</span>
                    <span className="ml-auto text-[10px] font-normal tabular-nums text-muted-foreground">
                      {row.count}
                    </span>
                  </button>
                )
              }
              return (
                <div
                  key={`i:${row.item.id}`}
                  className={cn(
                    'flex items-center gap-2 border-b border-border px-3 text-xs text-foreground',
                    hasGroups && 'pl-6'
                  )}
                  style={{ height: rowHeight }}
                  title={row.item.title}
                >
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: row.item.color ?? DEFAULT_COLOR }}
                  />
                  <span className="truncate font-medium">{row.item.title}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── RIGHT: timeline ─────────────────────────────────── */}
        <div
          data-slot="gantt-timeline"
          className="relative flex-1 overflow-x-auto overflow-y-hidden"
        >
          <div style={{ width: timelineWidth, minWidth: '100%' }}>
            {/* Header */}
            <div
              data-slot="gantt-timeline-header"
              className="grid border-b border-border bg-card"
              style={{
                gridTemplateColumns: `repeat(${colCount}, ${columnWidth}px)`,
                height: HEADER_HEIGHT,
              }}
            >
              {columnDates.map((d, i) => {
                const sub = formatColumnSubLabel(d, scale)
                const isMonthBoundary =
                  scale === 'days' && d.getDate() === 1
                return (
                  <div
                    key={i}
                    className={cn(
                      'flex flex-col items-center justify-center border-r border-border text-[11px]',
                      isMonthBoundary && 'bg-muted/30'
                    )}
                  >
                    <span className="font-medium tabular-nums text-foreground">
                      {formatColumnLabel(d, scale)}
                    </span>
                    {sub && (
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        {sub}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Body */}
            <div
              role="grid"
              aria-label="Gantt timeline"
              data-slot="gantt-timeline-body"
              className="relative"
              style={{ height: rows.length * rowHeight }}
            >
              {/* Vertical column rules */}
              <div
                className="pointer-events-none absolute inset-0 grid"
                style={{
                  gridTemplateColumns: `repeat(${colCount}, ${columnWidth}px)`,
                }}
                aria-hidden="true"
              >
                {Array.from({ length: colCount }, (_, i) => (
                  <div key={i} className="border-r border-border/60" />
                ))}
              </div>

              {/* Horizontal row rules */}
              <div
                className="pointer-events-none absolute inset-0 flex flex-col"
                aria-hidden="true"
              >
                {rows.map((row, i) => (
                  <div
                    key={i}
                    className={cn(
                      'border-b border-border',
                      row.kind === 'group' && 'bg-muted/40'
                    )}
                    style={{ height: rowHeight }}
                  />
                ))}
              </div>

              {/* Today line */}
              {todayOffsetPx !== null && (
                <div
                  data-slot="gantt-today"
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 bottom-0 w-px bg-primary/60"
                  style={{ left: todayOffsetPx }}
                >
                  <div className="absolute -top-1 -left-[3px] h-1.5 w-1.5 rounded-full bg-primary" />
                </div>
              )}

              {/* Bars */}
              {rows.map((row, i) => {
                if (row.kind !== 'item') return null
                return (
                  <GanttBar
                    key={row.item.id}
                    item={row.item}
                    rowIndex={i}
                    rowHeight={rowHeight}
                    viewportStart={viewport.start}
                    scale={scale}
                    columnWidth={columnWidth}
                    timelineWidth={timelineWidth}
                    showProgress={showProgress}
                    interactive={interactive}
                    onItemMove={onItemMove}
                    onItemResize={onItemResize}
                    onItemClick={onItemClick}
                  />
                )
              })}

              {/* Dependency arrows */}
              {showDependencies && (
                <DependencyLayer
                  items={items}
                  itemRowIndex={itemRowIndex}
                  rowHeight={rowHeight}
                  viewportStart={viewport.start}
                  scale={scale}
                  columnWidth={columnWidth}
                  timelineWidth={timelineWidth}
                  totalHeight={rows.length * rowHeight}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
)
Gantt.displayName = 'Gantt'

// ── GanttBar ─────────────────────────────────────────────────────

type DragMode = 'move' | 'resize-left' | 'resize-right' | null

interface GanttBarProps {
  item: GanttItem
  rowIndex: number
  rowHeight: number
  viewportStart: Date
  scale: GanttScale
  columnWidth: number
  timelineWidth: number
  showProgress: boolean
  interactive: boolean
  onItemMove?: (id: string, newStart: Date, newEnd: Date) => void
  onItemResize?: (id: string, newEnd: Date) => void
  onItemClick?: (item: GanttItem) => void
}

function GanttBar({
  item,
  rowIndex,
  rowHeight,
  viewportStart,
  scale,
  columnWidth,
  timelineWidth,
  showProgress,
  interactive,
  onItemMove,
  onItemResize,
  onItemClick,
}: GanttBarProps) {
  const color = item.color ?? DEFAULT_COLOR
  const progress = Math.max(0, Math.min(100, item.progress ?? 0))

  // Drag-preview deltas (in pixels). Committed on pointerup.
  const [previewLeftDelta, setPreviewLeftDelta] = React.useState(0)
  const [previewRightDelta, setPreviewRightDelta] = React.useState(0)

  const dragMode = React.useRef<DragMode>(null)
  const startX = React.useRef(0)
  const longPressTimer = React.useRef<number | null>(null)
  const moved = React.useRef(false)

  // Base position (in px) before any drag preview.
  const baseLeft = unitsBetween(viewportStart, item.start, scale) * columnWidth
  const baseRight =
    unitsBetween(viewportStart, item.end, scale) * columnWidth
  const baseWidth = Math.max(columnWidth * 0.25, baseRight - baseLeft)

  // Apply preview deltas based on which mode is active.
  const left = baseLeft + previewLeftDelta
  const width = Math.max(
    columnWidth * 0.25,
    baseWidth - previewLeftDelta + previewRightDelta
  )

  const top = rowIndex * rowHeight + 4
  const barHeight = rowHeight - 8

  const cancelLongPress = () => {
    if (longPressTimer.current !== null) {
      window.clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  const beginDrag = (
    e: React.PointerEvent<HTMLDivElement>,
    mode: DragMode
  ) => {
    if (!interactive || !mode) return
    if (mode === 'move' && !onItemMove) return
    if (mode === 'resize-left' && !onItemMove) return
    if (mode === 'resize-right' && !onItemResize && !onItemMove) return
    dragMode.current = mode
    startX.current = e.clientX
    moved.current = false
    setPreviewLeftDelta(0)
    setPreviewRightDelta(0)
    try {
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    } catch {
      // ignore
    }
  }

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    mode: Exclude<DragMode, null>
  ) => {
    if (!interactive) return
    e.stopPropagation()
    // Touch → long-press to start drag (avoids scroll hijack).
    if (e.pointerType === 'touch') {
      cancelLongPress()
      longPressTimer.current = window.setTimeout(() => {
        beginDrag(e, mode)
      }, LONG_PRESS_MS)
      return
    }
    e.preventDefault()
    beginDrag(e, mode)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragMode.current) return
    const delta = e.clientX - startX.current
    if (Math.abs(delta) > 2) moved.current = true
    if (dragMode.current === 'move') {
      setPreviewLeftDelta(delta)
      setPreviewRightDelta(delta)
    } else if (dragMode.current === 'resize-left') {
      // Don't let bar invert.
      const clamped = Math.min(delta, baseWidth - columnWidth * 0.25)
      setPreviewLeftDelta(clamped)
    } else if (dragMode.current === 'resize-right') {
      const clamped = Math.max(delta, -(baseWidth - columnWidth * 0.25))
      setPreviewRightDelta(clamped)
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    cancelLongPress()
    const mode = dragMode.current
    if (!mode) return
    dragMode.current = null
    const delta = e.clientX - startX.current
    setPreviewLeftDelta(0)
    setPreviewRightDelta(0)
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      // ignore
    }
    // Snap delta to nearest unit.
    const unitsDelta = Math.round(delta / columnWidth)
    if (unitsDelta === 0) return

    if (mode === 'move' && onItemMove) {
      const newStart = snapDate(addUnits(item.start, unitsDelta, scale), scale)
      const span =
        unitsBetween(item.start, item.end, scale)
      const newEnd = addUnits(newStart, span, scale)
      onItemMove(item.id, newStart, newEnd)
    } else if (mode === 'resize-left' && onItemMove) {
      // Resizing from left moves the start; end stays put. Re-use onItemMove.
      const newStart = snapDate(addUnits(item.start, unitsDelta, scale), scale)
      // Don't let start cross end.
      if (newStart >= item.end) return
      onItemMove(item.id, newStart, item.end)
    } else if (mode === 'resize-right') {
      const newEnd = snapDate(addUnits(item.end, unitsDelta, scale), scale)
      if (newEnd <= item.start) return
      if (onItemResize) onItemResize(item.id, newEnd)
      else if (onItemMove) onItemMove(item.id, item.start, newEnd)
    }
  }

  const handleClick = () => {
    if (moved.current) return
    onItemClick?.(item)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onItemClick?.(item)
      return
    }
    const isLeft = e.key === 'ArrowLeft'
    const isRight = e.key === 'ArrowRight'
    if (!isLeft && !isRight) return
    if (!onItemMove) return
    e.preventDefault()
    const dir = isLeft ? -1 : 1
    // Shift+arrow = larger step (1 week in days mode, otherwise just 1).
    let units = dir
    if (e.shiftKey) {
      units = scale === 'days' ? dir * 7 : dir
    }
    const newStart = addUnits(item.start, units, scale)
    const newEnd = addUnits(item.end, units, scale)
    onItemMove(item.id, newStart, newEnd)
  }

  const ariaLabel = `${item.title}, ${format(item.start, 'PP')} to ${format(
    item.end,
    'PP'
  )}`

  // Clamp visual bounds to timeline width so off-viewport bars don't overflow.
  const clampedLeft = Math.max(0, left)
  const clampedRight = Math.min(timelineWidth, left + width)
  const visibleWidth = Math.max(0, clampedRight - clampedLeft)

  return (
    <div
      data-slot="gantt-bar"
      data-item-id={item.id}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onPointerDown={(e) => handlePointerDown(e, 'move')}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      title={item.title}
      style={{
        left: clampedLeft,
        top,
        width: visibleWidth,
        height: barHeight,
        backgroundColor: `color-mix(in oklab, ${color} 35%, transparent)`,
        borderColor: color,
      }}
      className={cn(
        'group/bar absolute z-10 flex items-center overflow-hidden rounded-md border-l-[3px] px-2 text-[11px] font-medium text-foreground shadow-sm outline-none transition-shadow hover:brightness-110 focus-visible:ring-2 focus-visible:ring-ring',
        interactive && onItemMove && 'cursor-grab active:cursor-grabbing',
        !interactive && onItemClick && 'cursor-pointer'
      )}
    >
      {/* Progress fill */}
      {showProgress && progress > 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0"
          style={{
            width: `${progress}%`,
            backgroundColor: `color-mix(in oklab, ${color} 55%, transparent)`,
          }}
        />
      )}

      <span className="relative z-10 truncate">{item.title}</span>
      {showProgress && (
        <span className="relative z-10 ml-auto pl-2 text-[10px] tabular-nums text-muted-foreground">
          {progress}%
        </span>
      )}

      {/* Left edge handle */}
      {interactive && onItemMove && (
        <div
          aria-label="Resize start"
          onPointerDown={(e) => handlePointerDown(e, 'resize-left')}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="absolute inset-y-0 left-0 z-20 w-2 cursor-ew-resize opacity-0 transition-opacity group-hover/bar:opacity-100"
          style={{ width: EDGE_HIT_PX }}
        />
      )}
      {/* Right edge handle */}
      {interactive && (onItemResize || onItemMove) && (
        <div
          aria-label="Resize end"
          onPointerDown={(e) => handlePointerDown(e, 'resize-right')}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="absolute inset-y-0 right-0 z-20 cursor-ew-resize opacity-0 transition-opacity group-hover/bar:opacity-100"
          style={{ width: EDGE_HIT_PX }}
        />
      )}
    </div>
  )
}

// ── DependencyLayer ─────────────────────────────────────────────

interface DependencyLayerProps {
  items: GanttItem[]
  itemRowIndex: Map<string, number>
  rowHeight: number
  viewportStart: Date
  scale: GanttScale
  columnWidth: number
  timelineWidth: number
  totalHeight: number
}

function DependencyLayer({
  items,
  itemRowIndex,
  rowHeight,
  viewportStart,
  scale,
  columnWidth,
  timelineWidth,
  totalHeight,
}: DependencyLayerProps) {
  const itemById = React.useMemo(() => {
    const m = new Map<string, GanttItem>()
    for (const it of items) m.set(it.id, it)
    return m
  }, [items])

  const arrows: Array<{ id: string; d: string; endX: number; endY: number }> = []
  for (const downstream of items) {
    if (!downstream.dependsOn?.length) continue
    const dRow = itemRowIndex.get(downstream.id)
    if (dRow === undefined) continue
    const dStartX =
      unitsBetween(viewportStart, downstream.start, scale) * columnWidth
    const dY = dRow * rowHeight + rowHeight / 2

    for (const upId of downstream.dependsOn) {
      const up = itemById.get(upId)
      if (!up) continue
      const uRow = itemRowIndex.get(upId)
      if (uRow === undefined) continue
      const uEndX = unitsBetween(viewportStart, up.end, scale) * columnWidth
      const uY = uRow * rowHeight + rowHeight / 2

      // L-shaped polyline: out from upstream end, then down/up, then into downstream start.
      const stub = 12
      const midX = Math.max(uEndX + stub, dStartX - stub)
      const d = `M ${uEndX} ${uY} L ${midX} ${uY} L ${midX} ${dY} L ${dStartX} ${dY}`
      arrows.push({
        id: `${upId}->${downstream.id}`,
        d,
        endX: dStartX,
        endY: dY,
      })
    }
  }

  if (arrows.length === 0) return null

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-20"
      width={timelineWidth}
      height={totalHeight}
      aria-hidden="true"
    >
      <defs>
        <marker
          id="gantt-arrow-head"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>
      <g className="text-muted-foreground">
        {arrows.map((a) => (
          <path
            key={a.id}
            d={a.d}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeOpacity="0.5"
            markerEnd="url(#gantt-arrow-head)"
          />
        ))}
      </g>
    </svg>
  )
}
