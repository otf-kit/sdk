import type { Meta, StoryObj } from '@storybook/react'
import { useMemo, useState } from 'react'
import { Gantt, type GanttItem } from '@otf/ui'

const meta: Meta<typeof Gantt> = {
  title: 'Advanced/Gantt',
  component: Gantt,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Gantt>

// ── Helpers ──────────────────────────────────────────────────────

const CHART_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
] as const

function addDaysLocal(d: Date, days: number): Date {
  const next = new Date(d)
  next.setDate(next.getDate() + days)
  next.setHours(0, 0, 0, 0)
  return next
}

function addMonthsLocal(d: Date, months: number): Date {
  const next = new Date(d)
  next.setMonth(next.getMonth() + months)
  next.setHours(0, 0, 0, 0)
  return next
}

// Anchor: today, normalized.
function today(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

// ── Default: 8 items across ~30 days, drag/resize enabled ───────

const defaultBaseItems: GanttItem[] = (() => {
  const t = today()
  const start = addDaysLocal(t, -3)
  return [
    {
      id: 't1',
      title: 'Kickoff & discovery',
      start: addDaysLocal(start, 0),
      end: addDaysLocal(start, 3),
      progress: 100,
      color: CHART_COLORS[0],
    },
    {
      id: 't2',
      title: 'User research interviews',
      start: addDaysLocal(start, 2),
      end: addDaysLocal(start, 7),
      progress: 80,
      color: CHART_COLORS[1],
    },
    {
      id: 't3',
      title: 'Wireframes',
      start: addDaysLocal(start, 6),
      end: addDaysLocal(start, 11),
      progress: 60,
      color: CHART_COLORS[2],
    },
    {
      id: 't4',
      title: 'Visual design pass',
      start: addDaysLocal(start, 10),
      end: addDaysLocal(start, 16),
      progress: 30,
      color: CHART_COLORS[3],
    },
    {
      id: 't5',
      title: 'Backend scaffolding',
      start: addDaysLocal(start, 5),
      end: addDaysLocal(start, 14),
      progress: 50,
      color: CHART_COLORS[4],
    },
    {
      id: 't6',
      title: 'Frontend integration',
      start: addDaysLocal(start, 14),
      end: addDaysLocal(start, 22),
      progress: 10,
      color: CHART_COLORS[0],
    },
    {
      id: 't7',
      title: 'QA + bugfix sprint',
      start: addDaysLocal(start, 21),
      end: addDaysLocal(start, 27),
      progress: 0,
      color: CHART_COLORS[1],
    },
    {
      id: 't8',
      title: 'Launch readiness',
      start: addDaysLocal(start, 26),
      end: addDaysLocal(start, 30),
      progress: 0,
      color: CHART_COLORS[2],
    },
  ]
})()

export const Default: Story = {
  render: () => {
    const t = today()
    const [items, setItems] = useState<GanttItem[]>(defaultBaseItems)
    return (
      <Gantt
        items={items}
        scale="days"
        startDate={addDaysLocal(t, -7)}
        endDate={addDaysLocal(t, 35)}
        onItemMove={(id, newStart, newEnd) =>
          setItems((prev) =>
            prev.map((i) =>
              i.id === id ? { ...i, start: newStart, end: newEnd } : i
            )
          )
        }
        onItemResize={(id, newEnd) =>
          setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, end: newEnd } : i))
          )
        }
        onItemClick={(item) => console.log('clicked', item.id)}
      />
    )
  },
}

// ── Grouped: 12 items, 3 groups ─────────────────────────────────

