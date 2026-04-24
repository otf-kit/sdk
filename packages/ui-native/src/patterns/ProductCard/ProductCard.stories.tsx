import type { Meta, StoryObj } from '@storybook/react'
import { ProductCard } from './ProductCard'

// TODO: add all variants
const meta: Meta<typeof ProductCard> = {
  title: 'Patterns/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProductCard>

export const Default: Story = {}
