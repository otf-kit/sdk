import type { Meta, StoryObj } from '@storybook/react'
import { SidebarLayoutGroups } from './SidebarLayoutGroups'

// TODO: add all variants
const meta: Meta<typeof SidebarLayoutGroups> = {
  title: 'Blocks/SidebarLayoutGroups',
  component: SidebarLayoutGroups,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SidebarLayoutGroups>

export const Default: Story = {}