const groupedItems: GanttItem[] = (() => {
  const t = today()
  const start = addDaysLocal(t, -2)
  const make = (
    id: string,
    title: string,
    group: string,
    offset: number,
    span: number,
    progress: number,
    color: string
  ): GanttItem => ({
    id,
    title,
    group,
    start: addDaysLocal(start, offset),
    end: addDaysLocal(start, offset + span),
    progress,
    color,
  })
  return [
    // Design
    make('d1', 'Brand audit', 'Design', 0, 3, 100, CHART_COLORS[0]),
    make('d2', 'Wireframes', 'Design', 2, 4, 80, CHART_COLORS[0]),
    make('d3', 'High-fi mocks', 'Design', 5, 5, 50, CHART_COLORS[0]),
    make('d4', 'Design review', 'Design', 9, 2, 0, CHART_COLORS[0]),
    // Engineering
    make('e1', 'API contracts', 'Engineering', 1, 3, 90, CHART_COLORS[1]),
    make('e2', 'Auth service', 'Engineering', 3, 5, 70, CHART_COLORS[1]),
    make('e3', 'UI library setup', 'Engineering', 4, 4, 60, CHART_COLORS[1]),
    make('e4', 'Feature build', 'Engineering', 8, 7, 20, CHART_COLORS[1]),
    // QA
    make('q1', 'Test plan', 'QA', 6, 2, 100, CHART_COLORS[2]),
    make('q2', 'Regression suite', 'QA', 10, 4, 30, CHART_COLORS[2]),
    make('q3', 'E2E coverage', 'QA', 12, 5, 10, CHART_COLORS[2]),
    make('q4', 'Bug bash', 'QA', 16, 3, 0, CHART_COLORS[2]),
  ]
})()

export const Grouped: Story = {
  render: () => {
    const t = today()
    const [items, setItems] = useState<GanttItem[]>(groupedItems)
    return (
      <Gantt
        items={items}
        scale="days"
        startDate={addDaysLocal(t, -4)}
        endDate={addDaysLocal(t, 24)}
        onItemMove={(id, newStart, newEnd) =>
          setItems((prev) =>
            prev.map((i) =>
              i.id === id ? { ...i, start: newStart, end: newEnd } : i
            )
          )
        }
        onItemResize={(id, newEnd) =>
          setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, end: newEnd } : i))
          )
        }
      />
    )
  },
}

// ── WithDependencies: 5-item critical path ──────────────────────

const dependencyItems: GanttItem[] = (() => {
  const t = today()
  const start = addDaysLocal(t, -2)
  return [
    {
      id: 'p1',
      title: 'Spec',
      start: addDaysLocal(start, 0),
      end: addDaysLocal(start, 3),
      progress: 100,
      color: CHART_COLORS[0],
    },
    {
      id: 'p2',
      title: 'Design',
      start: addDaysLocal(start, 3),
      end: addDaysLocal(start, 8),
      progress: 70,
      color: CHART_COLORS[1],
      dependsOn: ['p1'],
    },
    {
      id: 'p3',
      title: 'Build',
      start: addDaysLocal(start, 8),
      end: addDaysLocal(start, 16),
      progress: 30,
      color: CHART_COLORS[2],
      dependsOn: ['p2'],
    },
    {
      id: 'p4',
      title: 'QA',
      start: addDaysLocal(start, 16),
      end: addDaysLocal(start, 20),
      progress: 0,
      color: CHART_COLORS[3],
      dependsOn: ['p3'],
    },
    {
      id: 'p5',
      title: 'Ship',
      start: addDaysLocal(start, 20),
      end: addDaysLocal(start, 22),
      progress: 0,
      color: CHART_COLORS[4],
      dependsOn: ['p4'],
    },
  ]
})()

export const WithDependencies: Story = {
  render: () => {
    const t = today()
    const [items, setItems] = useState<GanttItem[]>(dependencyItems)
    return (
      <Gantt
        items={items}
        scale="days"
        startDate={addDaysLocal(t, -3)}
        endDate={addDaysLocal(t, 24)}
        showDependencies
        onItemMove={(id, newStart, newEnd) =>
          setItems((prev) =>
            prev.map((i) =>
              i.id === id ? { ...i, start: newStart, end: newEnd } : i
            )
          )
        }
        onItemResize={(id, newEnd) =>
          setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, end: newEnd } : i))
          )
        }
      />
    )
  },
}

// ── MonthScale: 8 items across 6 months ─────────────────────────

