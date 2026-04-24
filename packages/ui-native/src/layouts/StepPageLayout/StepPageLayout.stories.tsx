import type { Meta, StoryObj } from '@storybook/react'
import { StepPageLayout } from './StepPageLayout'

// TODO: add all variants
const meta: Meta<typeof StepPageLayout> = {
  title: 'Layouts/StepPageLayout',
  component: StepPageLayout,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof StepPageLayout>

export const Default: Story = {}
