import type { Meta, StoryObj } from '@storybook/react'
import { SwipeCards } from './SwipeCards'

// TODO: add all variants
const meta: Meta<typeof SwipeCards> = {
  title: 'Patterns/SwipeCards',
  component: SwipeCards,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SwipeCards>

export const Default: Story = {}
