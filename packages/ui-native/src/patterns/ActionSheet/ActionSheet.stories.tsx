import type { Meta, StoryObj } from '@storybook/react'
import { ActionSheet } from './ActionSheet'

// TODO: add all variants
const meta: Meta<typeof ActionSheet> = {
  title: 'Patterns/ActionSheet',
  component: ActionSheet,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ActionSheet>

export const Default: Story = {}
