import type { Meta, StoryObj } from '@storybook/react'
import { AppHeader } from './AppHeader'

// TODO: add all variants
const meta: Meta<typeof AppHeader> = {
  title: 'Patterns/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppHeader>

export const Default: Story = {}
