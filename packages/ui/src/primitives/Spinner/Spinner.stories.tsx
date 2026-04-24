import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from './Spinner'

// TODO: add all variants
const meta: Meta<typeof Spinner> = {
  title: 'Primitives/Spinner',
  component: Spinner,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {}
