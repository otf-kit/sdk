import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
  AreaChart, BarChart, LineChart, Sparkline, Heatmap, BarList, ActivityHeatmap,
  Beacon, Tour, TourStep, useTour,
  Button,
} from '@otf/ui'

const MONTHLY_DATA = [
  { month: 'Jan', revenue: 4200, users: 240, churn: 12 },
  { month: 'Feb', revenue: 5800, users: 310, churn: 18 },
  { month: 'Mar', revenue: 5200, users: 290, churn: 9 },
  { month: 'Apr', revenue: 7100, users: 420, churn: 15 },
  { month: 'May', revenue: 8400, users: 510, churn: 22 },
  { month: 'Jun', revenue: 7600, users: 480, churn: 19 },
  { month: 'Jul', revenue: 9200, users: 580, churn: 28 },
  { month: 'Aug', revenue: 10400, users: 640, churn: 24 },
]

const CATEGORY_DATA = [
  { category: 'Design', q1: 42, q2: 58, q3: 37 },
  { category: 'Engineering', q1: 78, q2: 92, q3: 85 },
  { category: 'Marketing', q1: 35, q2: 41, q3: 53 },
  { category: 'Sales', q1: 61, q2: 74, q3: 68 },
  { category: 'Support', q1: 29, q2: 35, q3: 42 },
]

const SPARK_DATA = [12, 18, 14, 22, 19, 28, 24, 32, 27, 38, 34, 45]

const meta: Meta<typeof AreaChart> = {
  title: 'Charts/AreaChart',
  component: AreaChart,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: '100%', maxWidth: 800 }}><Story /></div>],
}
export default meta
type AreaStory = StoryObj<typeof AreaChart>

export const SingleKey: AreaStory = {
  args: { data: MONTHLY_DATA, dataKey: 'revenue', xAxisKey: 'month', height: 280 },
}
export const MultiKey: AreaStory = {
  args: { data: MONTHLY_DATA, dataKey: ['revenue', 'users'], xAxisKey: 'month', height: 280, showLegend: true },
}
export const Stepped: AreaStory = {
  args: { data: MONTHLY_DATA, dataKey: 'churn', xAxisKey: 'month', height: 240, curved: false, showGrid: false },
}

export const BarBasic: StoryObj<typeof BarChart> = {
  name: 'Bar / Basic',
  render: () => <BarChart data={MONTHLY_DATA} dataKey="revenue" xAxisKey="month" height={280} />,
}
export const BarGrouped: StoryObj<typeof BarChart> = {
  name: 'Bar / Grouped',
  render: () => <BarChart data={CATEGORY_DATA} dataKey={['q1', 'q2', 'q3']} xAxisKey="category" height={280} showLegend />,
}
export const BarStacked: StoryObj<typeof BarChart> = {
  name: 'Bar / Stacked',
  render: () => <BarChart data={CATEGORY_DATA} dataKey={['q1', 'q2', 'q3']} xAxisKey="category" height={280} stacked showLegend />,
}
export const BarVertical: StoryObj<typeof BarChart> = {
  name: 'Bar / Vertical layout',
  render: () => <BarChart data={CATEGORY_DATA} dataKey="q1" xAxisKey="category" height={280} layout="vertical" />,
}

export const LineBasic: StoryObj<typeof LineChart> = {
  name: 'Line / Basic',
  render: () => <LineChart data={MONTHLY_DATA} dataKey="revenue" xAxisKey="month" height={280} />,
}
export const LineDotted: StoryObj<typeof LineChart> = {
  name: 'Line / Dotted',
  render: () => <LineChart data={MONTHLY_DATA} dataKey={['revenue', 'users']} xAxisKey="month" height={280} dotted showLegend />,
}

