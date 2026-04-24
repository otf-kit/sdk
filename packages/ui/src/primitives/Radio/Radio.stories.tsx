import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from './Radio'

// TODO: add all variants
const meta: Meta<typeof Radio> = {
  title: 'Primitives/Radio',
  component: Radio,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Radio>

export const Default: Story = {}
