import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

// TODO: add all variants
const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {}
