import type { Meta, StoryObj } from '@storybook/react'
import { OtfDialog } from './OtfDialog'

// TODO: add all variants
const meta: Meta<typeof OtfDialog> = {
  title: 'Patterns/OtfDialog',
  component: OtfDialog,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OtfDialog>

export const Default: Story = {}
