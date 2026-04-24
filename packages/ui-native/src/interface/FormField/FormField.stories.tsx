import type { Meta, StoryObj } from '@storybook/react'
import { FormField } from './FormField'

// TODO: add all variants
const meta: Meta<typeof FormField> = {
  title: 'Interface/FormField',
  component: FormField,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FormField>

export const Default: Story = {}
