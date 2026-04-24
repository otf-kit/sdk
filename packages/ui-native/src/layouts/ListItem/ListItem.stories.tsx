import type { Meta, StoryObj } from '@storybook/react'
import { ListItem } from './ListItem'

// TODO: add all variants
const meta: Meta<typeof ListItem> = {
  title: 'Layouts/ListItem',
  component: ListItem,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ListItem>

export const Default: Story = {}
