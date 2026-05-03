'use client'

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  addDays,
  addHours,
  addMonths,
  addWeeks,
  differenceInMinutes,
  endOfDay,
  format,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { cn } from '../utils/cn'
import { Button } from '../primitives/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../primitives/popover'

// ── Types ────────────────────────────────────────────────────────

export type CalendarEvent = {
  id: string
  title: string
  start: Date
  end: Date
  /** CSS color string (e.g. 'hsl(var(--chart-1))' or '#6366f1'). */
  color?: string
  data?: unknown
}

export type EventCalendarView = 'month' | 'week' | 'day'

export type EventCalendarProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onSelect'
> & {
  events: CalendarEvent[]
  view?: EventCalendarView
  onViewChange?: (view: EventCalendarView) => void
  date?: Date
  defaultDate?: Date
  onDateChange?: (date: Date) => void
  onEventClick?: (event: CalendarEvent) => void
  /** Omit to disable click-to-create. */
  onEventCreate?: (range: { start: Date; end: Date }) => void
  /** Omit to disable drag-to-resize. */
  onEventResize?: (eventId: string, newEnd: Date) => void
  /** 0 = Sunday, 1 = Monday, etc. Default 0. */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

// ── Constants ────────────────────────────────────────────────────

const HOUR_ROW_PX = 40
const DEFAULT_COLOR = 'hsl(var(--chart-1))'

// ── Helpers ──────────────────────────────────────────────────────

function clampToDay(date: Date, target: Date): Date {
  if (date < startOfDay(target)) return startOfDay(target)
  if (date > endOfDay(target)) return endOfDay(target)
  return date
}

function eventOverlapsDay(event: CalendarEvent, day: Date): boolean {
  const dayStart = startOfDay(day)
  const dayEnd = endOfDay(day)
  return event.end >= dayStart && event.start <= dayEnd
}

function getMonthMatrix(date: Date, weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6): Date[] {
  const monthStart = startOfMonth(date)
  const gridStart = startOfWeek(monthStart, { weekStartsOn })
  const cells: Date[] = []
  for (let i = 0; i < 42; i++) cells.push(addDays(gridStart, i))
  return cells
}

function getWeekDays(date: Date, weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6): Date[] {
  const start = startOfWeek(date, { weekStartsOn })
  return Array.from({ length: 7 }, (_, i) => addDays(start, i))
}

// ── EventCalendar ────────────────────────────────────────────────

export const EventCalendar = React.forwardRef<HTMLDivElement, EventCalendarProps>(
  (
    {
      events,
      view: viewProp,
      onViewChange,
      date: dateProp,
      defaultDate,
      onDateChange,
      onEventClick,
      onEventCreate,
      onEventResize,
      weekStartsOn = 0,
      className,
      ...props
    },
    ref
  ) => {
    // View state (controlled or uncontrolled)
    const [internalView, setInternalView] = React.useState<EventCalendarView>('month')
    const view = viewProp ?? internalView
    const commitView = React.useCallback(
      (next: EventCalendarView) => {
        if (viewProp === undefined) setInternalView(next)
        onViewChange?.(next)
      },
      [viewProp, onViewChange]
    )

    // Date state (controlled or uncontrolled)
    const [internalDate, setInternalDate] = React.useState<Date>(
      () => defaultDate ?? new Date()
    )
    const date = dateProp ?? internalDate
    const commitDate = React.useCallback(
      (next: Date) => {
        if (dateProp === undefined) setInternalDate(next)
        onDateChange?.(next)
      },
      [dateProp, onDateChange]
    )

    const handlePrev = () => {
      if (view === 'month') commitDate(addMonths(date, -1))
      else if (view === 'week') commitDate(addWeeks(date, -1))
      else commitDate(addDays(date, -1))
    }
    const handleNext = () => {
      if (view === 'month') commitDate(addMonths(date, 1))
      else if (view === 'week') commitDate(addWeeks(date, 1))
      else commitDate(addDays(date, 1))
    }
    const handleToday = () => commitDate(new Date())

    // Top-level keyboard: T = today, Arrow Left/Right = prev/next
    const handleRootKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement
      // Don't hijack typing inputs.
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return
      if (e.key === 't' || e.key === 'T') {
        e.preventDefault()
        handleToday()
      }
    }

    const headerLabel = React.useMemo(() => {
      if (view === 'month') return format(date, 'MMMM yyyy')
      if (view === 'week') {
        const start = startOfWeek(date, { weekStartsOn })
        const end = addDays(start, 6)
        if (isSameMonth(start, end)) return `${format(start, 'MMM d')} – ${format(end, 'd, yyyy')}`
        return `${format(start, 'MMM d')} – ${format(end, 'MMM d, yyyy')}`
      }
      return format(date, 'EEEE, MMMM d, yyyy')
    }, [date, view, weekStartsOn])

    return (
      <div
        ref={ref}
        data-slot="event-calendar"
        onKeyDown={handleRootKeyDown}
        className={cn(
          'flex w-full flex-col gap-3 rounded-lg border border-border bg-card text-foreground',
          className
        )}
        {...props}
      >
        {/* Header */}
        <div
          data-slot="event-calendar-header"
          className="flex items-center justify-between gap-2 border-b border-border px-3 py-2"
        >
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Previous"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleToday}
            >
              Today
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Next"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div
            data-slot="event-calendar-title"
            className="text-sm font-medium tabular-nums"
          >
            {headerLabel}
          </div>

          <div
            role="tablist"
            aria-label="Calendar view"
            className="flex items-center rounded-md border border-border p-0.5"
          >
            {(['month', 'week', 'day'] as const).map((v) => (
              <button
                key={v}
                type="button"
                role="tab"
                aria-selected={view === v}
                data-active={view === v || undefined}
                onClick={() => commitView(v)}
                className={cn(
                  'rounded px-2.5 py-1 text-xs font-medium capitalize transition-colors',
                  'text-muted-foreground hover:text-foreground',
                  'data-[active]:bg-accent data-[active]:text-accent-foreground'
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div data-slot="event-calendar-body" className="px-3 pb-3">
          {view === 'month' && (
            <MonthView
              date={date}
              events={events}
              weekStartsOn={weekStartsOn}
              onEventClick={onEventClick}
              onEventCreate={onEventCreate}
              onDayPick={(d) => {
                commitDate(d)
                commitView('day')
              }}
            />
          )}
          {view === 'week' && (
            <WeekView
              date={date}
              events={events}
              weekStartsOn={weekStartsOn}
              onEventClick={onEventClick}
              onEventCreate={onEventCreate}
              onEventResize={onEventResize}
            />
          )}
          {view === 'day' && (
            <DayView
              date={date}
              events={events}
              onEventClick={onEventClick}
              onEventCreate={onEventCreate}
              onEventResize={onEventResize}
            />
          )}
        </div>
      </div>
    )
  }
)
EventCalendar.displayName = 'EventCalendar'

// ── Month view ───────────────────────────────────────────────────

interface MonthViewProps {
  date: Date
  events: CalendarEvent[]
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6
  onEventClick?: (e: CalendarEvent) => void
  onEventCreate?: (range: { start: Date; end: Date }) => void
  onDayPick: (d: Date) => void
}

function MonthView({
  date,
  events,
  weekStartsOn,
  onEventClick,
  onEventCreate,
  onDayPick,
}: MonthViewProps) {
  const cells = React.useMemo(
    () => getMonthMatrix(date, weekStartsOn),
    [date, weekStartsOn]
  )
  const weekdayLabels = React.useMemo(() => {
    const start = startOfWeek(new Date(), { weekStartsOn })
    return Array.from({ length: 7 }, (_, i) => format(addDays(start, i), 'EEE'))
  }, [weekStartsOn])

  const today = new Date()

  return (
    <div className="flex flex-col" data-slot="event-calendar-month">
      <div className="grid grid-cols-7 border-b border-border">
        {weekdayLabels.map((label) => (
          <div
            key={label}
            className="px-2 py-2 text-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
          >
            {label}
          </div>
        ))}
      </div>

      <div role="grid" aria-label="Month grid" className="grid grid-cols-7">
        {cells.map((cell) => {
          const inMonth = isSameMonth(cell, date)
          const isToday = isSameDay(cell, today)
          const dayEvents = events
            .filter((ev) => eventOverlapsDay(ev, cell))
            .sort((a, b) => a.start.getTime() - b.start.getTime())
          const visible = dayEvents.slice(0, 3)
          const overflow = dayEvents.length - visible.length

          return (
            <div
              key={cell.toISOString()}
              role="gridcell"
              aria-label={format(cell, 'EEEE, MMMM d, yyyy')}
              tabIndex={0}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest('[data-event-chip]')) return
                if ((e.target as HTMLElement).closest('[data-overflow]')) return
                if (onEventCreate) {
                  onEventCreate({ start: startOfDay(cell), end: endOfDay(cell) })
                } else {
                  onDayPick(cell)
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  if (onEventCreate) {
                    onEventCreate({ start: startOfDay(cell), end: endOfDay(cell) })
                  } else {
                    onDayPick(cell)
                  }
                }
              }}
              className={cn(
                'group relative flex min-h-[96px] flex-col gap-1 border-b border-r border-border p-1.5 text-left outline-none',
                'cursor-pointer hover:bg-accent/40',
                'focus-visible:ring-2 focus-visible:ring-ring',
                !inMonth && 'bg-muted/30 text-muted-foreground'
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-medium tabular-nums',
                    isToday &&
                      'bg-primary text-primary-foreground',
                    !isToday && !inMonth && 'text-muted-foreground'
                  )}
                >
                  {format(cell, 'd')}
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                {visible.map((ev) => (
                  <EventChip
                    key={ev.id}
                    event={ev}
                    onClick={() => onEventClick?.(ev)}
                  />
                ))}
                {overflow > 0 && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        data-overflow
                        onClick={(e) => e.stopPropagation()}
                        className="rounded px-1.5 py-0.5 text-left text-[11px] font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                      >
                        +{overflow} more
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-2" align="start">
                      <div className="mb-1 px-1 text-xs font-medium text-muted-foreground">
                        {format(cell, 'EEEE, MMM d')}
                      </div>
                      <div className="flex flex-col gap-1">
                        {dayEvents.map((ev) => (
                          <EventChip
                            key={ev.id}
                            event={ev}
                            onClick={() => onEventClick?.(ev)}
                          />
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Event chip (month-view pill) ─────────────────────────────────

function EventChip({
  event,
  onClick,
}: {
  event: CalendarEvent
  onClick?: () => void
}) {
  const color = event.color ?? DEFAULT_COLOR
  return (
    <button
      type="button"
      data-event-chip
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      title={event.title}
      className="group/chip flex w-full items-center gap-1.5 truncate rounded px-1.5 py-0.5 text-left text-[11px] font-medium text-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{
        backgroundColor: `color-mix(in oklab, ${color} 22%, transparent)`,
      }}
    >
      <span
        aria-hidden="true"
        className="h-2 w-2 flex-shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="truncate">{event.title}</span>
    </button>
  )
}

// ── Hour grid (shared by Week + Day) ─────────────────────────────

interface HourGridProps {
  days: Date[]
  events: CalendarEvent[]
  onEventClick?: (e: CalendarEvent) => void
  onEventCreate?: (range: { start: Date; end: Date }) => void
  onEventResize?: (eventId: string, newEnd: Date) => void
}

function HourGrid({
  days,
  events,
  onEventClick,
  onEventCreate,
  onEventResize,
}: HourGridProps) {
  const hours = React.useMemo(() => Array.from({ length: 24 }, (_, i) => i), [])
  const today = new Date()

  return (
    <div
      role="grid"
      aria-label="Hour grid"
      className="flex w-full overflow-hidden rounded-md border border-border"
    >
      {/* Hour gutter */}
      <div className="flex w-14 flex-shrink-0 flex-col border-r border-border">
        <div className="h-10 border-b border-border" />
        {hours.map((h) => (
          <div
            key={h}
            style={{ height: HOUR_ROW_PX }}
            className="relative -mt-px text-right text-[10px] text-muted-foreground"
          >
            <span className="absolute -top-1.5 right-1.5 bg-card px-1">
              {format(new Date(2000, 0, 1, h), 'h a')}
            </span>
          </div>
        ))}
      </div>

      {/* Day columns */}
      <div
        className="grid flex-1"
        style={{ gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))` }}
      >
        {days.map((day) => (
          <DayColumn
            key={day.toISOString()}
            day={day}
            isToday={isSameDay(day, today)}
            events={events.filter((ev) => eventOverlapsDay(ev, day))}
            onEventClick={onEventClick}
            onEventCreate={onEventCreate}
            onEventResize={onEventResize}
            showHeader={days.length > 1}
          />
        ))}
      </div>
    </div>
  )
}

// ── Day column (one in Week view, one solo in Day view) ──────────

interface DayColumnProps {
  day: Date
  isToday: boolean
  events: CalendarEvent[]
  onEventClick?: (e: CalendarEvent) => void
  onEventCreate?: (range: { start: Date; end: Date }) => void
  onEventResize?: (eventId: string, newEnd: Date) => void
  showHeader: boolean
}

function DayColumn({
  day,
  isToday,
  events,
  onEventClick,
  onEventCreate,
  onEventResize,
  showHeader,
}: DayColumnProps) {
  const bodyRef = React.useRef<HTMLDivElement | null>(null)

  const handleEmptyClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('[data-event-block]')) return
    if (!onEventCreate) return
    const rect = bodyRef.current?.getBoundingClientRect()
    if (!rect) return
    const offsetY = e.clientY - rect.top
    const hour = Math.max(0, Math.min(23, Math.floor(offsetY / HOUR_ROW_PX)))
    const start = addHours(startOfDay(day), hour)
    const end = addHours(start, 1)
    onEventCreate({ start, end })
  }

  return (
    <div className="flex flex-col border-r border-border last:border-r-0">
      {showHeader && (
        <div
          className={cn(
            'flex h-10 flex-col items-center justify-center border-b border-border text-[11px]',
            isToday && 'bg-primary/10'
          )}
        >
          <span className="font-medium uppercase tracking-wide text-muted-foreground">
            {format(day, 'EEE')}
          </span>
          <span
            className={cn(
              'tabular-nums',
              isToday ? 'font-semibold text-primary' : 'text-foreground'
            )}
          >
            {format(day, 'd')}
          </span>
        </div>
      )}

      <div
        ref={bodyRef}
        role="row"
        aria-label={format(day, 'EEEE, MMMM d')}
        onClick={handleEmptyClick}
        className={cn(
          'relative',
          onEventCreate && 'cursor-pointer'
        )}
        style={{ height: 24 * HOUR_ROW_PX }}
      >
        {/* Hour rules */}
        {Array.from({ length: 24 }, (_, h) => (
          <div
            key={h}
            style={{ top: h * HOUR_ROW_PX, height: HOUR_ROW_PX }}
            className="pointer-events-none absolute inset-x-0 border-t border-border/60"
          />
        ))}

        {/* Events */}
        {events.map((ev) => (
          <EventBlock
            key={ev.id}
            event={ev}
            day={day}
            onClick={() => onEventClick?.(ev)}
            onResize={onEventResize}
          />
        ))}
      </div>
    </div>
  )
}

// ── Event block (week/day positioned absolute) ───────────────────

interface EventBlockProps {
  event: CalendarEvent
  day: Date
  onClick?: () => void
  onResize?: (eventId: string, newEnd: Date) => void
}

function EventBlock({ event, day, onClick, onResize }: EventBlockProps) {
  const color = event.color ?? DEFAULT_COLOR

  // Clamp to current day so multi-day events render within column.
  const visibleStart = clampToDay(event.start, day)
  const visibleEnd = clampToDay(event.end, day)

  const startMinutes =
    differenceInMinutes(visibleStart, startOfDay(day))
  const durationMinutes = Math.max(
    20,
    differenceInMinutes(visibleEnd, visibleStart)
  )
  const top = (startMinutes / 60) * HOUR_ROW_PX
  const [resizingDelta, setResizingDelta] = React.useState(0)
  const height = (durationMinutes / 60) * HOUR_ROW_PX + resizingDelta

  const isResizing = React.useRef(false)
  const startY = React.useRef(0)

  const handleResizePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!onResize) return
    e.preventDefault()
    e.stopPropagation()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    isResizing.current = true
    startY.current = e.clientY
    setResizingDelta(0)
  }
  const handleResizePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isResizing.current) return
    const delta = e.clientY - startY.current
    setResizingDelta(delta)
  }
  const handleResizePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isResizing.current) return
    isResizing.current = false
    const delta = e.clientY - startY.current
    setResizingDelta(0)
    if (onResize) {
      // Snap to 15-minute increments.
      const minutesDelta = Math.round((delta / HOUR_ROW_PX) * 60 / 15) * 15
      const newEnd = new Date(event.end.getTime() + minutesDelta * 60 * 1000)
      // Don't let event collapse below 15 min.
      const minEnd = new Date(event.start.getTime() + 15 * 60 * 1000)
      onResize(event.id, newEnd < minEnd ? minEnd : newEnd)
    }
    try {
      ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      // ignore
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      data-event-block
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
      title={event.title}
      style={{
        top,
        height,
        backgroundColor: `color-mix(in oklab, ${color} 22%, transparent)`,
        borderLeft: `3px solid ${color}`,
      }}
      className="group/block absolute inset-x-1 z-10 overflow-hidden rounded-md px-1.5 py-1 text-left text-[11px] text-foreground shadow-sm outline-none hover:brightness-110 focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="truncate font-medium">{event.title}</div>
      <div className="truncate text-[10px] text-muted-foreground">
        {format(event.start, 'h:mm a')} – {format(event.end, 'h:mm a')}
      </div>
      {onResize && (
        <div
          aria-label="Resize event"
          onPointerDown={handleResizePointerDown}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerUp}
          onPointerCancel={handleResizePointerUp}
          className="absolute inset-x-0 bottom-0 h-2 cursor-ns-resize opacity-0 transition-opacity group-hover/block:opacity-100"
          style={{
            background: `linear-gradient(to bottom, transparent, ${color})`,
          }}
        />
      )}
    </div>
  )
}

// ── Week view ────────────────────────────────────────────────────

interface WeekViewProps {
  date: Date
  events: CalendarEvent[]
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6
  onEventClick?: (e: CalendarEvent) => void
  onEventCreate?: (range: { start: Date; end: Date }) => void
  onEventResize?: (eventId: string, newEnd: Date) => void
}

function WeekView({
  date,
  events,
  weekStartsOn,
  onEventClick,
  onEventCreate,
  onEventResize,
}: WeekViewProps) {
  const days = React.useMemo(
    () => getWeekDays(date, weekStartsOn),
    [date, weekStartsOn]
  )
  return (
    <div data-slot="event-calendar-week" className="max-h-[640px] overflow-auto">
      <HourGrid
        days={days}
        events={events}
        onEventClick={onEventClick}
        onEventCreate={onEventCreate}
        onEventResize={onEventResize}
      />
    </div>
  )
}

// ── Day view ─────────────────────────────────────────────────────

interface DayViewProps {
  date: Date
  events: CalendarEvent[]
  onEventClick?: (e: CalendarEvent) => void
  onEventCreate?: (range: { start: Date; end: Date }) => void
  onEventResize?: (eventId: string, newEnd: Date) => void
}

function DayView({
  date,
  events,
  onEventClick,
  onEventCreate,
  onEventResize,
}: DayViewProps) {
  return (
    <div data-slot="event-calendar-day" className="max-h-[640px] overflow-auto">
      <HourGrid
        days={[date]}
        events={events}
        onEventClick={onEventClick}
        onEventCreate={onEventCreate}
        onEventResize={onEventResize}
      />
    </div>
  )
}
