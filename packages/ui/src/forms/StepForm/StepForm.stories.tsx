import type { Meta, StoryObj } from '@storybook/react'
import { StepForm } from './StepForm'

// TODO: add all variants
const meta: Meta<typeof StepForm> = {
  title: 'Forms/StepForm',
  component: StepForm,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof StepForm>

export const Default: Story = {}
