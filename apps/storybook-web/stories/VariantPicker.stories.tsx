import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { VariantPicker } from '@otfdashkit/ui'

const meta: Meta<typeof VariantPicker> = {
  title: 'Primitives/VariantPicker',
  component: VariantPicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof VariantPicker>

export const Default: Story = {
  render: () => {
    const [grind, setGrind] = useState('whole')
    return (
      <div className="w-[360px]">
        <VariantPicker
          label="Grind"
          value={grind}
          onValueChange={setGrind}
          options={[
            { value: 'whole', label: 'Whole bean' },
            { value: 'espresso', label: 'Espresso' },
            { value: 'filter', label: 'Filter' },
            { value: 'french', label: 'French press' },
          ]}
        />
      </div>
    )
  },
}

export const WithSwatches: Story = {
  render: () => (
    <div className="w-[360px]">
      <VariantPicker
        label="Color"
        defaultValue="sage"
        options={[
          { value: 'sage', label: 'Sage', swatch: '#8a9a5b' },
          { value: 'clay', label: 'Clay', swatch: '#b66a50' },
          { value: 'slate', label: 'Slate', swatch: '#4a5568' },
        ]}
      />
    </div>
  ),
}

export const WithOutOfStock: Story = {
  render: () => (
    <div className="w-[360px]">
      <VariantPicker
        label="Size"
        defaultValue="250g"
        options={[
          { value: '250g', label: '250g' },
          { value: '500g', label: '500g' },
          { value: '1kg', label: '1kg', disabled: true },
        ]}
      />
    </div>
  ),
}
