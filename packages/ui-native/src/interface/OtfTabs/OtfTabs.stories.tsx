import type { Meta, StoryObj } from '@storybook/react'
import { OtfTabs } from './OtfTabs'

// TODO: add all variants
const meta: Meta<typeof OtfTabs> = {
  title: 'Interface/OtfTabs',
  component: OtfTabs,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OtfTabs>

export const Default: Story = {}
