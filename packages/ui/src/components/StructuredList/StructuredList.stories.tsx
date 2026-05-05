import type { Meta, StoryObj } from '@storybook/react'
import { StructuredList } from './StructuredList'

// TODO: add all variants
const meta: Meta<typeof StructuredList> = {
  title: 'Components/StructuredList',
  component: StructuredList,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof StructuredList>

export const Default: Story = {}
