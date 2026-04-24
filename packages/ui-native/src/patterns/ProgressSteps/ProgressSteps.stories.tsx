import type { Meta, StoryObj } from '@storybook/react'
import { ProgressSteps } from './ProgressSteps'

// TODO: add all variants
const meta: Meta<typeof ProgressSteps> = {
  title: 'Patterns/ProgressSteps',
  component: ProgressSteps,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProgressSteps>

export const Default: Story = {}
