import type { Meta, StoryObj } from '@storybook/react'
import { PullToRefresh } from './PullToRefresh'

// TODO: add all variants
const meta: Meta<typeof PullToRefresh> = {
  title: 'Patterns/PullToRefresh',
  component: PullToRefresh,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PullToRefresh>

export const Default: Story = {}
