import type { Meta, StoryObj } from '@storybook/react'
import { ConfirmDialog } from './ConfirmDialog'

// TODO: add all variants
const meta: Meta<typeof ConfirmDialog> = {
  title: 'Patterns/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ConfirmDialog>

export const Default: Story = {}
