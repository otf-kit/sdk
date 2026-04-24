import type { Meta, StoryObj } from '@storybook/react'
import { NavigationMenu } from './NavigationMenu'

// TODO: add all variants
const meta: Meta<typeof NavigationMenu> = {
  title: 'Primitives/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof NavigationMenu>

export const Default: Story = {}
