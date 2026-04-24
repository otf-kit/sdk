import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

// TODO: add all variants
const meta: Meta<typeof Avatar> = {
  title: 'Primitives/Avatar',
  component: Avatar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {}
