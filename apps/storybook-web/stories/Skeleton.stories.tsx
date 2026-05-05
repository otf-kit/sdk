import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from '@otfdashkit/ui'

const meta = {
  title: 'Primitives/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Skeleton className="h-5 w-[200px]" />,
}

export const Shapes: Story = {
  name: 'Shapes',
  render: () => (
    <div className="flex items-center gap-6">
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-8 w-8 rounded-md" />
      <Skeleton className="h-20 w-40 rounded-lg" />
    </div>
  ),
}

export const TextBlock: Story = {
  name: 'Text block',
  render: () => (
    <div className="w-80 space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  ),
}

export const CardSkeleton: Story = {
  name: 'Card skeleton',
  render: () => (
    <div className="w-80 rounded-lg border border-border bg-card p-4 space-y-3">
      <Skeleton className="h-5 w-3/5" />
      <Skeleton className="h-3.5 w-full" />
      <Skeleton className="h-3.5 w-4/5" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    </div>
  ),
}

export const Avatar: Story = {
  name: 'Avatar + lines',
  render: () => (
    <div className="flex items-center gap-3 w-80">
      <Skeleton className="h-10 w-10 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-3/5" />
      </div>
    </div>
  ),
}
