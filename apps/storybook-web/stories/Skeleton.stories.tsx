import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from '@otf/ui'

const meta = {
  title: 'Primitives/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { width: 200, height: 20 },
}

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-80 rounded-lg border border-border bg-card p-4 space-y-3">
      <Skeleton width="60%" height={20} />
      <Skeleton width="100%" height={14} />
      <Skeleton width="80%" height={14} />
      <div className="flex gap-2 mt-4">
        <Skeleton width={80} height={32} rounded="md" />
        <Skeleton width={80} height={32} rounded="md" />
      </div>
    </div>
  ),
}

export const ShimmerVariant: Story = {
  render: () => (
    <div className="space-y-2 w-80">
      <Skeleton variant="shimmer" width="100%" height={16} />
      <Skeleton variant="shimmer" width="75%" height={16} />
      <Skeleton variant="shimmer" width="90%" height={16} />
    </div>
  ),
}
