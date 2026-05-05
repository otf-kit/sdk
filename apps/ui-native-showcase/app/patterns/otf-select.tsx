import { useState } from 'react'
import { OtfSelect, YStack, type OtfSelectItem } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

const REGIONS: OtfSelectItem[] = [
  { label: 'North America', value: 'na' },
  { label: 'South America', value: 'sa' },
  { label: 'Europe', value: 'eu' },
  { label: 'Asia Pacific', value: 'apac' },
  { label: 'Africa', value: 'af' },
]

const PLANS: OtfSelectItem[] = [
  { label: 'Starter — $0', value: 'starter' },
  { label: 'Pro — $19', value: 'pro' },
  { label: 'Team — $49', value: 'team' },
  { label: 'Enterprise', value: 'enterprise' },
]

const TIMEZONES: OtfSelectItem[] = [
  { label: 'Pacific (PT)', value: 'pt' },
  { label: 'Mountain (MT)', value: 'mt' },
  { label: 'Central (CT)', value: 'ct' },
  { label: 'Eastern (ET)', value: 'et' },
]

export default function OtfSelectShowcase() {
  const [region, setRegion] = useState<string | undefined>(undefined)
  const [plan, setPlan] = useState<string | undefined>('pro')
  const [tz, setTz] = useState<string | undefined>('pt')

  return (
    <ShowcaseFrame
      title="Select"
      description="Dropdown picker with adaptive sheet on touch. Triggers a sheet on small screens."
      docPath="packages/ui-native/src/patterns/OtfSelect.tsx"
    >
      <Section title="With placeholder" hint={region ?? 'no value'}>
        <YStack maxWidth={360}>
          <OtfSelect
            label="Region"
            placeholder="Select a region"
            items={REGIONS}
            value={region}
            onValueChange={setRegion}
          />
        </YStack>
      </Section>

      <Section title="With default value" hint={plan ?? 'no value'}>
        <YStack maxWidth={360}>
          <OtfSelect
            label="Plan"
            items={PLANS}
            value={plan}
            onValueChange={setPlan}
          />
        </YStack>
      </Section>

      <Section title="Disabled">
        <YStack maxWidth={360}>
          <OtfSelect
            label="Timezone"
            items={TIMEZONES}
            value={tz}
            onValueChange={setTz}
            disabled
          />
        </YStack>
      </Section>

      <Section title="Sizes">
        <YStack gap="$3" maxWidth={360}>
          <OtfSelect items={REGIONS} placeholder="Small" size="$3" />
          <OtfSelect items={REGIONS} placeholder="Medium" size="$4" />
          <OtfSelect items={REGIONS} placeholder="Large" size="$5" />
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
