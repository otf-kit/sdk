import type { Meta, StoryObj } from '@storybook/react'
import { Form } from './Form'

// TODO: add all variants
const meta: Meta<typeof Form> = {
  title: 'Forms/Form',
  component: Form,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Form>

export const Default: Story = {}
