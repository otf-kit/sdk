import type { Meta, StoryObj } from '@storybook/react'
import { SelectUsersModal } from './SelectUsersModal'

// TODO: add all variants
const meta: Meta<typeof SelectUsersModal> = {
  title: 'Blocks/SelectUsersModal',
  component: SelectUsersModal,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SelectUsersModal>

export const Default: Story = {}
