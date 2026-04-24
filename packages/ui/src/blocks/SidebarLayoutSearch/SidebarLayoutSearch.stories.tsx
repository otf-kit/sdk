import type { Meta, StoryObj } from '@storybook/react'
import { SidebarLayoutSearch } from './SidebarLayoutSearch'

// TODO: add all variants
const meta: Meta<typeof SidebarLayoutSearch> = {
  title: 'Blocks/SidebarLayoutSearch',
  component: SidebarLayoutSearch,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SidebarLayoutSearch>

export const Default: Story = {}
