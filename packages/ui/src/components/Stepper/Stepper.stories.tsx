import type { Meta, StoryObj } from '@storybook/react'
import { Stepper } from './Stepper'

// TODO: add all variants
const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Stepper>

export const Default: Story = {}
