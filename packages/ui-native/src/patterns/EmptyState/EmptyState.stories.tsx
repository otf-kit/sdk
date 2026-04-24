import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState } from './EmptyState'

// TODO: add all variants
const meta: Meta<typeof EmptyState> = {
  title: 'Patterns/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {}
