import type { Meta, StoryObj } from '@storybook/react'
import { Sparkline } from './Sparkline'

// TODO: add all variants
const meta: Meta<typeof Sparkline> = {
  title: 'Charts/Sparkline',
  component: Sparkline,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Sparkline>

export const Default: Story = {}
