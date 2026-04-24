import type { Meta, StoryObj } from '@storybook/react'
import { ContextMenu } from './ContextMenu'

// TODO: add all variants
const meta: Meta<typeof ContextMenu> = {
  title: 'Primitives/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ContextMenu>

export const Default: Story = {}
