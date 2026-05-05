import type { Meta, StoryObj } from '@storybook/react'
import { ObjectField } from './ObjectField'

// TODO: add all variants
const meta: Meta<typeof ObjectField> = {
  title: 'Forms/ObjectField',
  component: ObjectField,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ObjectField>

export const Default: Story = {}
