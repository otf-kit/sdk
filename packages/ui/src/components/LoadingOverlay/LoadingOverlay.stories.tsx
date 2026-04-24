import type { Meta, StoryObj } from '@storybook/react'
import { LoadingOverlay } from './LoadingOverlay'

// TODO: add all variants
const meta: Meta<typeof LoadingOverlay> = {
  title: 'Components/LoadingOverlay',
  component: LoadingOverlay,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LoadingOverlay>

export const Default: Story = {}
