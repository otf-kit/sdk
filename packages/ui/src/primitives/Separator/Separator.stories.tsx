import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from './Separator'

// TODO: add all variants
const meta: Meta<typeof Separator> = {
  title: 'Primitives/Separator',
  component: Separator,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Separator>

export const Default: Story = {}
