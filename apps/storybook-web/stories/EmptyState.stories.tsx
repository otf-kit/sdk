import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState } from '@otfdashkit/ui'
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
      action={{ label: 'Compose', onClick: () => {} }}
    />
  ),
}

export const WithSecondaryAction: StoryObj = {
  render: () => (
    <EmptyState
      icon={<FileX className="h-10 w-10" />}
      title="No files found"
      description="Upload your first file to get started."
      action={{ label: 'Upload file', onClick: () => {} }}
      secondaryAction={{ label: 'Learn more', onClick: () => {} }}
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
