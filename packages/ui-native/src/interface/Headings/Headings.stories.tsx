import type { Meta, StoryObj } from '@storybook/react'
import { Headings } from './Headings'

// TODO: add all variants
const meta: Meta<typeof Headings> = {
  title: 'Interface/Headings',
  component: Headings,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Headings>

export const Default: Story = {}
