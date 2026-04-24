import type { Meta, StoryObj } from '@storybook/react'
import { Pressable } from './Pressable'

// TODO: add all variants
const meta: Meta<typeof Pressable> = {
  title: 'Interface/Pressable',
  component: Pressable,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Pressable>

export const Default: Story = {}
