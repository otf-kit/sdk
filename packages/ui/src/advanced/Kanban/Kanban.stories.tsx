import type { Meta, StoryObj } from '@storybook/react'
import { Kanban } from './Kanban'

// TODO: add all variants
const meta: Meta<typeof Kanban> = {
  title: 'Advanced/Kanban',
  component: Kanban,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Kanban>

export const Default: Story = {}
