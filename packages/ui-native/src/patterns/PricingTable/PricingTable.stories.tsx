import type { Meta, StoryObj } from '@storybook/react'
import { PricingTable } from './PricingTable'

// TODO: add all variants
const meta: Meta<typeof PricingTable> = {
  title: 'Patterns/PricingTable',
  component: PricingTable,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PricingTable>

export const Default: Story = {}
