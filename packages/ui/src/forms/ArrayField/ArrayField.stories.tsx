import type { Meta, StoryObj } from '@storybook/react'
import { ArrayField } from './ArrayField'

// TODO: add all variants
const meta: Meta<typeof ArrayField> = {
  title: 'Forms/ArrayField',
  component: ArrayField,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ArrayField>

export const Default: Story = {}
