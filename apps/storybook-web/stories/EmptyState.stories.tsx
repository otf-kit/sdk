import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState } from '@otf/ui'
import { Button } from '@otf/ui'
import { Inbox, FileX, Search } from 'lucide-react'

const meta = {
  title: 'Components/EmptyState',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta

export default meta

export const Default: StoryObj = {
  render: () => (
    <EmptyState
      icon={<Inbox className="h-10 w-10" />}
      title="No messages yet"
      description="When you receive messages, they will appear here."
      action={<Button>Compose</Button>}
    />
  ),
}

export const WithSecondaryAction: StoryObj = {
  render: () => (
    <EmptyState
      icon={<FileX className="h-10 w-10" />}
      title="No files found"
      description="Upload your first file to get started."
      action={<Button>Upload file</Button>}
      secondaryAction={<Button variant="ghost">Learn more</Button>}
    />
  ),
}

export const SmallSize: StoryObj = {
  render: () => (
    <EmptyState
      size="sm"
      icon={<Search className="h-6 w-6" />}
      title="No results"
      description="Try adjusting your search filters."
    />
  ),
}
