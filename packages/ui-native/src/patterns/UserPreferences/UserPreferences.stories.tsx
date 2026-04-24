import type { Meta, StoryObj } from '@storybook/react'
import { UserPreferences } from './UserPreferences'

// TODO: add all variants
const meta: Meta<typeof UserPreferences> = {
  title: 'Patterns/UserPreferences',
  component: UserPreferences,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof UserPreferences>

export const Default: Story = {}
