import type { Meta, StoryObj } from '@storybook/react'
import { OtfSelect } from './OtfSelect'

// TODO: add all variants
const meta: Meta<typeof OtfSelect> = {
  title: 'Patterns/OtfSelect',
  component: OtfSelect,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OtfSelect>

export const Default: Story = {}
