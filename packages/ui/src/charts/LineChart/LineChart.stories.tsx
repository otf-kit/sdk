import type { Meta, StoryObj } from '@storybook/react'
import { LineChart } from './LineChart'

// TODO: add all variants
const meta: Meta<typeof LineChart> = {
  title: 'Charts/LineChart',
  component: LineChart,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LineChart>

export const Default: Story = {}
