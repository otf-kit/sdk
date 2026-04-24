import type { Meta, StoryObj } from '@storybook/react'
import { Timeline } from './Timeline'

// TODO: add all variants
const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Timeline>

export const Default: Story = {}
