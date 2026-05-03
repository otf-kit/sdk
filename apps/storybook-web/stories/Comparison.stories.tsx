import type { Meta, StoryObj } from '@storybook/react'
import { Comparison } from '@otf/ui'

const meta: Meta<typeof Comparison> = {
  title: 'Primitives/Comparison',
  component: Comparison,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Comparison>

// Two stable Unsplash sample images at fixed sizes — same aspect ratio.
const BEFORE =
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop&q=80'
const AFTER =
  'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1200&h=800&fit=crop&q=80'

export const Default: Story = {
  render: () => (
    <div className="aspect-[3/2] max-w-2xl">
      <Comparison
        before={BEFORE}
        after={AFTER}
        beforeAlt="Mountain landscape with summer green"
        afterAlt="Mountain landscape with autumn snow"
      />
    </div>
  ),
}

export const WithLabels: Story = {
  render: () => (
    <div className="aspect-[3/2] max-w-2xl">
      <Comparison
        before={BEFORE}
        after={AFTER}
        beforeLabel="Before"
        afterLabel="After"
      />
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="aspect-[3/2] max-w-2xl">
      <Comparison
        before={BEFORE}
        after={AFTER}
        orientation="vertical"
        defaultValue={40}
      />
    </div>
  ),
}

export const StartFar: Story = {
  render: () => (
    <div className="aspect-[3/2] max-w-2xl">
      <Comparison before={BEFORE} after={AFTER} defaultValue={15} />
    </div>
  ),
}
