import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'

// TODO: add all variants
const meta: Meta<typeof Icon> = {
  title: 'Interface/Icon',
  component: Icon,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {}
