import type { Meta, StoryObj } from '@storybook/react'
import { Resizable } from './Resizable'

// TODO: add all variants
const meta: Meta<typeof Resizable> = {
  title: 'Primitives/Resizable',
  component: Resizable,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Resizable>

export const Default: Story = {}
