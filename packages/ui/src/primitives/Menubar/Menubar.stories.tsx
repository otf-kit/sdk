import type { Meta, StoryObj } from '@storybook/react'
import { Menubar } from './Menubar'

// TODO: add all variants
const meta: Meta<typeof Menubar> = {
  title: 'Primitives/Menubar',
  component: Menubar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Menubar>

export const Default: Story = {}
