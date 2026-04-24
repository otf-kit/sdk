import type { Meta, StoryObj } from '@storybook/react'
import { PaywallScreen } from './PaywallScreen'

// TODO: add all variants
const meta: Meta<typeof PaywallScreen> = {
  title: 'Patterns/PaywallScreen',
  component: PaywallScreen,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PaywallScreen>

export const Default: Story = {}
