import type { Meta, StoryObj } from '@storybook/react'
import { GlassCard } from './GlassCard'

// TODO: add all variants
const meta: Meta<typeof GlassCard> = {
  title: 'Patterns/GlassCard',
  component: GlassCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof GlassCard>

export const Default: Story = {}
