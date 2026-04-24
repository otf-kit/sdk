import type { Meta, StoryObj } from '@storybook/react'
import { OTPInput } from './OTPInput'

// TODO: add all variants
const meta: Meta<typeof OTPInput> = {
  title: 'Patterns/OTPInput',
  component: OTPInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OTPInput>

export const Default: Story = {}
