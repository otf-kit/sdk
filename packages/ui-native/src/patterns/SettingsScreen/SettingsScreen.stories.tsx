import type { Meta, StoryObj } from '@storybook/react'
import { SettingsScreen } from './SettingsScreen'

// TODO: add all variants
const meta: Meta<typeof SettingsScreen> = {
  title: 'Patterns/SettingsScreen',
  component: SettingsScreen,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SettingsScreen>

export const Default: Story = {}
