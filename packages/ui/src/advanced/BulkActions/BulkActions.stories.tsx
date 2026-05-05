import type { Meta, StoryObj } from '@storybook/react'
import { BulkActions } from './BulkActions'

// TODO: add all variants
const meta: Meta<typeof BulkActions> = {
  title: 'Advanced/BulkActions',
  component: BulkActions,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BulkActions>

export const Default: Story = {}
