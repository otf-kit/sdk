import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

// TODO: add all variants
const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {}
