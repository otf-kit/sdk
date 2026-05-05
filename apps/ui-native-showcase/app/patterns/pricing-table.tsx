import { useState } from 'react'
import {
  PricingTable,
  YStack,
  SizableText,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

const MONTHLY_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$0',
    period: 'forever',
    description: 'Track up to 3 active plans',
    features: [
      { label: 'Workout library', included: true },
      { label: 'Daily streak', included: true },
      { label: 'Custom plans', included: false },
      { label: 'Priority support', included: false },
    ],
    cta: 'Start free',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9.99',
    description: 'Unlimited plans + AI coach',
    popular: true,
    trial: '7-day trial',
    features: [
      { label: 'Workout library', included: true },
      { label: 'Daily streak', included: true },
      { label: 'Custom plans', included: true },
      { label: 'AI coach', included: true },
      { label: 'Priority support', included: false },
    ],
    cta: 'Try Pro free',
  },
  {
    id: 'team',
    name: 'Team',
    price: '$24',
    description: 'Up to 5 seats',
    features: [
      { label: 'Workout library', included: true },
      { label: 'Daily streak', included: true },
      { label: 'Custom plans', included: true },
      { label: 'AI coach', included: true },
      { label: 'Priority support', included: true },
    ],
    cta: 'Start team',
  },
]

const ANNUAL_PLANS = MONTHLY_PLANS.map((p) => ({
  ...p,
  price:
    p.id === 'starter' ? '$0' : p.id === 'pro' ? '$84' : '$199',
  period: p.id === 'starter' ? 'forever' : 'year',
}))

const SIMPLE_PLANS = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$12',
    description: 'Cancel anytime',
    features: [
      { label: 'Full library access', included: true },
      { label: 'Sync across devices', included: true },
      { label: 'Offline mode', included: true },
    ],
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '$96',
    description: 'Save 33% vs. monthly',
    popular: true,
    features: [
      { label: 'Full library access', included: true },
      { label: 'Sync across devices', included: true },
      { label: 'Offline mode', included: true },
      { label: 'Early features', included: true },
    ],
  },
]

export default function PricingTableShowcase() {
  const [plan, setPlan] = useState('pro')
  const [annual, setAnnual] = useState(false)
  const [twoPlan, setTwoPlan] = useState('yearly')
  const [submitted, setSubmitted] = useState<string | null>(null)

  const activePlans = annual ? ANNUAL_PLANS : MONTHLY_PLANS

  return (
    <ShowcaseFrame
      title="Pricing Table"
      description="Plan rows with active-plan feature list and billing toggle. Used in paywalls, settings → billing, and marketing pages."
      docPath="packages/ui-native/src/patterns/PricingTable.tsx"
    >
      <Section
        title="Three plans + billing toggle"
        hint={`${plan} (${annual ? 'annual' : 'monthly'})`}
      >
        <YStack
          padding="$3"
          borderRadius="$5"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
        >
          <PricingTable
            plans={activePlans}
            selectedPlan={plan}
            onSelectPlan={setPlan}
            annual={annual}
            onToggleBilling={setAnnual}
            onContinue={() => setSubmitted(plan)}
            reassurance="Cancel anytime — no questions asked."
          />
          {submitted ? (
            <SizableText size="$2" color="$green10" textAlign="center" paddingTop="$3">
              Continued with {submitted} ({annual ? 'annual' : 'monthly'})
            </SizableText>
          ) : null}
        </YStack>
      </Section>

      <Section title="Two plans — annual best-value" hint={`Selected: ${twoPlan}`}>
        <YStack
          padding="$3"
          borderRadius="$5"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
        >
          <PricingTable
            plans={SIMPLE_PLANS}
            selectedPlan={twoPlan}
            onSelectPlan={setTwoPlan}
            onContinue={() => {}}
            continueLabel="Subscribe"
            reassurance="7-day free trial. We will email a reminder before billing."
          />
        </YStack>
      </Section>

      <Section title="No continue button" hint="display-only">
        <YStack
          padding="$3"
          borderRadius="$5"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="$background"
        >
          <PricingTable plans={MONTHLY_PLANS} selectedPlan="pro" />
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
