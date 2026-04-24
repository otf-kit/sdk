import type { Meta, StoryObj } from '@storybook/react'
import { Section } from './Section'

// TODO: add all variants
const meta: Meta<typeof Section> = {
  title: 'Layouts/Section',
  component: Section,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Section>

export const Default: Story = {}
