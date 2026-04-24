import type { Meta, StoryObj } from '@storybook/react'
import { ImmersiveMediaScreen } from './ImmersiveMediaScreen'

// TODO: add all variants
const meta: Meta<typeof ImmersiveMediaScreen> = {
  title: 'Patterns/ImmersiveMediaScreen',
  component: ImmersiveMediaScreen,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ImmersiveMediaScreen>

export const Default: Story = {}
