import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from './Tabs'

// TODO: add all variants
const meta: Meta<typeof Tabs> = {
  title: 'Primitives/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {}
