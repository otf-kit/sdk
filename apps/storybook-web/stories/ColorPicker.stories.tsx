import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ColorPicker } from '@otfdashkit/ui'

const meta: Meta<typeof ColorPicker> = {
  title: 'Forms/ColorPicker',
  component: ColorPicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ColorPicker>

const TAILWIND_SWATCHES = [
  '#3b82f6', // blue-500
  '#ef4444', // red-500
  '#22c55e', // green-500
  '#eab308', // yellow-500
  '#a855f7', // purple-500
  '#ec4899', // pink-500
  '#f97316', // orange-500
  '#14b8a6', // teal-500
  '#6366f1', // indigo-500
  '#06b6d4', // cyan-500
  '#10b981', // emerald-500
  '#f43f5e', // rose-500
]

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('#3b82f6')
    return (
      <div className="flex flex-col gap-3">
        <ColorPicker value={value} onValueChange={setValue} />
        <p className="font-mono text-xs text-muted-foreground">value: {value}</p>
      </div>
    )
  },
}

export const WithAlpha: Story = {
  render: () => {
    const [value, setValue] = useState('#3b82f6cc')
    return (
      <div className="flex flex-col gap-3">
        <ColorPicker value={value} onValueChange={setValue} showAlpha />
        <p className="font-mono text-xs text-muted-foreground">value: {value}</p>
      </div>
    )
  },
}

export const WithSwatches: Story = {
  render: () => {
    const [value, setValue] = useState('#3b82f6')
    return (
      <div className="flex flex-col gap-3">
        <ColorPicker
          value={value}
          onValueChange={setValue}
          swatches={TAILWIND_SWATCHES}
        />
        <p className="font-mono text-xs text-muted-foreground">value: {value}</p>
      </div>
    )
  },
}

export const EyeDropperDemo: Story = {
  render: () => {
    const [value, setValue] = useState('#a855f7')
    return (
      <div className="flex max-w-sm flex-col gap-3">
        <ColorPicker value={value} onValueChange={setValue} showEyeDropper />
        <p className="text-xs text-muted-foreground">
          The eye-dropper button only renders in browsers that support the
          <code className="mx-1 rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
            EyeDropper
          </code>
          API (Chrome/Edge 95+). It is hidden in Safari and Firefox.
        </p>
        <p className="font-mono text-xs text-muted-foreground">value: {value}</p>
      </div>
    )
  },
}

export const RgbFormat: Story = {
  render: () => {
    const [value, setValue] = useState('rgb(168, 85, 247)')
    return (
      <div className="flex flex-col gap-3">
        <ColorPicker value={value} onValueChange={setValue} format="rgb" />
        <p className="font-mono text-xs text-muted-foreground">value: {value}</p>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <ColorPicker defaultValue="#3b82f6" swatches={TAILWIND_SWATCHES} disabled />
  ),
}
