import type { Meta, StoryObj } from '@storybook/react'
import { LoginScreen } from './LoginScreen'

// TODO: add all variants
const meta: Meta<typeof LoginScreen> = {
  title: 'Patterns/LoginScreen',
  component: LoginScreen,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LoginScreen>

export const Default: Story = {}
