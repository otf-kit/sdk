import type { Meta, StoryObj } from '@storybook/react'
import { Sonner } from './Sonner'

// TODO: add all variants
const meta: Meta<typeof Sonner> = {
  title: 'Primitives/Sonner',
  component: Sonner,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Sonner>

export const Default: Story = {}
