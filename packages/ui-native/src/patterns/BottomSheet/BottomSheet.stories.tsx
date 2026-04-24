import type { Meta, StoryObj } from '@storybook/react'
import { BottomSheet } from './BottomSheet'

// TODO: add all variants
const meta: Meta<typeof BottomSheet> = {
  title: 'Patterns/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BottomSheet>

export const Default: Story = {}
