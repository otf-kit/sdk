import { EmptyCart, YStack } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function EmptyCartShowcase() {
  return (
    <ShowcaseFrame
      title="Empty Cart"
      description="Empty-cart state — a cart-iconed preset of EmptyState with a continue-shopping CTA."
      docPath="packages/ui-native/src/patterns/EmptyCart.tsx"
    >
      <Section title="Default">
        <YStack height={320} borderWidth={1} borderColor="$color4" borderRadius="$5" overflow="hidden">
          <EmptyCart onAction={() => {}} />
        </YStack>
      </Section>
      <Section title="Custom copy">
        <YStack height={320} borderWidth={1} borderColor="$color4" borderRadius="$5" overflow="hidden">
          <EmptyCart
            title="Nothing brewing yet"
            description="Your cart is empty — find a roast you'll love."
            actionLabel="Shop coffee"
            onAction={() => {}}
          />
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
