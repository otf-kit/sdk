import type { Meta, StoryObj } from '@storybook/react'
import { SearchInput } from './SearchInput'

// TODO: add all variants
const meta: Meta<typeof SearchInput> = {
  title: 'Forms/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SearchInput>

export const Default: Story = {}
