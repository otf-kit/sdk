import type { Meta, StoryObj } from '@storybook/react'
import { Beacon } from './Beacon'

// TODO: add all variants
const meta: Meta<typeof Beacon> = {
  title: 'Engagement/Beacon',
  component: Beacon,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Beacon>

export const Default: Story = {}
