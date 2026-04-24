import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'

// TODO: add all variants
const meta: Meta<typeof Alert> = {
  title: 'Primitives/Alert',
  component: Alert,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {}
