import type { Meta, StoryObj } from '@storybook/react'
import { Chip } from './Chip'

// TODO: add all variants
const meta: Meta<typeof Chip> = {
  title: 'Patterns/Chip',
  component: Chip,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Chip>

export const Default: Story = {}
