import type { Meta, StoryObj } from '@storybook/react'
import { MediaCard } from './MediaCard'

// TODO: add all variants
const meta: Meta<typeof MediaCard> = {
  title: 'Patterns/MediaCard',
  component: MediaCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MediaCard>

export const Default: Story = {}
