import { useState } from 'react'
import {
  ListItem,
  YStack,
  OtfCard,
  Bell,
  Lock,
  User,
  Settings,
  Activity,
  CreditCard,
  Mail,
  Globe,
  Heart,
  Cloud,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function ListItemShowcase() {
  const [pushOn, setPushOn] = useState(true)
  const [emailOn, setEmailOn] = useState(false)
  const [analyticsOn, setAnalyticsOn] = useState(true)

  return (
    <ShowcaseFrame
      title="ListItem"
      description="Row primitive — leading icon, title + subtitle, configurable right slot (chevron, switch, value, badge)."
      docPath="packages/ui-native/src/layouts/ListItem.tsx"
    >
      <Section title="Basic" hint="grouped in a Card with hairline dividers">
        <OtfCard padding={0} overflow="hidden">
          <ListItem divided title="Help center" onPress={() => {}} />
          <ListItem divided title="Send feedback" onPress={() => {}} />
          <ListItem title="What's new" onPress={() => {}} />
        </OtfCard>
      </Section>

      <Section title="With icon + subtitle">
        <OtfCard padding={0} overflow="hidden">
          <ListItem divided icon={<User size={20} />} title="Account" subtitle="Personal details + email" />
          <ListItem divided icon={<Lock size={20} />} title="Security" subtitle="Password + 2FA" />
          <ListItem icon={<CreditCard size={20} />} title="Billing" subtitle="Plan + invoices" />
        </OtfCard>
      </Section>

      <Section title="Right slot — chevron + href" hint="auto-pushes via expo-router">
        <YStack gap="$1">
          <ListItem icon={<User size={20} />} title="Account" right="chevron" href="/layouts/list-item" />
          <ListItem icon={<Lock size={20} />} title="Security" right="chevron" href="/layouts/list-item" />
          <ListItem icon={<CreditCard size={20} />} title="Billing" right="chevron" href="/layouts/list-item" />
        </YStack>
      </Section>

      <Section title="Right slot — switch">
        <YStack gap="$1">
          <ListItem
            icon={<Bell size={20} />}
            title="Push notifications"
            subtitle="Alerts on this device"
            right="switch"
            switchValue={pushOn}
            onSwitchChange={setPushOn}
          />
          <ListItem
            icon={<Mail size={20} />}
            title="Email digest"
            subtitle="Weekly summary"
            right="switch"
            switchValue={emailOn}
            onSwitchChange={setEmailOn}
          />
          <ListItem
            icon={<Activity size={20} />}
            title="Anonymous analytics"
            subtitle="Help improve the product"
            right="switch"
            switchValue={analyticsOn}
            onSwitchChange={setAnalyticsOn}
          />
        </YStack>
      </Section>

      <Section title="Right slot — value">
        <YStack gap="$1">
          <ListItem icon={<Mail size={20} />} title="Email" right={{ value: 'sarah@example.com' }} />
          <ListItem icon={<Globe size={20} />} title="Language" right={{ value: 'English' }} />
          <ListItem icon={<Settings size={20} />} title="Time zone" right={{ value: 'PST' }} />
        </YStack>
      </Section>

      <Section title="Right slot — badges (4 tones)">
        <YStack gap="$1">
          <ListItem icon={<Activity size={20} />} title="Plan" right={{ badge: 'Pro', tone: 'default' }} />
          <ListItem icon={<Cloud size={20} />} title="Sync status" right={{ badge: 'Synced', tone: 'success' }} />
          <ListItem icon={<Heart size={20} />} title="Heart-rate sensor" right={{ badge: 'Battery low', tone: 'warning' }} />
          <ListItem icon={<Cloud size={20} />} title="Backup" right={{ badge: 'Failed', tone: 'danger' }} />
        </YStack>
      </Section>

      <Section title="Composed group" hint="5 rows in a card">
        <OtfCard padding="$2" backgroundColor="$background">
          <YStack gap="$1">
            <ListItem icon={<User size={20} />} title="Account" subtitle="Personal details" right="chevron" href="/layouts/list-item" />
            <ListItem icon={<Bell size={20} />} title="Notifications" right="switch" switchValue={pushOn} onSwitchChange={setPushOn} />
            <ListItem icon={<Globe size={20} />} title="Language" right={{ value: 'English' }} />
            <ListItem icon={<CreditCard size={20} />} title="Plan" right={{ badge: 'Pro', tone: 'success' }} />
            <ListItem icon={<Lock size={20} />} title="Sign out" onPress={() => {}} />
          </YStack>
        </OtfCard>
      </Section>
    </ShowcaseFrame>
  )
}
