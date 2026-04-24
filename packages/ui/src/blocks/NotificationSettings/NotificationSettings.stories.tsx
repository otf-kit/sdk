import type { Meta, StoryObj } from '@storybook/react'
import { NotificationSettings } from './NotificationSettings'

// TODO: add all variants
const meta: Meta<typeof NotificationSettings> = {
  title: 'Blocks/NotificationSettings',
  component: NotificationSettings,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof NotificationSettings>

export const Default: Story = {}
