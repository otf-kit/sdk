import type { Meta, StoryObj } from '@storybook/react'
import { AvatarGroup } from './AvatarGroup'

// TODO: add all variants
const meta: Meta<typeof AvatarGroup> = {
  title: 'Patterns/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AvatarGroup>

export const Default: Story = {}
