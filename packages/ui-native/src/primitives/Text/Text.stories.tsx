import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'

// TODO: add all variants
const meta: Meta<typeof Text> = {
  title: 'Primitives/Text',
  component: Text,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = {}
