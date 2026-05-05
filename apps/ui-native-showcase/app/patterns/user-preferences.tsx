import { useState } from 'react'
import { UserPreferences, type PreferenceSection } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

type Prefs = {
  pushNotifs: boolean
  emailDigest: boolean
  marketing: boolean
  publicProfile: boolean
  showActivity: boolean
  twoFactor: boolean
  theme: string
  language: string
  haptics: number
  textSize: number
}

export default function UserPreferencesShowcase() {
  const [prefs, setPrefs] = useState<Prefs>({
    pushNotifs: true,
    emailDigest: true,
    marketing: false,
    publicProfile: true,
    showActivity: false,
    twoFactor: true,
    theme: 'system',
    language: 'en',
    haptics: 60,
    textSize: 100,
  })

  const set = <K extends keyof Prefs>(key: K, value: Prefs[K]) =>
    setPrefs((p) => ({ ...p, [key]: value }))

  const sections: PreferenceSection[] = [
    {
      title: 'Notifications',
      items: [
        {
          type: 'toggle',
          id: 'push',
          title: 'Push notifications',
          description: 'Activity alerts on this device',
          value: prefs.pushNotifs,
          onValueChange: (v: boolean) => set('pushNotifs', v),
        },
        {
          type: 'toggle',
          id: 'email',
          title: 'Email digest',
          description: 'Weekly summary every Monday',
          value: prefs.emailDigest,
          onValueChange: (v: boolean) => set('emailDigest', v),
        },
        {
          type: 'toggle',
          id: 'marketing',
          title: 'Marketing emails',
          value: prefs.marketing,
          onValueChange: (v: boolean) => set('marketing', v),
        },
      ],
    },
    {
      title: 'Privacy',
      items: [
        {
          type: 'toggle',
          id: 'publicProfile',
          title: 'Public profile',
          description: 'Anyone can find you by username',
          value: prefs.publicProfile,
          onValueChange: (v: boolean) => set('publicProfile', v),
        },
        {
          type: 'toggle',
          id: 'showActivity',
          title: 'Show activity status',
          value: prefs.showActivity,
          onValueChange: (v: boolean) => set('showActivity', v),
        },
        {
          type: 'toggle',
          id: '2fa',
          title: 'Two-factor auth',
          description: 'Required on new devices',
          value: prefs.twoFactor,
          onValueChange: (v: boolean) => set('twoFactor', v),
        },
      ],
    },
    {
      title: 'Appearance',
      items: [
        {
          type: 'select',
          id: 'theme',
          title: 'Theme',
          value: prefs.theme,
          options: [
            { label: 'System', value: 'system' },
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ],
          onValueChange: (v: string) => set('theme', v),
        },
        {
          type: 'select',
          id: 'lang',
          title: 'Language',
          value: prefs.language,
          options: [
            { label: 'English', value: 'en' },
            { label: 'Español', value: 'es' },
            { label: 'Français', value: 'fr' },
          ],
          onValueChange: (v: string) => set('language', v),
        },
        {
          type: 'slider',
          id: 'textSize',
          title: 'Text size',
          description: 'Affects all screens',
          value: prefs.textSize,
          min: 80,
          max: 140,
          onValueChange: (v: number) => set('textSize', v),
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          type: 'action',
          id: 'export',
          title: 'Export data',
          description: 'Download a copy of your account',
          onPress: () => {},
        },
        {
          type: 'action',
          id: 'delete',
          title: 'Delete account',
          destructive: true,
          onPress: () => {},
        },
      ],
    },
  ]

  return (
    <ShowcaseFrame
      title="User Preferences"
      description="Settings list pattern — grouped sections of toggles, selects, sliders, and actions."
      docPath="packages/ui-native/src/patterns/UserPreferences.tsx"
    >
      <Section title="Full preferences screen" hint={`${sections.length} sections`}>
        <UserPreferences sections={sections} />
      </Section>
    </ShowcaseFrame>
  )
}
