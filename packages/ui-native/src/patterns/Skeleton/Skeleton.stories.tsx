import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

// TODO: add all variants
const meta: Meta<typeof Skeleton> = {
  title: 'Patterns/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {}
