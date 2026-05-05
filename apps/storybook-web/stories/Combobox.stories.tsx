import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Combobox } from '@otfdashkit/ui'

const meta: Meta<typeof Combobox> = {
  title: 'Forms/Combobox',
  component: Combobox,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Combobox>

const FRAMEWORKS = [
  { value: 'next',    label: 'Next.js',       description: 'React framework by Vercel' },
  { value: 'remix',   label: 'Remix',         description: 'Full-stack React framework' },
  { value: 'astro',   label: 'Astro',         description: 'Content-first, MPA-style' },
  { value: 'svelte',  label: 'SvelteKit',     description: 'Svelte app framework' },
  { value: 'solid',   label: 'SolidStart',    description: 'Fine-grained reactivity' },
  { value: 'nuxt',    label: 'Nuxt',          description: 'Intuitive Vue framework' },
  { value: 'qwik',    label: 'Qwik City',     description: 'Resumable framework' },
]

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>()
    return (
      <div className="w-72">
        <Combobox
          options={FRAMEWORKS}
          value={value}
          onChange={setValue}
          placeholder="Pick a framework…"
        />
      </div>
    )
  },
}

export const Preselected: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('next')
    return (
      <div className="w-72">
        <Combobox options={FRAMEWORKS} value={value} onChange={setValue} />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="w-72">
      <Combobox
        options={FRAMEWORKS}
        value="remix"
        disabled
        placeholder="Disabled…"
      />
    </div>
  ),
}

export const WithDisabledOptions: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>()
    const opts = FRAMEWORKS.map((o, i) => (i % 2 === 0 ? { ...o, disabled: true } : o))
    return (
      <div className="w-72">
        <Combobox options={opts} value={value} onChange={setValue} placeholder="Every other disabled…" />
      </div>
    )
  },
}
