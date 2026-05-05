import {
  OnboardingCarousel,
  YStack,
  Circle,
  Activity,
  Target,
  Heart,
  Bell,
  Lock,
  Sparkles,
  TrendingUp,
} from '@otfdashkit/ui-native'
import type { OnboardingStep } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

const DEFAULT_STEPS: OnboardingStep[] = [
  {
    title: 'Track your training',
    description: 'Log workouts in seconds. We will keep score so you can stay focused.',
    icon: <Activity size={48} color="$color9" />,
  },
  {
    title: 'Hit your goals',
    description: 'Pick a target — strength, endurance, or recovery. We will adapt the plan.',
    icon: <Target size={48} color="$color9" />,
  },
  {
    title: 'See your streak',
    description: 'Daily check-ins build the chart. Skip a day, the chart pauses — no guilt.',
    icon: <TrendingUp size={48} color="$color9" />,
  },
]

const CALM_STEPS: OnboardingStep[] = [
  {
    eyebrow: 'Welcome',
    title: 'A quieter way to train',
    description: 'No streaks shouting at you. Just gentle nudges and honest progress.',
    icon: <Heart size={56} color="$pink9" />,
  },
  {
    eyebrow: 'Daily',
    title: 'One small habit',
    description: 'Five minutes of movement. The rest follows.',
    icon: <Sparkles size={56} color="$pink9" />,
  },
  {
    eyebrow: 'Always',
    title: 'Your data, your pace',
    description: 'Pause anytime. Your progress is yours, even if you take a break.',
    icon: <Lock size={56} color="$pink9" />,
  },
]

const TILT_STEPS: OnboardingStep[] = [
  {
    eyebrow: 'Step 01',
    title: 'Pick a plan',
    description: 'Three options — beginner, intermediate, advanced.',
    hero: (
      <YStack alignItems="center" gap="$2">
        <Circle size={88} backgroundColor="$color9" alignItems="center" justifyContent="center">
          <Target size={40} color="white" />
        </Circle>
      </YStack>
    ),
  },
  {
    eyebrow: 'Step 02',
    title: 'Set a window',
    description: 'Morning, lunch, or evening — we will time the reminders.',
    hero: (
      <YStack alignItems="center" gap="$2">
        <Circle size={88} backgroundColor="$color9" alignItems="center" justifyContent="center">
          <Bell size={40} color="white" />
        </Circle>
      </YStack>
    ),
  },
  {
    eyebrow: 'Step 03',
    title: 'Start your streak',
    description: 'Done. The first session is loaded and ready when you are.',
    hero: (
      <YStack alignItems="center" gap="$2">
        <Circle size={88} backgroundColor="$color9" alignItems="center" justifyContent="center">
          <Sparkles size={40} color="white" />
        </Circle>
      </YStack>
    ),
  },
]

function ScreenFrame({ children }: { children: React.ReactNode }) {
  return (
    <YStack
      height={620}
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

export default function OnboardingCarouselShowcase() {
  return (
    <ShowcaseFrame
      title="Onboarding Carousel"
      description="Multi-step intro with progress dots and primary CTA. Six variants — default, calm-gradient, card-tilt, editorial, selection-step, permission-prompt."
      docPath="packages/ui-native/src/patterns/OnboardingCarousel.tsx"
    >
      <Section title="Default" hint="circular hero, centered title">
        <ScreenFrame>
          <OnboardingCarousel
            steps={DEFAULT_STEPS}
            onSkip={() => {}}
            onComplete={() => {}}
          />
        </ScreenFrame>
      </Section>

      <Section title="Calm gradient" hint="muted backdrop, gentle tone">
        <ScreenFrame>
          <OnboardingCarousel
            variant="calm-gradient"
            steps={CALM_STEPS}
            onSkip={() => {}}
            onComplete={() => {}}
            completeLabel="Begin"
          />
        </ScreenFrame>
      </Section>

      <Section title="Card tilt" hint="rotated card hero — premium feel">
        <ScreenFrame>
          <OnboardingCarousel
            variant="card-tilt"
            steps={TILT_STEPS}
            onSkip={() => {}}
            onComplete={() => {}}
            completeLabel="Start"
          />
        </ScreenFrame>
      </Section>

      <Section title="Editorial" hint="oversized typography + pill CTA">
        <ScreenFrame>
          <OnboardingCarousel
            variant="editorial"
            steps={[
              {
                eyebrow: 'Day 01',
                title: 'Show up',
                description: 'The first session is the hardest. The next gets easier.',
                icon: <Activity size={56} color="$color12" />,
              },
              {
                eyebrow: 'Day 07',
                title: 'Build a streak',
                description: 'Seven days in. Your body has begun to adapt.',
                icon: <TrendingUp size={56} color="$color12" />,
              },
            ]}
            onSkip={() => {}}
            onComplete={() => {}}
            completeLabel="Start training"
          />
        </ScreenFrame>
      </Section>

      <Section title="Single step — permission prompt" hint="no skip, just CTA">
        <ScreenFrame>
          <OnboardingCarousel
            variant="permission-prompt"
            steps={[
              {
                title: 'Enable notifications',
                description: 'We will only ping you when a session is starting — never marketing.',
                icon: <Bell size={56} color="$color9" />,
              },
            ]}
            onComplete={() => {}}
            completeLabel="Allow notifications"
          />
        </ScreenFrame>
      </Section>
    </ShowcaseFrame>
  )
}
