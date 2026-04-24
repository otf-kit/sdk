import type { Meta, StoryObj } from '@storybook/react'
import { SafeArea } from './SafeArea'

// TODO: add all variants
const meta: Meta<typeof SafeArea> = {
  title: 'Layouts/SafeArea',
  component: SafeArea,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SafeArea>

export const Default: Story = {}
