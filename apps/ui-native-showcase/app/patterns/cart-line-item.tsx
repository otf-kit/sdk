import { useState } from 'react'
import { CartLineItem } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'
import { PRODUCTS } from '../../lib/fixtures'

export default function CartLineItemShowcase() {
  const [q1, setQ1] = useState(2)
  const [q2, setQ2] = useState(1)
  const a = PRODUCTS[0]
  const b = PRODUCTS[1]
  return (
    <ShowcaseFrame
      title="Cart Line Item"
      description="Cart row — thumbnail, title, variant, price, quantity stepper, and remove. Composes PriceTag + QuantityStepper."
      docPath="packages/ui-native/src/patterns/CartLineItem.tsx"
    >
      <Section title="Default" hint={`qty: ${q1}`}>
        <CartLineItem
          image={a.image}
          title={a.name}
          variant="Size 10 · Black"
          price={12800}
          quantity={q1}
          onQuantityChange={setQ1}
          onRemove={() => {}}
        />
      </Section>
      <Section title="On sale">
        <CartLineItem
          image={b.image}
          title={b.name}
          variant="Medium"
          price={18000}
          compareAt={22000}
          quantity={q2}
          onQuantityChange={setQ2}
          onRemove={() => {}}
        />
      </Section>
      <Section title="No image / no remove">
        <CartLineItem title="Gift Card" variant="Digital" price={2500} quantity={3} />
      </Section>
    </ShowcaseFrame>
  )
}
