import type { Meta, StoryObj } from '@storybook/react'
import { AlertDialog } from './AlertDialog'

// TODO: add all variants
const meta: Meta<typeof AlertDialog> = {
  title: 'Primitives/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AlertDialog>

export const Default: Story = {}
