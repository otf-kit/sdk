import type { Meta, StoryObj } from '@storybook/react'
import { Carousel } from './Carousel'

// TODO: add all variants
const meta: Meta<typeof Carousel> = {
  title: 'Patterns/Carousel',
  component: Carousel,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Carousel>

export const Default: Story = {}
