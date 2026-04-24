import type { Meta, StoryObj } from '@storybook/react'
import { PasswordInput } from './PasswordInput'

// TODO: add all variants
const meta: Meta<typeof PasswordInput> = {
  title: 'Forms/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PasswordInput>

export const Default: Story = {}
