import type { Meta, StoryObj } from '@storybook/react'
import { Dialog } from './Dialog'

// TODO: add all variants
const meta: Meta<typeof Dialog> = {
  title: 'Interface/Dialog',
  component: Dialog,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {}
