import type { Meta, StoryObj } from '@storybook/react'
import { TextureCard, TextureCardHeader, TextureCardTitle, TextureCardDescription } from '@otf/ui'
import { Button } from '@otf/ui'

const meta = {
  title: 'Primitives/TextureCard',
  component: TextureCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof TextureCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TextureCard className="w-80">
      <TextureCardHeader>
        <TextureCardTitle>Project Settings</TextureCardTitle>
        <TextureCardDescription>Manage your workspace preferences and team configuration.</TextureCardDescription>
      </TextureCardHeader>
    </TextureCard>
  ),
}

export const WithContent: Story = {
  render: () => (
    <TextureCard className="w-80">
      <TextureCardHeader>
        <TextureCardTitle>Danger Zone</TextureCardTitle>
        <TextureCardDescription>These actions cannot be undone.</TextureCardDescription>
      </TextureCardHeader>
      <div className="mt-4 flex gap-2">
        <Button variant="destructive" size="sm">Delete workspace</Button>
        <Button variant="outline" size="sm">Cancel</Button>
      </div>
    </TextureCard>
  ),
}

export const StatCard: Story = {
  render: () => (
    <div className="flex gap-4">
      {[
        { label: 'Total Issues', value: '142', delta: '+12 this week' },
        { label: 'In Progress', value: '23', delta: '5 overdue' },
        { label: 'Completed', value: '89', delta: '+8 today' },
      ].map((stat) => (
        <TextureCard key={stat.label} className="w-48">
          <p className="text-xs text-muted-foreground">{stat.label}</p>
          <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
          <p className="text-xs text-muted-foreground/70 mt-1">{stat.delta}</p>
        </TextureCard>
      ))}
    </div>
  ),
}
