import type { Meta, StoryObj } from '@storybook/react'
import { Toaster } from './Toaster'

// TODO: add all variants
const meta: Meta<typeof Toaster> = {
  title: 'Components/Toaster',
  component: Toaster,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Toaster>

export const Default: Story = {}
