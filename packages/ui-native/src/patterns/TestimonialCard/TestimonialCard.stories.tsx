import type { Meta, StoryObj } from '@storybook/react'
import { TestimonialCard } from './TestimonialCard'

// TODO: add all variants
const meta: Meta<typeof TestimonialCard> = {
  title: 'Patterns/TestimonialCard',
  component: TestimonialCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TestimonialCard>

export const Default: Story = {}
