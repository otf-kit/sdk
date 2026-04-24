import type { Meta, StoryObj } from '@storybook/react'
import { AspectRatio } from './AspectRatio'

// TODO: add all variants
const meta: Meta<typeof AspectRatio> = {
  title: 'Primitives/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AspectRatio>

export const Default: Story = {}
