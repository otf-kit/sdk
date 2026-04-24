import type { Meta, StoryObj } from '@storybook/react'
import { SearchBar } from './SearchBar'

// TODO: add all variants
const meta: Meta<typeof SearchBar> = {
  title: 'Patterns/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SearchBar>

export const Default: Story = {}
