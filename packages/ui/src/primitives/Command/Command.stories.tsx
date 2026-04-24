import type { Meta, StoryObj } from '@storybook/react'
import { Command } from './Command'

// TODO: add all variants
const meta: Meta<typeof Command> = {
  title: 'Primitives/Command',
  component: Command,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Command>

export const Default: Story = {}
