import { useState } from 'react'
import { VariantPicker } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function VariantPickerShowcase() {
  const [grind, setGrind] = useState('whole')
  const [color, setColor] = useState('sage')
  const [size, setSize] = useState('250g')
  return (
    <ShowcaseFrame
      title="Variant Picker"
      description="Single-select product-option picker for grind, size, or color. Selected options tint to the accent; out-of-stock options strike through and disable."
      docPath="packages/ui-native/src/patterns/VariantPicker.tsx"
    >
      <Section title="Options" hint={grind}>
        <VariantPicker
          label="Grind"
          value={grind}
          onChange={setGrind}
          options={[
            { value: 'whole', label: 'Whole bean' },
            { value: 'espresso', label: 'Espresso' },
            { value: 'filter', label: 'Filter' },
            { value: 'french', label: 'French press' },
          ]}
        />
      </Section>
      <Section title="With swatches">
        <VariantPicker
          label="Color"
          value={color}
          onChange={setColor}
          options={[
            { value: 'sage', label: 'Sage', swatch: '#8a9a5b' },
            { value: 'clay', label: 'Clay', swatch: '#b66a50' },
            { value: 'slate', label: 'Slate', swatch: '#4a5568' },
          ]}
        />
      </Section>
      <Section title="With out-of-stock">
        <VariantPicker
          label="Size"
          value={size}
          onChange={setSize}
          options={[
            { value: '250g', label: '250g' },
            { value: '500g', label: '500g' },
            { value: '1kg', label: '1kg', disabled: true },
          ]}
        />
      </Section>
    </ShowcaseFrame>
  )
}
