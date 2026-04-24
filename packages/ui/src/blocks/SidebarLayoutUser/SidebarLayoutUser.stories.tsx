import type { Meta, StoryObj } from '@storybook/react'
import { SidebarLayoutUser } from './SidebarLayoutUser'

// TODO: add all variants
const meta: Meta<typeof SidebarLayoutUser> = {
  title: 'Blocks/SidebarLayoutUser',
  component: SidebarLayoutUser,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SidebarLayoutUser>

export const Default: Story = {}
