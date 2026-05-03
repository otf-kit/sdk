import { useState } from 'react'
import {
  SettingsScreen,
  YStack,
  XStack,
  SizableText,
  Bell,
  Lock,
  CreditCard,
  Globe,
  Moon,
  Mail,
  ShieldCheck,
  FileText,
  HelpCircle,
  LogOut,
  type SettingsSection,
} from '@otf/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function SettingsScreenShowcase() {
  const [pushOn, setPushOn] = useState(true)
  const [emailDigest, setEmailDigest] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [biometric, setBiometric] = useState(true)

  const accountSection: SettingsSection = {
    title: 'Account',
    items: [
      { id: 'profile', icon: <Mail size={18} />, title: 'Email', subtitle: 'sarah.chen@example.com', onPress: () => {} },
      { id: 'pwd', icon: <Lock size={18} />, title: 'Password', subtitle: 'Last changed 2 months ago', onPress: () => {} },
      { id: 'billing', icon: <CreditCard size={18} />, title: 'Billing', subtitle: 'Visa •• 4242', onPress: () => {} },
    ],
  }

  const preferencesSection: SettingsSection = {
    title: 'Preferences',
    items: [
      {
        id: 'push',
        icon: <Bell size={18} />,
        title: 'Push notifications',
        subtitle: 'Streak nudges, friend activity',
        type: 'toggle',
        value: pushOn,
        onValueChange: setPushOn,
      },
      {
        id: 'digest',
        icon: <Mail size={18} />,
        title: 'Weekly digest',
        subtitle: 'Mondays at 8am',
        type: 'toggle',
        value: emailDigest,
        onValueChange: setEmailDigest,
      },
      {
        id: 'dark',
        icon: <Moon size={18} />,
        title: 'Dark appearance',
        type: 'toggle',
        value: darkMode,
        onValueChange: setDarkMode,
      },
      {
        id: 'biometric',
        icon: <ShieldCheck size={18} />,
        title: 'Unlock with biometrics',
        type: 'toggle',
        value: biometric,
        onValueChange: setBiometric,
      },
      { id: 'lang', icon: <Globe size={18} />, title: 'Language', subtitle: 'English (US)', onPress: () => {} },
    ],
  }

  const legalSection: SettingsSection = {
    title: 'Legal',
    items: [
      { id: 'privacy', icon: <FileText size={18} />, title: 'Privacy policy', onPress: () => {} },
      { id: 'terms', icon: <FileText size={18} />, title: 'Terms of service', onPress: () => {} },
      { id: 'help', icon: <HelpCircle size={18} />, title: 'Help & support', onPress: () => {} },
      { id: 'signout', icon: <LogOut size={18} />, title: 'Sign out', onPress: () => {} },
    ],
  }

  return (
    <ShowcaseFrame
      title="Settings Screen"
      description="Grouped, native-style settings list. Mixes navigation rows with toggles, sectioned by intent."
      docPath="packages/ui-native/src/patterns/SettingsScreen.tsx"
    >
      <Section title="Full settings — account, preferences, legal">
        <YStack height={500} overflow="hidden" borderRadius="$4" borderWidth={1} borderColor="$borderColor">
          <SettingsScreen
            sections={[accountSection, preferencesSection, legalSection]}
            header={
              <XStack paddingVertical="$4" paddingHorizontal="$4" justifyContent="center">
                <SizableText size="$7" fontWeight="700">Settings</SizableText>
              </XStack>
            }
          />
        </YStack>
      </Section>

      <Section title="Preferences only" hint="Toggle-heavy">
        <YStack height={320} overflow="hidden" borderRadius="$4" borderWidth={1} borderColor="$borderColor">
          <SettingsScreen sections={[preferencesSection]} />
        </YStack>
      </Section>

      <Section title="Legal only" hint="Pure navigation rows">
        <YStack height={280} overflow="hidden" borderRadius="$4" borderWidth={1} borderColor="$borderColor">
          <SettingsScreen sections={[legalSection]} />
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
