import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from './Calendar'

// TODO: add all variants
const meta: Meta<typeof Calendar> = {
  title: 'Primitives/Calendar',
  component: Calendar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {}
