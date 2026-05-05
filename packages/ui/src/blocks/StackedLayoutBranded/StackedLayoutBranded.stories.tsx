import type { Meta, StoryObj } from '@storybook/react'
import { StackedLayoutBranded } from './StackedLayoutBranded'

// TODO: add all variants
const meta: Meta<typeof StackedLayoutBranded> = {
  title: 'Blocks/StackedLayoutBranded',
  component: StackedLayoutBranded,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof StackedLayoutBranded>

export const Default: Story = {}
