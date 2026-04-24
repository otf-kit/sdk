import type { Meta, StoryObj } from '@storybook/react'
import { Field } from './Field'

// TODO: add all variants
const meta: Meta<typeof Field> = {
  title: 'Forms/Field',
  component: Field,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Field>

export const Default: Story = {}
