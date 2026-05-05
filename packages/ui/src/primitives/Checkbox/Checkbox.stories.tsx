import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

// TODO: add all variants
const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {}
