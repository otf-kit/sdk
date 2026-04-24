import type { Meta, StoryObj } from '@storybook/react'
import { SidebarLayoutMinimal } from './SidebarLayoutMinimal'

// TODO: add all variants
const meta: Meta<typeof SidebarLayoutMinimal> = {
  title: 'Blocks/SidebarLayoutMinimal',
  component: SidebarLayoutMinimal,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SidebarLayoutMinimal>

export const Default: Story = {}
