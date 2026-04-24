import type { Meta, StoryObj } from '@storybook/react'
import { SortableTaskList } from './SortableTaskList'

// TODO: add all variants
const meta: Meta<typeof SortableTaskList> = {
  title: 'Blocks/SortableTaskList',
  component: SortableTaskList,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SortableTaskList>

export const Default: Story = {}
