import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './Slider'

// TODO: add all variants
const meta: Meta<typeof Slider> = {
  title: 'Primitives/Slider',
  component: Slider,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {}
