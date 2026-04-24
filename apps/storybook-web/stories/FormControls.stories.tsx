import type { Meta, StoryObj } from '@storybook/react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from '@otf/ui'
import { Checkbox } from '@otf/ui'
import { Switch } from '@otf/ui'

const meta = {
  title: 'Forms/Controls',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta

export default meta

export const SelectDemo: StoryObj = {
  render: () => (
    <div className="w-60">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Roles</SelectLabel>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const CheckboxDemo: StoryObj = {
  render: () => (
    <div className="space-y-3">
      {['Accept terms', 'Subscribe to newsletter', 'Enable notifications'].map((label) => (
        <label key={label} className="flex items-center gap-2.5 cursor-pointer text-sm text-foreground">
          <Checkbox />
          {label}
        </label>
      ))}
    </div>
  ),
}

export const SwitchDemo: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <label className="flex items-center justify-between gap-4 cursor-pointer text-sm text-foreground w-60">
        Dark mode
        <Switch defaultChecked />
      </label>
      <label className="flex items-center justify-between gap-4 cursor-pointer text-sm text-foreground w-60">
        Notifications
        <Switch />
      </label>
    </div>
  ),
}
