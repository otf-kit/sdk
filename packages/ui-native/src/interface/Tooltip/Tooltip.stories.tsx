import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'

// TODO: add all variants
const meta: Meta<typeof Tooltip> = {
  title: 'Interface/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {}
