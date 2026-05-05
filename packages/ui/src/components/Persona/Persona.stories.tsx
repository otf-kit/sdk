import type { Meta, StoryObj } from '@storybook/react'
import { Persona } from './Persona'

// TODO: add all variants
const meta: Meta<typeof Persona> = {
  title: 'Components/Persona',
  component: Persona,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Persona>

export const Default: Story = {}
