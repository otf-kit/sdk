import type { Meta, StoryObj } from '@storybook/react'
import { TabBar } from './TabBar'

// TODO: add all variants
const meta: Meta<typeof TabBar> = {
  title: 'Patterns/TabBar',
  component: TabBar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TabBar>

export const Default: Story = {}
