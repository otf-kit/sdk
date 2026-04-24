import type { Meta, StoryObj } from '@storybook/react'
import { AutoForm } from './AutoForm'

// TODO: add all variants
const meta: Meta<typeof AutoForm> = {
  title: 'Forms/AutoForm',
  component: AutoForm,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AutoForm>

export const Default: Story = {}
