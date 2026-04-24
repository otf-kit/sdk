import type { Meta, StoryObj } from '@storybook/react'
import { Container } from './Container'

// TODO: add all variants
const meta: Meta<typeof Container> = {
  title: 'Layouts/Container',
  component: Container,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Container>

export const Default: Story = {}
