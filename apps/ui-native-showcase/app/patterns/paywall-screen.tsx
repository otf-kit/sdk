import { useState } from 'react'
import {
  PaywallScreen,
  YStack,
  Circle,
  Crown,
  Dumbbell,
  Zap,
  TrendingUp,
  Users,
  Lock,
  Shield,
  Award,
} from '@otfdashkit/ui-native'
import type { PlanOption, PaywallFeature, PaywallComparisonRow, PaywallTestimonial } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'
import { SCENES } from '../../lib/fixtures'

// Self-hosted R2 editorial photo for the cinematic immersive paywall.
const sceneImg = (id: string) => SCENES.find((s) => s.id === id)!.image

const PLANS: PlanOption[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$9.99',
    period: 'mo',
    tagline: 'Cancel anytime',
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '$59',
    period: 'yr',
    tagline: 'Best for committed athletes',
    pricePerWeek: '$1.13/wk',
    savings: 'SAVE 51%',
    popular: true,
    trial: '7-day trial',
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: '$199',
    period: 'once',
    tagline: 'One payment, forever',
  },
]

// Icons render white — the BenefitRow circle is filled with the accent
// ($color9), so a white glyph keeps them crisp (an accent glyph on an accent
// circle would vanish).
const FEATURES: PaywallFeature[] = [
  {
    title: 'Unlimited custom plans',
    description: 'Build any program — strength, hybrid, marathon prep.',
    icon: <Dumbbell size={20} color="white" />,
  },
  {
    title: 'AI form check',
    description: 'Upload a clip — get cues in seconds.',
    icon: <Zap size={20} color="white" />,
  },
  {
    title: 'Long-form analytics',
    description: 'Volume, rep targets, recovery score over time.',
    icon: <TrendingUp size={20} color="white" />,
  },
]

const COMPARISON: PaywallComparisonRow[] = [
  { label: 'Workout library', free: true, premium: true },
  { label: 'Daily streak tracking', free: true, premium: true },
  { label: 'Custom plan builder', free: false, premium: true },
  { label: 'AI form check', free: false, premium: true },
  { label: 'Long-form analytics', free: false, premium: true },
  { label: 'Priority support', free: false, premium: true },
]

const TESTIMONIALS: PaywallTestimonial[] = [
  {
    quote: 'The AI cues caught a knee-collapse pattern I had never noticed. Game changer.',
    author: 'Sarah Chen',
    meta: 'Powerlifter, 18 months',
  },
  {
    quote: 'Custom plans for marathon prep + strength side work — finally one app.',
    author: 'Alex Rivera',
    meta: 'Marathon-in-training',
  },
  {
    quote: 'Worth every penny just for the recovery score. Saved my last training block.',
    author: 'Jordan Kim',
    meta: 'Hybrid athlete',
  },
]

// White glyphs — the TrustBadges circle is filled with the accent ($color9),
// so an accent glyph on it would vanish (same trap as the feature icons).
const TRUST = [
  { icon: <Lock size={14} color="white" />, label: 'Encrypted' },
  { icon: <Shield size={14} color="white" />, label: 'Cancel anytime' },
  { icon: <Award size={14} color="white" />, label: '4.9 rating' },
]

function ScreenFrame({ children }: { children: React.ReactNode }) {
  return (
    <YStack
      height={680}
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius="$5"
      overflow="hidden"
      backgroundColor="$background"
    >
      {children}
    </YStack>
  )
}

const HERO = (
  <Circle size={88} backgroundColor="$color3" alignItems="center" justifyContent="center">
    <Crown size={42} color="$color9" />
  </Circle>
)

