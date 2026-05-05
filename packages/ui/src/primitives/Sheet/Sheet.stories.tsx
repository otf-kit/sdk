import type { Meta, StoryObj } from '@storybook/react'
import { Sheet } from './Sheet'

// TODO: add all variants
const meta: Meta<typeof Sheet> = {
  title: 'Primitives/Sheet',
  component: Sheet,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Sheet>

export const Default: Story = {}
