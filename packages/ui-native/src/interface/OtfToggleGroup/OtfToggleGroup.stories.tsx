import type { Meta, StoryObj } from '@storybook/react'
import { OtfToggleGroup } from './OtfToggleGroup'

// TODO: add all variants
const meta: Meta<typeof OtfToggleGroup> = {
  title: 'Interface/OtfToggleGroup',
  component: OtfToggleGroup,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OtfToggleGroup>

export const Default: Story = {}
