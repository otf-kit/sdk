import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from './Stack'

// TODO: add all variants
const meta: Meta<typeof Stack> = {
  title: 'Layouts/Stack',
  component: Stack,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Stack>

export const Default: Story = {}
