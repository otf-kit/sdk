import type { Meta, StoryObj } from '@storybook/react'
import { MetricCard } from './MetricCard'

// TODO: add all variants
const meta: Meta<typeof MetricCard> = {
  title: 'Blocks/MetricCard',
  component: MetricCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MetricCard>

export const Default: Story = {}
