import type { Meta, StoryObj } from '@storybook/react'
import { BarChart } from './BarChart'

// TODO: add all variants
const meta: Meta<typeof BarChart> = {
  title: 'Charts/BarChart',
  component: BarChart,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BarChart>

export const Default: Story = {}
