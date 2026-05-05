import type { Meta, StoryObj } from '@storybook/react'
import { PropertyList } from './PropertyList'

// TODO: add all variants
const meta: Meta<typeof PropertyList> = {
  title: 'Components/PropertyList',
  component: PropertyList,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PropertyList>

export const Default: Story = {}
