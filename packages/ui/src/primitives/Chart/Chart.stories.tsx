import type { Meta, StoryObj } from '@storybook/react'
import { Chart } from './Chart'

// TODO: add all variants
const meta: Meta<typeof Chart> = {
  title: 'Primitives/Chart',
  component: Chart,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Chart>

export const Default: Story = {}
