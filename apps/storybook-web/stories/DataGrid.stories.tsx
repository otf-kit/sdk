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
  args: { columns, data: makeUsers(20) },
  decorators: [(Story) => <div className="p-6"><Story /></div>],
} satisfies Meta<typeof DataGrid<User>>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
