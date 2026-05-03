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
} from '@otf/ui-native'
import type { OnboardingStep } from '@otf/ui-native'
import { Section } from '../../components/ShowcaseFrame'
import { DocsPage } from '../../components/DocsPage'
import type { ComponentMeta } from '../../components/types'

export const meta: ComponentMeta = {
  name: 'Onboarding Carousel',
  slug: 'onboarding-carousel',
  category: 'Patterns',
  description:
    'Multi-step intro with progress dots and primary CTA. Six variants — default, calm-gradient, card-tilt, editorial, selection-step, permission-prompt — all share a single steps[] data shape.',
  tags: ['onboarding', 'carousel', 'tour', 'intro'],
  exports: ['OnboardingCarousel', 'type OnboardingStep'],
  usage: `import { OnboardingCarousel } from '@otf/ui-native'
import type { OnboardingStep } from '@otf/ui-native'

const STEPS: OnboardingStep[] = [
  { title: 'Track your training', description: 'Log workouts in seconds.' },
  { title: 'Hit your goals',      description: 'Pick a target and we adapt.' },
  { title: 'See your streak',     description: 'Daily check-ins build the chart.' },
]

export default function Onboarding() {
  return (
    <OnboardingCarousel
      steps={STEPS}
      onSkip={() => {}}
      onComplete={() => {}}
    />
  )
}`,
  props: [
    { name: 'steps',         type: 'OnboardingStep[]',                                                                  required: true,  description: 'Slides to show. Each step accepts title, description, optional eyebrow, icon, and hero ReactNode.' },
    { name: 'onComplete',    type: '() => void',                                                                        required: true,  description: 'Fired when the user advances past the last step.' },
    { name: 'onSkip',        type: '() => void',                                                                        required: false, description: 'When provided, renders a top-right Skip link. Omit to hide.' },
    { name: 'variant',       type: "'default' | 'calm-gradient' | 'card-tilt' | 'editorial' | 'selection-step' | 'permission-prompt'", default: "'default'", required: false, description: 'Visual treatment. Default is the apple-fitness-flavored solid hero; other variants change typography + backdrop.' },
    { name: 'completeLabel', type: 'string',                                                                            default: "'Continue'", required: false, description: 'Label for the final-step CTA. Earlier steps always read "Next".' },
    { name: 'skipLabel',     type: 'string',                                                                            default: "'Skip'", required: false, description: 'Label for the top-right skip link.' },
    { name: 'initialIndex',  type: 'number',                                                                            default: '0',     required: false, description: 'Step index to start on. Useful for resuming a paused onboarding.' },
  ],
  docPath: 'packages/ui-native/src/patterns/OnboardingCarousel.tsx',
}

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
    <DocsPage meta={meta}>
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
    </DocsPage>
  )
}
