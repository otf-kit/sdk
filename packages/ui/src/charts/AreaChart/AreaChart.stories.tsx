import type { Meta, StoryObj } from '@storybook/react'
import { AreaChart } from './AreaChart'

// TODO: add all variants
const meta: Meta<typeof AreaChart> = {
  title: 'Charts/AreaChart',
  component: AreaChart,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AreaChart>

export const Default: Story = {}
