import type { Meta, StoryObj } from '@storybook/react'
import { Popover } from './Popover'

// TODO: add all variants
const meta: Meta<typeof Popover> = {
  title: 'Primitives/Popover',
  component: Popover,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {}
