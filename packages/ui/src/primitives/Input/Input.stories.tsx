import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

// TODO: add all variants
const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}
