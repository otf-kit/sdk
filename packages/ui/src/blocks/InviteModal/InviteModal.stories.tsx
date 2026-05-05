import type { Meta, StoryObj } from '@storybook/react'
import { InviteModal } from './InviteModal'

// TODO: add all variants
const meta: Meta<typeof InviteModal> = {
  title: 'Blocks/InviteModal',
  component: InviteModal,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof InviteModal>

export const Default: Story = {}
