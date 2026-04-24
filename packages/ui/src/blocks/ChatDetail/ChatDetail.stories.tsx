import type { Meta, StoryObj } from '@storybook/react'
import { ChatDetail } from './ChatDetail'

// TODO: add all variants
const meta: Meta<typeof ChatDetail> = {
  title: 'Blocks/ChatDetail',
  component: ChatDetail,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ChatDetail>

export const Default: Story = {}
