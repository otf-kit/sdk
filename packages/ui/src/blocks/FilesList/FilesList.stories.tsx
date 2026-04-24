import type { Meta, StoryObj } from '@storybook/react'
import { FilesList } from './FilesList'

// TODO: add all variants
const meta: Meta<typeof FilesList> = {
  title: 'Blocks/FilesList',
  component: FilesList,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FilesList>

export const Default: Story = {}
