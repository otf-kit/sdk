import type { Meta, StoryObj } from '@storybook/react'
import { Banner } from './Banner'

// TODO: add all variants
const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Banner>

export const Default: Story = {}
