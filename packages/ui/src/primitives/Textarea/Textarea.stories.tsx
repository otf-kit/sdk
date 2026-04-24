import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './Textarea'

// TODO: add all variants
const meta: Meta<typeof Textarea> = {
  title: 'Primitives/Textarea',
  component: Textarea,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {}
