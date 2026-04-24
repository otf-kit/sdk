import type { Meta, StoryObj } from '@storybook/react'
import { RolesMenu } from './RolesMenu'

// TODO: add all variants
const meta: Meta<typeof RolesMenu> = {
  title: 'Blocks/RolesMenu',
  component: RolesMenu,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RolesMenu>

export const Default: Story = {}
