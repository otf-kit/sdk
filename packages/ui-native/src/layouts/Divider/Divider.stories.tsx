import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './Divider'

// TODO: add all variants
const meta: Meta<typeof Divider> = {
  title: 'Layouts/Divider',
  component: Divider,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Divider>

export const Default: Story = {}
