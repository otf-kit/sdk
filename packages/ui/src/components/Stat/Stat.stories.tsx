import type { Meta, StoryObj } from '@storybook/react'
import { Stat } from './Stat'

// TODO: add all variants
const meta: Meta<typeof Stat> = {
  title: 'Components/Stat',
  component: Stat,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Stat>

export const Default: Story = {}
