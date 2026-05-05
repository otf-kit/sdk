import type { Meta, StoryObj } from '@storybook/react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataGrid } from '@otfdashkit/ui'

interface User {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Member' | 'Viewer'
  status: 'Active' | 'Inactive' | 'Pending'
  createdAt: string
}

const columns: ColumnDef<User, unknown>[] = [
  { accessorKey: 'name', header: 'Name', size: 160 },
  { accessorKey: 'email', header: 'Email', size: 220 },
  { accessorKey: 'role', header: 'Role', size: 100 },
  { accessorKey: 'status', header: 'Status', size: 100 },
  { accessorKey: 'createdAt', header: 'Created', size: 120 },
]

function makeUsers(n: number): User[] {
  const roles: User['role'][] = ['Admin', 'Member', 'Viewer']
  const statuses: User['status'][] = ['Active', 'Inactive', 'Pending']
  return Array.from({ length: n }, (_, i) => ({
    id: String(i + 1),
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % 3]!,
    status: statuses[i % 3]!,
    createdAt: new Date(Date.now() - i * 86400000).toLocaleDateString(),
  }))
}

const meta = {
  title: 'Data/DataGrid',
  component: DataGrid<User>,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof DataGrid<User>>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="p-6">
      <DataGrid columns={columns} data={makeUsers(20)} />
    </div>
  ),
}

export const WithSelection: Story = {
  render: () => (
    <div className="p-6">
      <DataGrid
        columns={columns}
        data={makeUsers(20)}
        selectable
        onSelectionChange={(rows) => console.log('selected', rows.length)}
      />
    </div>
  ),
}

export const WithColumnVisibility: Story = {
  render: () => (
    <div className="p-6">
      <DataGrid
        columns={columns}
        data={makeUsers(20)}
        columnVisibility
        selectable
      />
    </div>
  ),
}

export const VirtualScrolling: Story = {
  render: () => (
    <div className="p-6">
      <DataGrid
        columns={columns}
        data={makeUsers(500)}
        virtual
        virtualHeight={500}
        columnVisibility
      />
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <div className="p-6">
      <DataGrid columns={columns} data={[]} loading skeletonRows={8} />
    </div>
  ),
}

export const Empty: Story = {
  render: () => (
    <div className="p-6">
      <DataGrid
        columns={columns}
        data={[]}
        emptyState={
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-medium text-foreground">No users yet</p>
            <p className="text-xs text-muted-foreground">Invite your first team member to get started.</p>
          </div>
        }
      />
    </div>
  ),
}
