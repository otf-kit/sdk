import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea, Separator } from '@otfdashkit/ui'

const meta: Meta<typeof ScrollArea> = {
  title: 'Primitives/ScrollArea',
  component: ScrollArea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ScrollArea>

const TAGS = Array.from({ length: 50 }).map((_, i) => `Tag ${i + 1}`)

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border border-border bg-card">
      <div className="p-4">
        <h4 className="mb-3 text-sm font-semibold leading-none">Tags</h4>
        {TAGS.map((tag) => (
          <div key={tag}>
            <div className="py-1.5 text-sm text-foreground">{tag}</div>
            <Separator className="my-1" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-[420px] whitespace-nowrap rounded-md border border-border bg-card">
      <div className="flex w-max gap-4 p-4">
        {Array.from({ length: 14 }).map((_, i) => (
          <figure key={i} className="shrink-0">
            <div className="flex h-32 w-32 items-center justify-center rounded-md border border-border bg-muted text-2xl font-bold text-muted-foreground">
              {i + 1}
            </div>
            <figcaption className="mt-2 font-mono text-xs text-muted-foreground">
              Photo {i + 1}
            </figcaption>
          </figure>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const LongText: Story = {
  render: () => (
    <ScrollArea className="h-64 w-[480px] rounded-md border border-border bg-card p-4">
      <h4 className="mb-2 text-sm font-semibold">A long article</h4>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {Array.from({ length: 8 })
          .map(
            () =>
              'OpenTemplateForest is a marketplace of fully-built application templates — kits, blocks, and components that ship with source code. Drop one in, restyle it, ship it. Every kit passes the same 24-item design checklist before launch — same visual quality bar across the catalog.',
          )
          .join(' ')}
      </p>
    </ScrollArea>
  ),
}
