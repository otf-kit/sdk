import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './DatePicker'

// TODO: add all variants
const meta: Meta<typeof DatePicker> = {
  title: 'Patterns/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {}
