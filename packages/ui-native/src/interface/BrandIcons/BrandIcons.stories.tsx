import type { Meta, StoryObj } from '@storybook/react'
import { BrandIcons } from './BrandIcons'

// TODO: add all variants
const meta: Meta<typeof BrandIcons> = {
  title: 'Interface/BrandIcons',
  component: BrandIcons,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BrandIcons>

export const Default: Story = {}
