import type { Meta, StoryObj } from '@storybook/react'
import { SwipeableRow } from './SwipeableRow'

// TODO: add all variants
const meta: Meta<typeof SwipeableRow> = {
  title: 'Patterns/SwipeableRow',
  component: SwipeableRow,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SwipeableRow>

export const Default: Story = {}
