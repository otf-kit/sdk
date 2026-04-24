import type { Meta, StoryObj } from '@storybook/react'
import { KeyboardStickyFooter } from './KeyboardStickyFooter'

// TODO: add all variants
const meta: Meta<typeof KeyboardStickyFooter> = {
  title: 'Layouts/KeyboardStickyFooter',
  component: KeyboardStickyFooter,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof KeyboardStickyFooter>

export const Default: Story = {}
