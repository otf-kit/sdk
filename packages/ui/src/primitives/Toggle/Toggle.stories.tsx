import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from './Toggle'

// TODO: add all variants
const meta: Meta<typeof Toggle> = {
  title: 'Primitives/Toggle',
  component: Toggle,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {}
