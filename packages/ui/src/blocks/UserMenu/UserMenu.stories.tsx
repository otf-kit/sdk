import type { Meta, StoryObj } from '@storybook/react'
import { UserMenu } from './UserMenu'

// TODO: add all variants
const meta: Meta<typeof UserMenu> = {
  title: 'Blocks/UserMenu',
  component: UserMenu,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof UserMenu>

export const Default: Story = {}
