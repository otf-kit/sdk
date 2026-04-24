import type { Meta, StoryObj } from '@storybook/react'
import { InputOtp } from './InputOtp'

// TODO: add all variants
const meta: Meta<typeof InputOtp> = {
  title: 'Primitives/InputOtp',
  component: InputOtp,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof InputOtp>

export const Default: Story = {}
