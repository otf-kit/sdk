import type { Meta, StoryObj } from '@storybook/react'
import { StackedLayoutTabs } from './StackedLayoutTabs'

// TODO: add all variants
const meta: Meta<typeof StackedLayoutTabs> = {
  title: 'Blocks/StackedLayoutTabs',
  component: StackedLayoutTabs,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof StackedLayoutTabs>

export const Default: Story = {}
