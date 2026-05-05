import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox, RadioGroup, RadioGroupItem, Switch, Slider } from '@otfdashkit/ui'

const meta: Meta = { title: 'Primitives/Controls', tags: ['autodocs'] }
export default meta

export const CheckboxStory: StoryObj = {
  name: 'Checkbox',
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="terms" />
        <label htmlFor="terms" className="text-sm font-medium">Accept terms and conditions</label>
      </div>
      <div className="flex items-center gap-2 opacity-50">
        <Checkbox id="disabled" disabled />
        <label htmlFor="disabled" className="text-sm font-medium">Disabled</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="checked" defaultChecked />
        <label htmlFor="checked" className="text-sm font-medium">Already checked</label>
      </div>
    </div>
  ),
}

export const RadioGroupStory: StoryObj = {
  name: 'RadioGroup',
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-one" id="o1" />
        <label htmlFor="o1" className="text-sm">Option one</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-two" id="o2" />
        <label htmlFor="o2" className="text-sm">Option two</label>
      </div>
    </RadioGroup>
  ),
}

export const SwitchStory: StoryObj = {
  name: 'Switch',
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Switch id="airplane" />
        <label htmlFor="airplane" className="text-sm font-medium">Airplane Mode</label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="on" defaultChecked />
        <label htmlFor="on" className="text-sm font-medium">Enabled by default</label>
      </div>
    </div>
  ),
}

export const SliderStory: StoryObj = {
  name: 'Slider',
  render: () => {
    const [value, setValue] = React.useState([50])
    return (
      <div className="w-64 space-y-4">
        <Slider defaultValue={[33]} max={100} step={1} />
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Value: {value[0]}</p>
      </div>
    )
  },
}
