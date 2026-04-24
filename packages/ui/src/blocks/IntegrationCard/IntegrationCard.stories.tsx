import type { Meta, StoryObj } from '@storybook/react'
import { IntegrationCard } from './IntegrationCard'

// TODO: add all variants
const meta: Meta<typeof IntegrationCard> = {
  title: 'Blocks/IntegrationCard',
  component: IntegrationCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof IntegrationCard>

export const Default: Story = {}
