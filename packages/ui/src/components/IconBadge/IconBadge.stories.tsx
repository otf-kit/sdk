import type { Meta, StoryObj } from '@storybook/react'
import { IconBadge } from './IconBadge'

// TODO: add all variants
const meta: Meta<typeof IconBadge> = {
  title: 'Components/IconBadge',
  component: IconBadge,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof IconBadge>

export const Default: Story = {}
