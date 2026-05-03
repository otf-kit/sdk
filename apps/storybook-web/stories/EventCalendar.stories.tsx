import type { Meta, StoryObj } from '@storybook/react'
import { useMemo, useState } from 'react'
import { EventCalendar, type CalendarEvent, type EventCalendarView } from '@otf/ui'

const meta: Meta<typeof EventCalendar> = {
  title: 'Data/EventCalendar',
  component: EventCalendar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof EventCalendar>

// ── Helpers ──────────────────────────────────────────────────────

const CHART_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
] as const

function at(day: Date, hour: number, minute = 0): Date {
  const d = new Date(day)
  d.setHours(hour, minute, 0, 0)
  return d
}

function addDays(d: Date, days: number): Date {
  const next = new Date(d)
  next.setDate(next.getDate() + days)
  return next
}

function startOfMonth(d: Date): Date {
  const next = new Date(d)
  next.setDate(1)
  next.setHours(0, 0, 0, 0)
  return next
}

function startOfWeek(d: Date): Date {
  const next = new Date(d)
  next.setHours(0, 0, 0, 0)
  next.setDate(next.getDate() - next.getDay())
  return next
}

// ── Mock data ────────────────────────────────────────────────────

function buildMonthEvents(refDate: Date): CalendarEvent[] {
  const m = startOfMonth(refDate)
  const titles = [
    'Design review',
    'Standup',
    'Customer interview',
    '1:1 with Priya',
    'Marketing sync',
    'Roadmap planning',
    'Lunch w/ Theo',
    'Gym',
    'Sprint demo',
    'Investor update',
    'Onboarding call',
    'Hack night',
  ]
  const offsets = [2, 4, 5, 8, 10, 12, 14, 17, 19, 22, 24, 27]
  return titles.map((title, i) => {
    const day = addDays(m, offsets[i])
    return {
      id: `m-${i}`,
      title,
      start: at(day, 9 + (i % 6)),
      end: at(day, 10 + (i % 6)),
      color: CHART_COLORS[i % CHART_COLORS.length],
    }
  })
}

function buildWeekEvents(refDate: Date): CalendarEvent[] {
  const w = startOfWeek(refDate)
  return [
    {
      id: 'w-1',
      title: 'Team standup',
      start: at(addDays(w, 1), 9, 0),
      end: at(addDays(w, 1), 9, 30),
      color: CHART_COLORS[0],
    },
    {
      id: 'w-2',
      title: 'Design crit',
      start: at(addDays(w, 1), 14, 0),
      end: at(addDays(w, 1), 15, 30),
      color: CHART_COLORS[1],
    },
    {
      id: 'w-3',
      title: 'Deep work block',
      start: at(addDays(w, 2), 10, 0),
      end: at(addDays(w, 2), 13, 0),
      color: CHART_COLORS[2],
    },
    {
      id: 'w-4',
      title: 'Customer call: Acme',
      start: at(addDays(w, 3), 11, 0),
      end: at(addDays(w, 3), 12, 0),
      color: CHART_COLORS[3],
    },
    {
      id: 'w-5',
      title: 'Lunch w/ Theo',
      start: at(addDays(w, 3), 13, 0),
      end: at(addDays(w, 3), 14, 0),
      color: CHART_COLORS[4],
    },
    {
      id: 'w-6',
      title: 'Sprint demo',
      start: at(addDays(w, 4), 15, 0),
      end: at(addDays(w, 4), 16, 30),
      color: CHART_COLORS[0],
    },
    {
      id: 'w-7',
      title: 'Roadmap planning',
      start: at(addDays(w, 5), 9, 30),
      end: at(addDays(w, 5), 12, 0),
      color: CHART_COLORS[2],
    },
    {
      id: 'w-8',
      title: '1:1 with Priya',
      start: at(addDays(w, 5), 16, 0),
      end: at(addDays(w, 5), 16, 45),
      color: CHART_COLORS[3],
    },
  ]
}

