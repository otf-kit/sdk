import type { Meta, StoryObj } from '@storybook/react'
import { OrganizationMenu } from './OrganizationMenu'

// TODO: add all variants
const meta: Meta<typeof OrganizationMenu> = {
  title: 'Blocks/OrganizationMenu',
  component: OrganizationMenu,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OrganizationMenu>

export const Default: Story = {}
