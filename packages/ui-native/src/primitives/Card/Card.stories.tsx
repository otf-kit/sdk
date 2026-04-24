import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

// TODO: add all variants
const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {}
