import type { Meta, StoryObj } from '@storybook/react'
import { FloatingActionButton } from './FloatingActionButton'

// TODO: add all variants
const meta: Meta<typeof FloatingActionButton> = {
  title: 'Patterns/FloatingActionButton',
  component: FloatingActionButton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FloatingActionButton>

export const Default: Story = {}