export default function PaywallScreenShowcase() {
  const [defaultPlan, setDefaultPlan] = useState('yearly')
  const [proofPlan, setProofPlan] = useState('yearly')
  const [comparePlan, setComparePlan] = useState('yearly')
  const [immersivePlan, setImmersivePlan] = useState('yearly')

  return (
    <ShowcaseFrame
      title="Paywall Screen"
      description="Subscription wall — hero + features + plan rows + sticky CTA. Five variants: default, social-proof, comparison, creator-sheet, immersive-dark."
      docPath="packages/ui-native/src/patterns/PaywallScreen.tsx"
    >
      <Section title="Immersive — cinematic background" hint="full-bleed R2 photo + dual scrim + glass plans (RevenueCat / Superwall tier)">
        <ScreenFrame>
          <PaywallScreen
            variant="immersive-dark"
            backgroundImage={sceneImg('coast')}
            eyebrow="OTF Premium"
            title="Go further"
            subtitle="Every plan, AI form checks, and long-form analytics — unlocked."
            features={FEATURES}
            plans={PLANS}
            selectedPlan={immersivePlan}
            onSelectPlan={setImmersivePlan}
            onContinue={() => {}}
            onClose={() => {}}
            onRestore={() => {}}
            onTerms={() => {}}
            onPrivacy={() => {}}
            continueLabel="Start 7-day trial"
            reassurance="No charge today · cancel anytime"
            trustBadges={TRUST}
          />
        </ScreenFrame>
      </Section>

      <Section title="Default — features + plans">
        <ScreenFrame>
          <PaywallScreen
            eyebrow="Premium"
            title="Train smarter"
            subtitle="Unlock the full toolkit for serious training."
            hero={HERO}
            features={FEATURES}
            plans={PLANS}
            selectedPlan={defaultPlan}
            onSelectPlan={setDefaultPlan}
            onContinue={() => {}}
            onClose={() => {}}
            onRestore={() => {}}
            onTerms={() => {}}
            onPrivacy={() => {}}
            continueLabel="Start 7-day trial"
            reassurance="No charge today. We will email a reminder before billing."
            trustBadges={TRUST}
          />
        </ScreenFrame>
      </Section>

      <Section title="Social proof" hint="testimonial carousel above plans">
        <ScreenFrame>
          <PaywallScreen
            variant="social-proof"
            badge="124k+ ATHLETES"
            title="Join the team"
            subtitle="See what members are doing differently"
            hero={
              <Circle size={72} backgroundColor="$color9" alignItems="center" justifyContent="center"
                shadowColor="$color9" shadowOpacity={0.4} shadowRadius={16} shadowOffset={{ width: 0, height: 8 }}>
                <Users size={36} color="white" />
              </Circle>
            }
            features={FEATURES.slice(0, 2)}
            testimonials={TESTIMONIALS}
            socialProof="4.9 average rating · 18,000 reviews"
            plans={PLANS}
            selectedPlan={proofPlan}
            onSelectPlan={setProofPlan}
            onContinue={() => {}}
            onClose={() => {}}
            continueLabel="Start free trial"
            reassurance="Cancel anytime"
          />
        </ScreenFrame>
      </Section>

      <Section title="Comparison" hint="free vs. premium feature matrix">
        <ScreenFrame>
          <PaywallScreen
            variant="comparison"
            eyebrow="Upgrade"
            title="Free vs. Premium"
            subtitle="Side-by-side, so you know what you get."
            comparisonRows={COMPARISON}
            plans={PLANS}
            selectedPlan={comparePlan}
            onSelectPlan={setComparePlan}
            onContinue={() => {}}
            onClose={() => {}}
            onRestore={() => {}}
            continueLabel="Upgrade now"
            reassurance="7-day free trial — cancel anytime"
          />
        </ScreenFrame>
      </Section>

      <Section title="Countdown urgency" hint="limited-time offer">
        <ScreenFrame>
          <PaywallScreen
            badge="LIMITED OFFER"
            eyebrow="Premium"
            title="51% off your first year"
            subtitle="Sale ends today — grandfathered for life."
            hero={HERO}
            features={FEATURES}
            countdownMinutes={59}
            plans={PLANS}
            selectedPlan="yearly"
            onSelectPlan={() => {}}
            onContinue={() => {}}
            onClose={() => {}}
            continueLabel="Claim discount"
            reassurance="One-time price lock"
          />
        </ScreenFrame>
      </Section>
    </ShowcaseFrame>
  )
}
