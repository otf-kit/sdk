import { useState } from 'react'
import {
  FloatingActionButton,
  Plus,
  Dumbbell,
  Apple,
  Droplet,
  YStack,
  SizableText,
} from '@otfdashkit/ui-native'
import { Section, ShowcaseFrame } from '../../components/ShowcaseFrame'

// FAB renders into the current viewport as `position: absolute`. To keep
// each variant scoped to its own example without overlapping, wrap each
// in a YStack with a fixed `height` + `position: relative`.
function Stage({ children }: { children: React.ReactNode }) {
  return (
    <YStack height={220} position="relative" backgroundColor="$color2" borderRadius="$4" overflow="hidden">
      {children}
    </YStack>
  )
}

export default function FloatingActionButtonShowcase() {
  const [lastAction, setLastAction] = useState<string | null>(null)
  const [tapCount, setTapCount] = useState(0)

  return (
    <ShowcaseFrame
      title="Floating Action Button"
      description="Anchored CTA over content. Single-action mode is the legacy circle/pill; passing `actions` enables an expanding menu pattern — tap to fan out chips, backdrop to dismiss, hardware-back closes. Reduced-motion respected."
    >
      <Section title="Legacy — circle (icon only)">
        <Stage>
          <SizableText padding="$4" color="$color10">Tap count: {tapCount}</SizableText>
          <FloatingActionButton
            icon={<Plus size={24} />}
            onPress={() => setTapCount((n) => n + 1)}
          />
        </Stage>
      </Section>

      <Section title="Legacy — pill (icon + label)">
        <Stage>
          <SizableText padding="$4" color="$color10">Pill grows around the label.</SizableText>
          <FloatingActionButton
            icon={<Plus size={20} />}
            label="Add"
            onPress={() => setTapCount((n) => n + 1)}
          />
        </Stage>
      </Section>

      <Section title="Expanding (pill style) — quick-actions menu">
        <Stage>
          <SizableText padding="$4" color="$color10">
            Tapped: {lastAction ?? 'nothing yet'}
          </SizableText>
          <FloatingActionButton
            icon={<Plus size={24} />}
            label="Add"
            expandStyle="pill"
            actions={[
              { id: 'workout', icon: <Dumbbell size={20} />, label: 'Log workout', onPress: () => setLastAction('Log workout') },
              { id: 'meal',    icon: <Apple    size={20} />, label: 'Log meal',    onPress: () => setLastAction('Log meal') },
              { id: 'water',   icon: <Droplet  size={20} />, label: 'Log water',   onPress: () => setLastAction('Log water') },
            ]}
          />
        </Stage>
      </Section>

      <Section title="Expanding (circle style) — icon-only menu">
        <Stage>
          <FloatingActionButton
            icon={<Plus size={24} />}
            expandStyle="circle"
            actions={[
              { id: 'workout', icon: <Dumbbell size={20} />, label: 'Log workout', onPress: () => setLastAction('workout') },
              { id: 'meal',    icon: <Apple    size={20} />, label: 'Log meal',    onPress: () => setLastAction('meal') },
              { id: 'water',   icon: <Droplet  size={20} />, label: 'Log water',   onPress: () => setLastAction('water') },
            ]}
          />
        </Stage>
      </Section>

      <Section title="Custom accent per action">
        <Stage>
          <FloatingActionButton
            icon={<Plus size={24} />}
            label="Quick log"
            actions={[
              { id: 'workout', icon: <Dumbbell size={20} />, label: 'Log workout', accent: '#a3ff12', onPress: () => {} },
              { id: 'meal',    icon: <Apple    size={20} />, label: 'Log meal',    accent: '#fbbf24', onPress: () => {} },
              { id: 'water',   icon: <Droplet  size={20} />, label: 'Log water',   accent: '#00d4d4', onPress: () => {} },
            ]}
          />
        </Stage>
      </Section>
    </ShowcaseFrame>
  )
}
