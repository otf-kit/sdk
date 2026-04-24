import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Trash2, Download, Archive } from 'lucide-react'
import {
  Filters,
  BulkActions,
  ToggleButton, ToggleButtonGroup,
  CommandBar, CommandBarGroup, CommandBarItem, useCommandBar,
  Kanban,
} from '@otf/ui'
import type { FilterDef, FilterValue, KanbanColumnDef } from '@otf/ui'

const meta: Meta = { title: 'Advanced', tags: ['autodocs'] }
export default meta

const filterDefs: FilterDef[] = [
  { key: 'status', label: 'Status', type: 'select', options: [{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }] },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'amount', label: 'Amount', type: 'number' },
]

function FiltersDemo() {
  const [filters, setFilters] = React.useState<FilterValue[]>([{ key: 'status', operator: 'equals', value: 'active' }])
  return <Filters filters={filterDefs} value={filters} onChange={setFilters} />
}
export const FiltersStory: StoryObj = { name: 'Filters', render: () => <FiltersDemo /> }

function BulkActionsDemo() {
  const [count, setCount] = React.useState(3)
  return (
    <div className="relative h-24 flex items-center justify-center">
      <button className="text-sm underline" onClick={() => setCount((c) => (c === 0 ? 3 : 0))}>Toggle selection ({count} selected)</button>
      <BulkActions
        count={count}
        onClear={() => setCount(0)}
        actions={[
          { label: 'Archive', icon: <Archive className="h-3.5 w-3.5" />, onClick: () => {} },
          { label: 'Download', icon: <Download className="h-3.5 w-3.5" />, onClick: () => {} },
          { label: 'Delete', icon: <Trash2 className="h-3.5 w-3.5" />, onClick: () => {}, variant: 'destructive' },
        ]}
      />
    </div>
  )
}
export const BulkActionsStory: StoryObj = { name: 'BulkActions', render: () => <BulkActionsDemo /> }

function ToggleButtonDemo() {
  const [single, setSingle] = React.useState('grid')
  const [multi, setMulti] = React.useState<string[]>(['bold'])
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">Single select</p>
        <ToggleButtonGroup value={single} onChange={setSingle}>
          <ToggleButton value="grid">Grid</ToggleButton>
          <ToggleButton value="list">List</ToggleButton>
          <ToggleButton value="kanban">Kanban</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">Multiple select</p>
        <ToggleButtonGroup type="multiple" value={multi} onChange={setMulti}>
          <ToggleButton value="bold"><strong>B</strong></ToggleButton>
          <ToggleButton value="italic"><em>I</em></ToggleButton>
          <ToggleButton value="underline"><u>U</u></ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  )
}
export const ToggleButtonStory: StoryObj = { name: 'ToggleButton', render: () => <ToggleButtonDemo /> }

function CommandBarDemo() {
  const { open, setOpen } = useCommandBar()
  return (
    <div className="space-y-3">
      <button className="text-sm underline" onClick={() => setOpen(true)}>Open Command Bar (⌘K)</button>
      <CommandBar open={open} onOpenChange={setOpen}>
        <CommandBarGroup heading="Navigation">
          <CommandBarItem label="Go to Dashboard" shortcut="G D" onSelect={() => setOpen(false)} />
          <CommandBarItem label="Go to Projects" shortcut="G P" onSelect={() => setOpen(false)} />
        </CommandBarGroup>
        <CommandBarGroup heading="Actions">
          <CommandBarItem label="New Project" shortcut="⌘N" onSelect={() => setOpen(false)} />
          <CommandBarItem label="Invite Team Member" onSelect={() => setOpen(false)} />
        </CommandBarGroup>
      </CommandBar>
    </div>
  )
}
export const CommandBarStory: StoryObj = { name: 'CommandBar', render: () => <CommandBarDemo /> }

const kanbanCols: KanbanColumnDef[] = [
  { id: 'todo', title: 'To Do', cards: [{ id: 'c1', title: 'Design login page', description: 'Wireframes + hi-fi', badge: 'UI' }, { id: 'c2', title: 'Write API docs', badge: 'Docs' }] },
  { id: 'progress', title: 'In Progress', cards: [{ id: 'c3', title: 'Implement auth flow', description: 'OAuth + JWT tokens', badge: 'Backend' }] },
  { id: 'review', title: 'In Review', cards: [{ id: 'c4', title: 'Payment integration', description: 'Stripe webhooks' }] },
  { id: 'done', title: 'Done', cards: [{ id: 'c5', title: 'Set up CI/CD', badge: 'DevOps' }, { id: 'c6', title: 'Database schema', description: 'PostgreSQL migrations' }] },
]

export const KanbanStory: StoryObj = {
  name: 'Kanban',
  render: () => <Kanban columns={kanbanCols} onMoveCard={(id, from, to) => console.log(`Moved ${id} from ${from} to ${to}`)} />,
}
