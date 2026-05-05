import type { Meta, StoryObj } from '@storybook/react'
import { ToggleButton } from './ToggleButton'

// TODO: add all variants
const meta: Meta<typeof ToggleButton> = {
  title: 'Advanced/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ToggleButton>

export const Default: Story = {}
