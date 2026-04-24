import type { Meta, StoryObj } from '@storybook/react'
import { HoverCard } from './HoverCard'

// TODO: add all variants
const meta: Meta<typeof HoverCard> = {
  title: 'Primitives/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof HoverCard>

export const Default: Story = {}
