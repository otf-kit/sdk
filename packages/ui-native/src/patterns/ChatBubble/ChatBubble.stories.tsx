import type { Meta, StoryObj } from '@storybook/react'
import { ChatBubble } from './ChatBubble'

// TODO: add all variants
const meta: Meta<typeof ChatBubble> = {
  title: 'Patterns/ChatBubble',
  component: ChatBubble,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ChatBubble>

export const Default: Story = {}
