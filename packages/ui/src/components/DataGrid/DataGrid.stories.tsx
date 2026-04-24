import type { Meta, StoryObj } from '@storybook/react'
import { DataGrid } from './DataGrid'

// TODO: add all variants
const meta: Meta<typeof DataGrid> = {
  title: 'Components/DataGrid',
  component: DataGrid,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DataGrid>

export const Default: Story = {}
