import type { Meta, StoryObj } from '@storybook/react'
import { FileUpload } from './FileUpload'

// TODO: add all variants
const meta: Meta<typeof FileUpload> = {
  title: 'Forms/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FileUpload>

export const Default: Story = {}
