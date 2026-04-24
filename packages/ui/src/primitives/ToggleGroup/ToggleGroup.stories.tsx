import type { Meta, StoryObj } from '@storybook/react'
import { ToggleGroup } from './ToggleGroup'

// TODO: add all variants
const meta: Meta<typeof ToggleGroup> = {
  title: 'Primitives/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ToggleGroup>

export const Default: Story = {}