export const SparklineLine: StoryObj<typeof Sparkline> = {
  name: 'Sparkline / Line',
  render: () => (
    <div className="flex items-center gap-4 p-4">
      <span className="text-sm font-medium">Revenue</span>
      <Sparkline data={SPARK_DATA} type="line" width={120} height={36} />
    </div>
  ),
}
export const SparklineArea: StoryObj<typeof Sparkline> = {
  name: 'Sparkline / Area',
  render: () => (
    <div className="flex items-center gap-4 p-4">
      <span className="text-sm font-medium">Users</span>
      <Sparkline data={SPARK_DATA} type="area" color="hsl(142 71% 45%)" width={120} height={36} />
    </div>
  ),
}
export const SparklineInTable: StoryObj<typeof Sparkline> = {
  name: 'Sparkline / In table',
  render: () => (
    <table className="w-full text-sm">
      <thead><tr className="border-b">{['Metric', 'Trend', 'Current'].map(h => <th key={h} className="text-left py-2 px-3 font-medium">{h}</th>)}</tr></thead>
      <tbody>
        {[{ label: 'Revenue', data: SPARK_DATA, val: '$10.4K', color: 'hsl(var(--primary))' },
          { label: 'Users', data: [8,12,9,15,11,18,14,22,19,24,20,28], val: '640', color: 'hsl(142 71% 45%)' }
        ].map(r => (
          <tr key={r.label} className="border-b last:border-0">
            <td className="py-2 px-3">{r.label}</td>
            <td className="py-2 px-3"><Sparkline data={r.data} type="area" color={r.color} width={80} height={28} /></td>
            <td className="py-2 px-3 font-semibold">{r.val}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}

export const BeaconStandalone: StoryObj<typeof Beacon> = {
  name: 'Beacon / Standalone',
  render: () => (
    <div className="flex items-center gap-4 p-4">
      {(['primary', 'success', 'warning', 'error'] as const).map(c => (
        <div key={c} className="flex flex-col items-center gap-2">
          <Beacon color={c} />
          <span className="text-xs capitalize">{c}</span>
        </div>
      ))}
    </div>
  ),
}
export const BeaconWrapped: StoryObj<typeof Beacon> = {
  name: 'Beacon / Wrapped',
  render: () => (
    <div className="flex items-center gap-6 p-4">
      <Beacon color="primary"><Button>New feature</Button></Beacon>
      <Beacon color="warning" size="lg"><Button variant="outline">Notifications</Button></Beacon>
    </div>
  ),
}

function TourDemo() {
  const { start, isActive } = useTour()
  return (
    <div className="p-8 space-y-6">
      <div className="flex gap-3">
        <Button onClick={start} disabled={isActive}>Start Tour</Button>
        <span className="text-sm text-[hsl(var(--muted-foreground))] self-center">Click to begin the guided tour</span>
      </div>
      <div className="flex gap-4">
        <TourStep step={0} title="Welcome!" description="This is the main dashboard." placement="bottom">
          <div className="p-4 rounded border bg-card cursor-default">Dashboard KPIs</div>
        </TourStep>
        <TourStep step={1} title="Analytics" description="Dive deeper into trends." placement="bottom">
          <div className="p-4 rounded border bg-card cursor-default">Analytics Panel</div>
        </TourStep>
        <TourStep step={2} title="Team" description="Manage team members." placement="bottom">
          <div className="p-4 rounded border bg-card cursor-default">Team Settings</div>
        </TourStep>
      </div>
    </div>
  )
}

export const TourStory: StoryObj = {
  name: 'Tour / Guided tour',
  render: () => (<Tour totalSteps={3}><TourDemo /></Tour>),
}

const HEATMAP_DATA = (() => {
  const out: { date: string; value: number }[] = []
  let seed = 42
  const rng = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const today = new Date('2026-04-29')
  const start = new Date(today); start.setDate(start.getDate() - 365)
  const cursor = new Date(start)
  while (cursor <= today) {
    const dow = cursor.getDay()
    const isWeekend = dow === 0 || dow === 6
    out.push({
      date: `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(cursor.getDate()).padStart(2, '0')}`,
      value: Math.max(0, Math.round(rng() * (isWeekend ? 6 : 22))),
    })
    cursor.setDate(cursor.getDate() + 1)
  }
  return out
})()

export const HeatmapBasic: StoryObj<typeof Heatmap> = {
  name: 'Heatmap / Basic',
  render: () => (
    <div className="p-4">
      <Heatmap
        data={HEATMAP_DATA}
        endDate={new Date('2026-04-29')}
        weeks={53}
        cellSize={11}
        gap={3}
      />
    </div>
  ),
}

export const HeatmapPrimaryRamp: StoryObj<typeof Heatmap> = {
  name: 'Heatmap / Primary opacity ramp',
  render: () => (
    <div className="p-4">
      <Heatmap
        data={HEATMAP_DATA}
        endDate={new Date('2026-04-29')}
        weeks={53}
        cellSize={11}
        gap={3}
        colorScale={[
          'hsl(var(--muted))',
          'hsl(var(--primary) / 0.25)',
          'hsl(var(--primary) / 0.5)',
          'hsl(var(--primary) / 0.75)',
          'hsl(var(--primary))',
        ]}
        formatTooltip={(d) => `${d.value} events on ${d.date}`}
      />
    </div>
  ),
}

const BARLIST_DATA = [
  { label: 'web-app',       value: 84, color: 'hsl(var(--chart-1) / 0.35)' },
  { label: 'api-gateway',   value: 47, color: 'hsl(var(--chart-2) / 0.35)' },
  { label: 'mobile-client', value: 29, color: 'hsl(var(--chart-3) / 0.35)' },
  { label: 'data-pipeline', value: 18, color: 'hsl(var(--chart-4) / 0.35)' },
  { label: 'docs',          value: 7,  color: 'hsl(var(--chart-5) / 0.35)' },
]

export const BarListBasic: StoryObj<typeof BarList> = {
  name: 'BarList / Basic',
  render: () => (
    <div className="p-4 max-w-md">
      <BarList data={BARLIST_DATA} />
    </div>
  ),
}

export const BarListWithLinks: StoryObj<typeof BarList> = {
  name: 'BarList / Linked rows',
  render: () => (
    <div className="p-4 max-w-md">
      <BarList data={BARLIST_DATA.map(r => ({ ...r, href: `https://github.com/example/${r.label}` }))} />
    </div>
  ),
}

export const ActivityHeatmapBasic: StoryObj<typeof ActivityHeatmap> = {
  name: 'ActivityHeatmap / Basic',
  render: () => (
    <div className="p-4 max-w-5xl">
      <ActivityHeatmap
        caption="Activity"
        total={1_847_392}
        data={HEATMAP_DATA}
        endDate={new Date('2026-04-29')}
        stats={[
          { label: 'Most Active Month', value: 'March' },
          { label: 'Most Active Day',   value: 'Mar 18, 2026' },
          { label: 'Longest Streak',    value: '64d' },
          { label: 'Current Streak',    value: '21d' },
        ]}
      />
    </div>
  ),
}

export const ActivityHeatmapWithFilters: StoryObj<typeof ActivityHeatmap> = {
  name: 'ActivityHeatmap / With filters',
  render: function ActivityHeatmapFiltered() {
    const [filter, setFilter] = React.useState('all')
    return (
      <div className="p-4 max-w-5xl">
        <ActivityHeatmap
          caption="Activity"
          total={1_847_392}
          data={HEATMAP_DATA}
          endDate={new Date('2026-04-29')}
          filters={[
            { value: 'all', label: 'All' },
            { value: 'web', label: 'Web' },
            { value: 'api', label: 'API' },
          ]}
          filterValue={filter}
          onFilterChange={setFilter}
          stats={[
            { label: 'Most Active Month', value: 'March' },
            { label: 'Most Active Day',   value: 'Mar 18, 2026' },
            { label: 'Longest Streak',    value: '64d' },
            { label: 'Current Streak',    value: '21d' },
          ]}
        />
      </div>
    )
  },
}
