import type { Meta, StoryObj } from '@storybook/react'
import { Hotkeys } from './Hotkeys'

// TODO: add all variants
const meta: Meta<typeof Hotkeys> = {
  title: 'Components/Hotkeys',
  component: Hotkeys,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Hotkeys>

export const Default: Story = {}
