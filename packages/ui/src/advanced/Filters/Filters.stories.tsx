import type { Meta, StoryObj } from '@storybook/react'
import { Filters } from './Filters'

// TODO: add all variants
const meta: Meta<typeof Filters> = {
  title: 'Advanced/Filters',
  component: Filters,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Filters>

export const Default: Story = {}
