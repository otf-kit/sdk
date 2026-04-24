import type { Meta, StoryObj } from '@storybook/react'
import { SidebarLayoutDashboard } from './SidebarLayoutDashboard'

// TODO: add all variants
const meta: Meta<typeof SidebarLayoutDashboard> = {
  title: 'Blocks/SidebarLayoutDashboard',
  component: SidebarLayoutDashboard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SidebarLayoutDashboard>

export const Default: Story = {}
