import type { Meta, StoryObj } from '@storybook/react'
import { Plus, Trash2, ArrowRight, Loader2 } from 'lucide-react'
import { Button, IconButton } from '@otf/ui'

const meta = {
  title: 'Primitives/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'ghost', 'destructive', 'gradient', 'texture'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl', 'icon', 'icon-sm'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Get started', variant: 'default' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="gradient">Gradient</Button>
      <Button variant="texture">Texture</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="default">
        <Plus className="h-4 w-4 mr-1.5" />
        Create issue
      </Button>
      <Button variant="outline">
        Export
        <ArrowRight className="h-4 w-4 ml-1.5" />
      </Button>
      <Button variant="destructive">
        <Trash2 className="h-4 w-4 mr-1.5" />
        Delete
      </Button>
      <IconButton variant="ghost" aria-label="Add"><Plus /></IconButton>
    </div>
  ),
}

export const LoadingState: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button disabled>
        <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
        Saving…
      </Button>
      <Button disabled variant="outline">Processing…</Button>
    </div>
  ),
}
