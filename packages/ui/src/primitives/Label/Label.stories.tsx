import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './Label'

// TODO: add all variants
const meta: Meta<typeof Label> = {
  title: 'Primitives/Label',
  component: Label,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {}
