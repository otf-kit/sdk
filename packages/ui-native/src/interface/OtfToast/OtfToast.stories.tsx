import type { Meta, StoryObj } from '@storybook/react'
import { OtfToast } from './OtfToast'

// TODO: add all variants
const meta: Meta<typeof OtfToast> = {
  title: 'Interface/OtfToast',
  component: OtfToast,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OtfToast>

export const Default: Story = {}
