import type { Meta, StoryObj } from '@storybook/react'
import { DropdownMenu } from './DropdownMenu'

// TODO: add all variants
const meta: Meta<typeof DropdownMenu> = {
  title: 'Primitives/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {}
