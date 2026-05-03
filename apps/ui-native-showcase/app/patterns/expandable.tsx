import { useState } from 'react'
import {
  Expandable,
  YStack,
  SizableText,
  OtfButton,
  Settings,
  Bell,
  Lock,
} from '@otf/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

const FAQ = [
  {
    title: 'Why is my goal lower than yesterday?',
    body: 'Daily move goals adapt to your activity baseline. After a heavy week, the target trims back so you can recover.',
  },
  {
    title: 'How are streaks counted?',
    body: 'Any day you log at least one workout or hit your move goal counts. Travel days carry over once per month.',
  },
  {
    title: 'Can I export my data?',
    body: 'Settings → Account → Export sends a CSV with every workout, weigh-in, and meal log to your inbox within 24 hours.',
  },
]

const LONG_BODY =
  'Daily move goals are computed from a 7-day rolling baseline of your active calories. The algorithm trims hard weeks by 10–15% so recovery days do not break a streak, and bumps easy weeks by 5–10% to keep the floor honest. You can override the auto-target from Settings → Move goal at any time, and the override persists for 30 days before re-anchoring to the rolling baseline. Adjustments only count once per day — toggling between auto and manual mid-day will not penalize your streak.'

export default function ExpandableShowcase() {
  const [controlled, setControlled] = useState(false)

  return (
    <ShowcaseFrame
      title="Expandable"
      description="Single-row disclosure primitive — header layout, chevron rotation, smooth body reveal."
      docPath="packages/ui-native/src/patterns/Expandable.tsx"
    >
      <Section title="Plain variant">
        <YStack gap="$2">
          {FAQ.map((q) => (
            <Expandable key={q.title} title={q.title}>
              <SizableText size="$3" color="$color11">
                {q.body}
              </SizableText>
            </Expandable>
          ))}
        </YStack>
      </Section>

      <Section title="Card variant">
        <YStack gap="$2">
          {FAQ.map((q) => (
            <Expandable key={q.title} title={q.title} variant="card">
              <SizableText size="$3" color="$color11">
                {q.body}
              </SizableText>
            </Expandable>
          ))}
        </YStack>
      </Section>

      <Section title="Controlled" hint={controlled ? 'open' : 'closed'}>
        <YStack gap="$3">
          <OtfButton variant="outlined" onPress={() => setControlled((v) => !v)}>
            {controlled ? 'Collapse' : 'Expand'}
          </OtfButton>
          <Expandable
            title="Driven from the parent"
            subtitle="The button above owns the state"
            variant="card"
            expanded={controlled}
            onToggle={setControlled}
          >
            <SizableText size="$3" color="$color11">
              The parent renders a toggle button that flips a boolean. The Expandable receives that boolean via the expanded prop and reports tap events back through onToggle.
            </SizableText>
          </Expandable>
        </YStack>
      </Section>

      <Section title="With icon + subtitle">
        <YStack gap="$2">
          <Expandable
            variant="card"
            icon={<Settings size={20} />}
            title="App preferences"
            subtitle="Theme, units, and language"
          >
            <SizableText size="$3" color="$color11">
              Choose your default theme (light / dark / system), the unit system for distance and weight, and your preferred language.
            </SizableText>
          </Expandable>
          <Expandable
            variant="card"
            icon={<Bell size={20} />}
            title="Notifications"
            subtitle="Push, email, and quiet hours"
          >
            <SizableText size="$3" color="$color11">
              Tune which events trigger a push, configure quiet hours, and opt into the weekly email digest.
            </SizableText>
          </Expandable>
          <Expandable
            variant="card"
            icon={<Lock size={20} />}
            title="Privacy"
            subtitle="Data export + account deletion"
          >
            <SizableText size="$3" color="$color11">
              Export every record we have on you as a CSV, or permanently delete your account along with all associated data.
            </SizableText>
          </Expandable>
        </YStack>
      </Section>

      <Section title="Long body content">
        <Expandable variant="card" title="How is my move goal computed?">
          <SizableText size="$3" color="$color11">
            {LONG_BODY}
          </SizableText>
        </Expandable>
      </Section>
    </ShowcaseFrame>
  )
}
