import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'

// TODO: add all variants
const meta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  component: Switch,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {}
