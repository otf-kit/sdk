import type { Meta, StoryObj } from '@storybook/react'
import { FileCards } from './FileCards'

// TODO: add all variants
const meta: Meta<typeof FileCards> = {
  title: 'Blocks/FileCards',
  component: FileCards,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FileCards>

export const Default: Story = {}
