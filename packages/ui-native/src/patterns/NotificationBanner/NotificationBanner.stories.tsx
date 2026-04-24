import type { Meta, StoryObj } from '@storybook/react'
import { NotificationBanner } from './NotificationBanner'

// TODO: add all variants
const meta: Meta<typeof NotificationBanner> = {
  title: 'Patterns/NotificationBanner',
  component: NotificationBanner,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof NotificationBanner>

export const Default: Story = {}
