import type { Meta, StoryObj } from '@storybook/react'
import { MessagesCard } from './MessagesCard'

// TODO: add all variants
const meta: Meta<typeof MessagesCard> = {
  title: 'Blocks/MessagesCard',
  component: MessagesCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MessagesCard>

export const Default: Story = {}
