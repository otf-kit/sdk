import type { Meta, StoryObj } from '@storybook/react'
import { CommandBar } from './CommandBar'

// TODO: add all variants
const meta: Meta<typeof CommandBar> = {
  title: 'Advanced/CommandBar',
  component: CommandBar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CommandBar>

export const Default: Story = {}
