import { useState } from 'react'
import {
  ProductCard,
  XStack,
  YStack,
  SizableText,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

const SHOE = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'
const JACKET = 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'
const BAG = 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80'

export default function ProductCardShowcase() {
  const [cart, setCart] = useState<string[]>([])

  return (
    <ShowcaseFrame
      title="Product Card"
      description="E-commerce listing card. Image-led, with rating, price, optional sale badge, and an in-card add-to-cart action."
      docPath="packages/ui-native/src/patterns/ProductCard.tsx"
    >
      <Section title="Vertical — default" hint={`Cart: ${cart.length}`}>
        <XStack gap="$3" flexWrap="wrap">
          <YStack flex={1} minWidth={220}>
            <ProductCard
              image={SHOE}
              title="Trail Runner GTX"
              price="$148"
              originalPrice="$180"
              rating={4.5}
              reviewCount={128}
              badge="-18%"
              onAddToCart={() => setCart((c) => [...c, 'shoe'])}
              onPress={() => {}}
            />
          </YStack>
          <YStack flex={1} minWidth={220}>
            <ProductCard
              image={JACKET}
              title="Featherweight Shell"
              price="$220"
              rating={4}
              reviewCount={64}
              onAddToCart={() => setCart((c) => [...c, 'jacket'])}
              onPress={() => {}}
            />
          </YStack>
        </XStack>
      </Section>

      <Section title="Horizontal — list-row variant">
        <YStack gap="$2">
          <ProductCard
            variant="horizontal"
            image={BAG}
            title="Daypack 22L — water-resistant, packable"
            price="$89"
            rating={4.8}
            reviewCount={312}
            onAddToCart={() => setCart((c) => [...c, 'bag'])}
            onPress={() => {}}
          />
          <ProductCard
            variant="horizontal"
            image={SHOE}
            title="Court Sneaker — leather upper, vulcanized sole"
            price="$120"
            originalPrice="$150"
            rating={4.2}
            reviewCount={45}
            badge="SALE"
            onAddToCart={() => setCart((c) => [...c, 'court'])}
          />
        </YStack>
      </Section>

      <Section title="Minimal — no rating, no cart">
        <XStack gap="$3">
          <YStack flex={1}>
            <ProductCard image={JACKET} title="Linen Overshirt" price="$98" />
          </YStack>
          <YStack flex={1}>
            <ProductCard image={BAG} title="Canvas Tote" price="$42" />
          </YStack>
        </XStack>
      </Section>

      <SizableText size="$2" color="$color10">
        Items added: {cart.length === 0 ? 'none' : cart.join(', ')}
      </SizableText>
    </ShowcaseFrame>
  )
}
