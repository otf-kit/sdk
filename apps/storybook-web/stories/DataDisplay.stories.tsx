import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import type { ColumnDef } from '@tanstack/react-table'
import { Package, User, BarChart2, Star } from 'lucide-react'
import {
  DataTable, DataTableColumnHeader,
  EmptyState,
  PropertyList, PropertyItem,
  Timeline, TimelineItem,
  Stat, StatGroup,
  Persona,
  IconBadge,
  StructuredList, StructuredListSection, StructuredListItem,
} from '@otfdashkit/ui'
import { CommandItem } from '@otfdashkit/ui/command-item'

const meta: Meta = { title: 'Data Display', tags: ['autodocs'] }
export default meta

type Row = { id: number; name: string; status: string; amount: number }
const tableData: Row[] = [
  { id: 1, name: 'Alice Johnson', status: 'Active', amount: 1200 },
  { id: 2, name: 'Bob Smith', status: 'Inactive', amount: 800 },
  { id: 3, name: 'Carol White', status: 'Active', amount: 3400 },
  { id: 4, name: 'David Lee', status: 'Pending', amount: 560 },
  { id: 5, name: 'Eve Davis', status: 'Active', amount: 2100 },
]
const tableColumns: ColumnDef<Row>[] = [
  { accessorKey: 'id', header: ({ column }) => <DataTableColumnHeader column={column} title="ID" /> },
  { accessorKey: 'name', header: ({ column }) => <DataTableColumnHeader column={column} title="Name" /> },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'amount', header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />, cell: ({ getValue }) => `$${(getValue() as number).toLocaleString()}` },
]

export const DataTableStory: StoryObj = {
  name: 'DataTable',
  render: () => <DataTable columns={tableColumns} data={tableData} searchable searchColumn="name" pageSize={3} />,
}
export const DataTableLoading: StoryObj = {
  name: 'DataTable Loading',
  render: () => <DataTable columns={tableColumns} data={[]} loading />,
}

export const EmptyStateStory: StoryObj = {
  name: 'EmptyState',
  render: () => (
    <EmptyState
      icon={<Package className="h-6 w-6" />}
      title="No projects yet"
      description="Create your first project to get started."
      action={{ label: 'New Project', onClick: () => {} }}
    />
  ),
}

export const PropertyListStory: StoryObj = {
  name: 'PropertyList',
  render: () => (
    <div className="max-w-sm">
      <PropertyList>
        <PropertyItem label="Name" value="Alice Johnson" />
        <PropertyItem label="Email" value="alice@example.com" />
        <PropertyItem label="Role" value="Admin" />
        <PropertyItem label="Notes" value="Long description here" orientation="vertical" />
      </PropertyList>
    </div>
  ),
}

export const TimelineStory: StoryObj = {
  name: 'Timeline',
  render: () => (
    <div className="max-w-sm">
      <Timeline>
        <TimelineItem title="Order placed" description="Your order has been received" timestamp="2h ago" variant="success" />
        <TimelineItem title="Processing" description="Payment verified" timestamp="1h ago" variant="default" />
        <TimelineItem title="Shipped" description="Package on its way" timestamp="30m ago" variant="warning" />
        <TimelineItem title="Delivered" description="Arrived at destination" timestamp="5m ago" variant="error" />
      </Timeline>
    </div>
  ),
}

export const StatStory: StoryObj = {
  name: 'Stat',
  render: () => (
    <StatGroup className="max-w-2xl">
      <Stat label="Total Revenue" value="$48,295" trend={12.5} trendLabel="vs last month" icon={<BarChart2 className="h-5 w-5" />} />
      <Stat label="Active Users" value="2,340" trend={-3.2} trendLabel="vs last week" icon={<User className="h-5 w-5" />} />
      <Stat label="Avg Rating" value="4.8" trend={0.3} trendLabel="this quarter" icon={<Star className="h-5 w-5" />} />
    </StatGroup>
  ),
}

export const PersonaStory: StoryObj = {
  name: 'Persona',
  render: () => (
    <div className="space-y-4">
      <Persona name="Alice Johnson" subtitle="alice@example.com" size="sm" />
      <Persona name="Bob Smith" subtitle="Engineering Lead" size="md" />
      <Persona name="Carol White" subtitle="carol@company.com" size="lg" src="https://github.com/shadcn.png" />
    </div>
  ),
}

export const IconBadgeStory: StoryObj = {
  name: 'IconBadge',
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      {(['default', 'primary', 'success', 'warning', 'error', 'purple'] as const).map((c) => (
        <div key={c} className="flex flex-col items-center gap-1">
          <IconBadge icon={<Star className="h-5 w-5" />} color={c} />
          <span className="text-xs text-[hsl(var(--muted-foreground))]">{c}</span>
        </div>
      ))}
    </div>
  ),
}

export const StructuredListStory: StoryObj = {
  name: 'StructuredList',
  render: () => (
    <StructuredList className="max-w-sm">
      <StructuredListSection title="Account">
        <StructuredListItem left={<User className="h-4 w-4" />} title="Profile" description="Your personal information" right={<span className="text-xs">›</span>} onClick={() => {}} />
        <StructuredListItem title="Notifications" right={<span className="text-xs">›</span>} onClick={() => {}} />
      </StructuredListSection>
      <StructuredListSection title="Preferences">
        <StructuredListItem title="Appearance" right={<span className="text-xs text-[hsl(var(--muted-foreground))]">System</span>} />
        <StructuredListItem title="Language" right={<span className="text-xs text-[hsl(var(--muted-foreground))]">English</span>} />
      </StructuredListSection>
    </StructuredList>
  ),
}

export const CommandItemStory: StoryObj = {
  name: 'CommandItem',
  render: () => (
    <div className="max-w-sm space-y-0.5">
      <CommandItem icon={<Package className="h-4 w-4" />} label="New Project" shortcut="⌘N" onClick={() => {}} />
      <CommandItem icon={<User className="h-4 w-4" />} label="Manage Team" description="Invite and manage members" onClick={() => {}} />
      <CommandItem icon={<Star className="h-4 w-4" />} label="Starred Items" active onClick={() => {}} />
    </div>
  ),
}
