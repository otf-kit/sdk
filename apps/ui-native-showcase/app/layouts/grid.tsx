import {
  Grid,
  Container,
  YStack,
  SizableText,
  Card,
  XStack,
  OtfAvatar,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

type Tile = { id: string; title: string; subtitle: string }

const products: Tile[] = [
  { id: 'p1', title: 'Starter Plan', subtitle: '$9 / month' },
  { id: 'p2', title: 'Pro Plan', subtitle: '$29 / month' },
  { id: 'p3', title: 'Team Plan', subtitle: '$99 / month' },
  { id: 'p4', title: 'Enterprise', subtitle: 'Talk to sales' },
]

const team = [
  { id: 't1', name: 'Avery', role: 'Designer' },
  { id: 't2', name: 'Blair', role: 'Engineer' },
  { id: 't3', name: 'Casey', role: 'PM' },
  { id: 't4', name: 'Devin', role: 'Engineer' },
  { id: 't5', name: 'Eden', role: 'Designer' },
  { id: 't6', name: 'Frankie', role: 'QA' },
]

function ProductTile({ tile }: { tile: Tile }) {
  return (
    <Card padded bordered>
      <YStack gap="$1">
        <SizableText size="$4" fontWeight="700" color="$color12">{tile.title}</SizableText>
        <SizableText size="$2" color="$color11">{tile.subtitle}</SizableText>
      </YStack>
    </Card>
  )
}

function TeamTile({ name, role }: { name: string; role: string }) {
  return (
    <Card padded bordered>
      {/* Compact vertical layout + single-line truncation so the card holds
          its shape in a narrow 3-column grid instead of wrapping per-character. */}
      <YStack alignItems="center" gap="$2">
        <OtfAvatar name={name} size="sm" />
        <YStack alignItems="center" gap="$1" width="100%">
          <SizableText size="$3" fontWeight="600" numberOfLines={1}>{name}</SizableText>
          <SizableText size="$1" color="$color11" numberOfLines={1}>{role}</SizableText>
        </YStack>
      </YStack>
    </Card>
  )
}

export default function GridShowcase() {
  return (
    <ShowcaseFrame
      title="Grid"
      description="Flex-based n-column grid with even gaps. Fills incomplete rows with spacers so the last row aligns with the rest. Container caps width and centers content."
      docPath="packages/ui-native/src/layouts/Grid.tsx"
    >
      <Section title="2 columns" hint="Pricing tiles, hero cards">
        <Grid columns={2} gap="$3">
          {products.map((p) => <ProductTile key={p.id} tile={p} />)}
        </Grid>
      </Section>

      <Section title="3 columns" hint="Team directory">
        <Grid columns={3} gap="$3">
          {team.map((m) => <TeamTile key={m.id} name={m.name} role={m.role} />)}
        </Grid>
      </Section>

      <Section title="4 columns" hint="Compact tile grid">
        <Grid columns={4} gap="$2">
          {Array.from({ length: 8 }).map((_, i) => (
            <YStack
              key={i}
              padding="$3"
              borderRadius="$3"
              borderWidth={1}
              borderColor="$borderColor"
              backgroundColor="$color2"
              alignItems="center"
              justifyContent="center"
              minHeight={64}
            >
              <SizableText size="$5" fontWeight="700">{i + 1}</SizableText>
            </YStack>
          ))}
        </Grid>
      </Section>

      <Section title="Tight gap">
        <Grid columns={3} gap="$1">
          {Array.from({ length: 6 }).map((_, i) => (
            <YStack
              key={i}
              padding="$3"
              borderRadius="$2"
              backgroundColor="$color3"
              alignItems="center"
            >
              <SizableText size="$2" color="$color11">{`Cell ${i + 1}`}</SizableText>
            </YStack>
          ))}
        </Grid>
      </Section>

      <Section title="Container — centered, capped width">
        <Container maxWidth={360} padding="$3">
          <YStack
            padding="$4"
            borderRadius="$4"
            borderWidth={1}
            borderColor="$borderColor"
            backgroundColor="$color2"
            alignItems="center"
            gap="$1"
          >
            <SizableText size="$5" fontWeight="700">Centered content</SizableText>
            <SizableText size="$2" color="$color11">maxWidth=360, padding=$3</SizableText>
          </YStack>
        </Container>
      </Section>
    </ShowcaseFrame>
  )
}
