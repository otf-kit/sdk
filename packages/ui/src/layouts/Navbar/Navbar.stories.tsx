import type { Meta, StoryObj } from '@storybook/react'
import { Navbar } from './Navbar'

// TODO: add all variants
const meta: Meta<typeof Navbar> = {
  title: 'Layouts/Navbar',
  component: Navbar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Navbar>

export const Default: Story = {}
