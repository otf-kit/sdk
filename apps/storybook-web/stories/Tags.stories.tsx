import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Tags } from '@otf/ui'

const meta: Meta<typeof Tags> = {
  title: 'Forms/Tags',
  component: Tags,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Tags>

export const Default: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([])
    return (
      <div className="flex w-[420px] flex-col gap-3">
        <Tags value={tags} onValueChange={setTags} placeholder="Type and press Enter…" />
        <p className="font-mono text-xs text-muted-foreground">
          value: [{tags.map((t) => `"${t}"`).join(', ')}]
        </p>
      </div>
    )
  },
}

export const WithSuggestions: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([])
    return (
      <div className="w-[420px]">
        <Tags
          value={tags}
          onValueChange={setTags}
          suggestions={[
            'react',
            'typescript',
            'tailwind',
            'radix',
            'vite',
            'bun',
            'next',
            'remix',
            'svelte',
            'vue',
          ]}
          placeholder="Search tech stack…"
        />
      </div>
    )
  },
}

export const Prefilled: Story = {
  render: () => (
    <div className="w-[420px]">
      <Tags defaultValue={['react', 'typescript', 'css']} />
    </div>
  ),
}

export const WithMaxLimit: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(['one', 'two'])
    return (
      <div className="flex w-[420px] flex-col gap-2">
        <Tags
          value={tags}
          onValueChange={setTags}
          maxTags={5}
          placeholder="Up to 5 tags…"
        />
        <p className="font-mono text-xs text-muted-foreground">
          {tags.length} / 5
        </p>
      </div>
    )
  },
}

export const WithValidation: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([])
    return (
      <div className="w-[420px]">
        <Tags
          value={tags}
          onValueChange={setTags}
          validate={(tag) =>
            tag.length < 3 ? 'Tags must be at least 3 characters' : true
          }
          placeholder="Tag must be 3+ characters…"
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="w-[420px]">
      <Tags defaultValue={['readonly', 'tags']} disabled />
    </div>
  ),
}
