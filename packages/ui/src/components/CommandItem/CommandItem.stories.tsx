import type { Meta, StoryObj } from '@storybook/react'
import { CommandItem } from './CommandItem'

// TODO: add all variants
const meta: Meta<typeof CommandItem> = {
  title: 'Components/CommandItem',
  component: CommandItem,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CommandItem>

export const Default: Story = {}
