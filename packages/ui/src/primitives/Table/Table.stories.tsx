import type { Meta, StoryObj } from '@storybook/react'
import { Table } from './Table'

// TODO: add all variants
const meta: Meta<typeof Table> = {
  title: 'Primitives/Table',
  component: Table,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {}
