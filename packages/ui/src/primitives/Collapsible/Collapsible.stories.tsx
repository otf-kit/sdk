import type { Meta, StoryObj } from '@storybook/react'
import { Collapsible } from './Collapsible'

// TODO: add all variants
const meta: Meta<typeof Collapsible> = {
  title: 'Primitives/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Collapsible>

export const Default: Story = {}
