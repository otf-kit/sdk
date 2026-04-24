import type { Meta, StoryObj } from '@storybook/react'
import { Drawer } from './Drawer'

// TODO: add all variants
const meta: Meta<typeof Drawer> = {
  title: 'Primitives/Drawer',
  component: Drawer,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {}
