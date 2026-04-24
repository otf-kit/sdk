import type { Meta, StoryObj } from '@storybook/react'
import { FinanceDashboard } from './FinanceDashboard'

// TODO: add all variants
const meta: Meta<typeof FinanceDashboard> = {
  title: 'Patterns/FinanceDashboard',
  component: FinanceDashboard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FinanceDashboard>

export const Default: Story = {}
