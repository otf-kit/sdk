import type { Meta, StoryObj } from '@storybook/react'
import { ManageTagsModal } from './ManageTagsModal'

// TODO: add all variants
const meta: Meta<typeof ManageTagsModal> = {
  title: 'Blocks/ManageTagsModal',
  component: ManageTagsModal,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ManageTagsModal>

export const Default: Story = {}
