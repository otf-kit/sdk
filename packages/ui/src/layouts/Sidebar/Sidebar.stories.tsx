import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'

// TODO: add all variants
const meta: Meta<typeof Sidebar> = {
  title: 'Layouts/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {}