const monthScaleItems: GanttItem[] = (() => {
  const t = today()
  const start = addMonthsLocal(t, -1)
  return [
    {
      id: 'm1',
      title: 'Q1 planning',
      start: addMonthsLocal(start, 0),
      end: addMonthsLocal(start, 1),
      progress: 100,
      color: CHART_COLORS[0],
    },
    {
      id: 'm2',
      title: 'Platform migration',
      start: addMonthsLocal(start, 0),
      end: addMonthsLocal(start, 3),
      progress: 65,
      color: CHART_COLORS[1],
    },
    {
      id: 'm3',
      title: 'Onboarding revamp',
      start: addMonthsLocal(start, 1),
      end: addMonthsLocal(start, 3),
      progress: 40,
      color: CHART_COLORS[2],
    },
    {
      id: 'm4',
      title: 'Mobile beta',
      start: addMonthsLocal(start, 2),
      end: addMonthsLocal(start, 4),
      progress: 20,
      color: CHART_COLORS[3],
    },
    {
      id: 'm5',
      title: 'Pricing experiments',
      start: addMonthsLocal(start, 2),
      end: addMonthsLocal(start, 5),
      progress: 10,
      color: CHART_COLORS[4],
    },
    {
      id: 'm6',
      title: 'Enterprise tier',
      start: addMonthsLocal(start, 3),
      end: addMonthsLocal(start, 5),
      progress: 0,
      color: CHART_COLORS[0],
    },
    {
      id: 'm7',
      title: 'Public launch',
      start: addMonthsLocal(start, 4),
      end: addMonthsLocal(start, 5),
      progress: 0,
      color: CHART_COLORS[1],
    },
    {
      id: 'm8',
      title: 'Partner integrations',
      start: addMonthsLocal(start, 1),
      end: addMonthsLocal(start, 4),
      progress: 35,
      color: CHART_COLORS[2],
    },
  ]
})()

export const MonthScale: Story = {
  render: () => {
    const t = today()
    const [items, setItems] = useState<GanttItem[]>(monthScaleItems)
    return (
      <Gantt
        items={items}
        scale="months"
        startDate={addMonthsLocal(t, -1)}
        endDate={addMonthsLocal(t, 5)}
        onItemMove={(id, newStart, newEnd) =>
          setItems((prev) =>
            prev.map((i) =>
              i.id === id ? { ...i, start: newStart, end: newEnd } : i
            )
          )
        }
        onItemResize={(id, newEnd) =>
          setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, end: newEnd } : i))
          )
        }
      />
    )
  },
}

// ── ReadOnly: visualization only ────────────────────────────────

const readOnlyItems: GanttItem[] = (() => {
  const t = today()
  const start = addDaysLocal(t, -5)
  return [
    {
      id: 'r1',
      title: 'Research',
      start: addDaysLocal(start, 0),
      end: addDaysLocal(start, 4),
      progress: 100,
      color: CHART_COLORS[0],
    },
    {
      id: 'r2',
      title: 'Concept',
      start: addDaysLocal(start, 3),
      end: addDaysLocal(start, 8),
      progress: 100,
      color: CHART_COLORS[1],
      dependsOn: ['r1'],
    },
    {
      id: 'r3',
      title: 'Prototype',
      start: addDaysLocal(start, 7),
      end: addDaysLocal(start, 13),
      progress: 60,
      color: CHART_COLORS[2],
      dependsOn: ['r2'],
    },
    {
      id: 'r4',
      title: 'User test',
      start: addDaysLocal(start, 12),
      end: addDaysLocal(start, 16),
      progress: 25,
      color: CHART_COLORS[3],
      dependsOn: ['r3'],
    },
    {
      id: 'r5',
      title: 'Iterate',
      start: addDaysLocal(start, 15),
      end: addDaysLocal(start, 20),
      progress: 0,
      color: CHART_COLORS[4],
      dependsOn: ['r4'],
    },
    {
      id: 'r6',
      title: 'Final review',
      start: addDaysLocal(start, 19),
      end: addDaysLocal(start, 22),
      progress: 0,
      color: CHART_COLORS[0],
      dependsOn: ['r5'],
    },
  ]
})()

export const ReadOnly: Story = {
  render: () => {
    const items = useMemo(() => readOnlyItems, [])
    const t = today()
    return (
      <Gantt
        items={items}
        scale="days"
        startDate={addDaysLocal(t, -7)}
        endDate={addDaysLocal(t, 22)}
        showDependencies
        showToday
        onItemClick={(item) => console.log('clicked', item.id)}
      />
    )
  },
}
