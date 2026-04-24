import type { Meta, StoryObj } from '@storybook/react'
import { ProfileHeader } from './ProfileHeader'

// TODO: add all variants
const meta: Meta<typeof ProfileHeader> = {
  title: 'Patterns/ProfileHeader',
  component: ProfileHeader,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProfileHeader>

export const Default: Story = {}
