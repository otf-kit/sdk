import { useState } from 'react'
import {
  Selectable,
  SelectableGroup,
  YStack,
  SizableText,
  Bell,
  Mail,
  MessageCircle,
  Phone,
  Target,
  Activity,
  Dumbbell,
  Heart,
  Zap,
  Coffee,
  Sun,
  Moon,
  type SelectableOption,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

type Goal = 'lose' | 'maintain' | 'gain'
type Reminder = 'push' | 'email' | 'sms' | 'inapp'
type DayPart = 'morning' | 'midday' | 'evening' | 'night'

const GOAL_OPTIONS: SelectableOption<Goal>[] = [
  { value: 'lose', label: 'Lose weight', description: 'Cut a moderate deficit', icon: <Activity size={20} /> },
  { value: 'maintain', label: 'Maintain', description: 'Hold current composition', icon: <Heart size={20} /> },
  { value: 'gain', label: 'Gain muscle', description: 'Lean surplus', icon: <Dumbbell size={20} /> },
]

const REMINDER_OPTIONS: SelectableOption<Reminder>[] = [
  { value: 'push', label: 'Push', description: 'Device alerts', icon: <Bell size={20} /> },
  { value: 'email', label: 'Email', description: 'Daily digest', icon: <Mail size={20} /> },
  { value: 'sms', label: 'SMS', description: 'Texts for streaks', icon: <Phone size={20} /> },
  { value: 'inapp', label: 'In-app', description: 'Inbox only', icon: <MessageCircle size={20} /> },
]

const DAY_OPTIONS: SelectableOption<DayPart>[] = [
  { value: 'morning', label: 'Morning', icon: <Sun size={24} /> },
  { value: 'midday', label: 'Midday', icon: <Coffee size={24} /> },
  { value: 'evening', label: 'Evening', icon: <Zap size={24} /> },
  { value: 'night', label: 'Night', icon: <Moon size={24} /> },
]

export default function SelectableShowcase() {
  const [card, setCard] = useState(false)
  const [row, setRow] = useState(true)
  const [goal, setGoal] = useState<Goal | null>('maintain')
  const [reminders, setReminders] = useState<Reminder[]>(['push', 'inapp'])
  const [day, setDay] = useState<DayPart | null>('morning')

  return (
    <ShowcaseFrame
      title="Selectable"
      description="Onboarding-grade option cards. Three variants — card, row, tile — plus radio/checkbox group semantics."
      docPath="packages/ui-native/src/patterns/Selectable.tsx"
    >
      <Section title="Card variant">
        <Selectable
          variant="card"
          icon={<Target size={24} />}
          label="Daily move goal"
          description="Pick a calorie target you can hit on any day."
          selected={card}
          onPress={() => setCard((v) => !v)}
        />
      </Section>

      <Section title="Row variant">
        <Selectable
          variant="row"
          icon={<Bell size={20} />}
          label="Push notifications"
          description="Streak reminders + check-ins"
          selected={row}
          onPress={() => setRow((v) => !v)}
        />
      </Section>

      <Section title="Tile variant" hint="2-col grid via SelectableGroup">
        <SelectableGroup
          options={DAY_OPTIONS}
          variant="tile"
          value={day}
          onChange={setDay}
        />
      </Section>

      <Section title="SelectableGroup — single (radio)" hint={goal ? `Picked: ${goal}` : 'No selection'}>
        <SelectableGroup
          options={GOAL_OPTIONS}
          value={goal}
          onChange={setGoal}
        />
      </Section>

      <Section title="SelectableGroup — multi (checkbox)" hint={`${reminders.length} selected`}>
        <YStack gap="$2">
          <SelectableGroup
            multi
            variant="row"
            options={REMINDER_OPTIONS}
            value={reminders}
            onChange={setReminders}
          />
          <SizableText size="$2" color="$color11">
            {reminders.length === 0 ? 'No reminders' : reminders.join(', ')}
          </SizableText>
        </YStack>
      </Section>

      <Section title="Disabled state">
        <Selectable
          variant="row"
          icon={<Bell size={20} />}
          label="Beta features"
          description="Disabled until your trial converts"
          selected={false}
          onPress={() => {}}
          disabled
        />
      </Section>
    </ShowcaseFrame>
  )
}
