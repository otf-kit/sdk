import type { Meta, StoryObj } from '@storybook/react'
import { ScreenLayout } from './ScreenLayout'

// TODO: add all variants
const meta: Meta<typeof ScreenLayout> = {
  title: 'Layouts/ScreenLayout',
  component: ScreenLayout,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ScreenLayout>

export const Default: Story = {}