function buildDayEvents(refDate: Date): CalendarEvent[] {
  return [
    {
      id: 'd-1',
      title: 'Morning planning',
      start: at(refDate, 8, 30),
      end: at(refDate, 9, 0),
      color: CHART_COLORS[0],
    },
    {
      id: 'd-2',
      title: 'Standup',
      start: at(refDate, 9, 30),
      end: at(refDate, 10, 0),
      color: CHART_COLORS[1],
    },
    {
      id: 'd-3',
      title: 'Deep work: EventCalendar',
      start: at(refDate, 10, 30),
      end: at(refDate, 13, 0),
      color: CHART_COLORS[2],
    },
    {
      id: 'd-4',
      title: 'Lunch',
      start: at(refDate, 13, 0),
      end: at(refDate, 14, 0),
      color: CHART_COLORS[3],
    },
    {
      id: 'd-5',
      title: 'Design review',
      start: at(refDate, 15, 0),
      end: at(refDate, 16, 30),
      color: CHART_COLORS[4],
    },
  ]
}

// ── Stories ──────────────────────────────────────────────────────

export const MonthView: Story = {
  render: () => {
    const today = useMemo(() => new Date(), [])
    const [view, setView] = useState<EventCalendarView>('month')
    const events = useMemo(() => buildMonthEvents(today), [today])
    return (
      <EventCalendar
        events={events}
        view={view}
        onViewChange={setView}
        defaultDate={today}
      />
    )
  },
}

export const WeekView: Story = {
  render: () => {
    const today = useMemo(() => new Date(), [])
    const [view, setView] = useState<EventCalendarView>('week')
    const events = useMemo(() => buildWeekEvents(today), [today])
    return (
      <EventCalendar
        events={events}
        view={view}
        onViewChange={setView}
        defaultDate={today}
      />
    )
  },
}

export const DayView: Story = {
  render: () => {
    const today = useMemo(() => new Date(), [])
    const [view, setView] = useState<EventCalendarView>('day')
    const events = useMemo(() => buildDayEvents(today), [today])
    return (
      <EventCalendar
        events={events}
        view={view}
        onViewChange={setView}
        defaultDate={today}
      />
    )
  },
}

export const ReadOnly: Story = {
  render: () => {
    const today = useMemo(() => new Date(), [])
    const [view, setView] = useState<EventCalendarView>('month')
    const events = useMemo(() => buildMonthEvents(today), [today])
    return (
      <div className="flex flex-col gap-3">
        <p className="text-xs text-muted-foreground">
          Read-only: no <code>onEventCreate</code> / <code>onEventResize</code>.
          Events are clickable; empty cells navigate to that day.
        </p>
        <EventCalendar
          events={events}
          view={view}
          onViewChange={setView}
          defaultDate={today}
          onEventClick={(ev) => console.log('click', ev)}
        />
      </div>
    )
  },
}

export const WithCallbacks: Story = {
  render: () => {
    const today = useMemo(() => new Date(), [])
    const [view, setView] = useState<EventCalendarView>('week')
    const [events, setEvents] = useState<CalendarEvent[]>(() =>
      buildWeekEvents(today)
    )
    const [log, setLog] = useState<string[]>([])
    const append = (line: string) =>
      setLog((prev) => [line, ...prev].slice(0, 6))

    return (
      <div className="flex flex-col gap-3">
        <EventCalendar
          events={events}
          view={view}
          onViewChange={(v) => {
            setView(v)
            append(`view → ${v}`)
          }}
          defaultDate={today}
          onEventClick={(ev) => append(`click: ${ev.title}`)}
          onEventCreate={(range) => {
            append(
              `create: ${range.start.toLocaleString()} → ${range.end.toLocaleString()}`
            )
            setEvents((prev) => [
              ...prev,
              {
                id: `new-${prev.length}`,
                title: 'New event',
                start: range.start,
                end: range.end,
                color: CHART_COLORS[prev.length % CHART_COLORS.length],
              },
            ])
          }}
          onEventResize={(id, newEnd) => {
            append(`resize: ${id} → ${newEnd.toLocaleTimeString()}`)
            setEvents((prev) =>
              prev.map((ev) => (ev.id === id ? { ...ev, end: newEnd } : ev))
            )
          }}
        />
        <div className="rounded-md border border-border bg-card p-3">
          <div className="mb-1 text-xs font-medium text-muted-foreground">
            Event log
          </div>
          <ul className="flex flex-col gap-0.5 font-mono text-xs">
            {log.length === 0 && (
              <li className="text-muted-foreground">
                Click an empty hour to create. Hover an event and drag the
                bottom edge to resize.
              </li>
            )}
            {log.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  },
}
