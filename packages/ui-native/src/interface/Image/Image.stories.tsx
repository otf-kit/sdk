import type { Meta, StoryObj } from '@storybook/react'
import { Image } from './Image'

// TODO: add all variants
const meta: Meta<typeof Image> = {
  title: 'Interface/Image',
  component: Image,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Image>

export const Default: Story = {}
