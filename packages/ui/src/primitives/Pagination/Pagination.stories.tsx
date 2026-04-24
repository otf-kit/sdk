import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './Pagination'

// TODO: add all variants
const meta: Meta<typeof Pagination> = {
  title: 'Primitives/Pagination',
  component: Pagination,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {}
