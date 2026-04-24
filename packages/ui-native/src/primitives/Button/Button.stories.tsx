import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

// TODO: add all variants
const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {}
