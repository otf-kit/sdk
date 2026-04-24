import type { Meta, StoryObj } from '@storybook/react'
import { WorkspaceMembers } from './WorkspaceMembers'

// TODO: add all variants
const meta: Meta<typeof WorkspaceMembers> = {
  title: 'Blocks/WorkspaceMembers',
  component: WorkspaceMembers,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof WorkspaceMembers>

export const Default: Story = {}
