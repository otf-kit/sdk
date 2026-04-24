import type { Meta, StoryObj } from '@storybook/react'
import { ResizeBox } from './ResizeBox'

// TODO: add all variants
const meta: Meta<typeof ResizeBox> = {
  title: 'Layouts/ResizeBox',
  component: ResizeBox,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ResizeBox>

export const Default: Story = {}
