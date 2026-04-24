import type { Meta, StoryObj } from '@storybook/react'
import { EventCard } from './EventCard'

// TODO: add all variants
const meta: Meta<typeof EventCard> = {
  title: 'Patterns/EventCard',
  component: EventCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EventCard>

export const Default: Story = {}
