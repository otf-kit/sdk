import type { Meta, StoryObj } from '@storybook/react'
import { CountdownBanner } from './CountdownBanner'

// TODO: add all variants
const meta: Meta<typeof CountdownBanner> = {
  title: 'Patterns/CountdownBanner',
  component: CountdownBanner,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CountdownBanner>

export const Default: Story = {}
