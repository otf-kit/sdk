import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from './DataTable'

// TODO: add all variants
const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DataTable>

export const Default: Story = {}
