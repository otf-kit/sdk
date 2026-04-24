import { useState, useEffect, type ReactNode } from 'react'
import { Button, Circle, SizableText, XStack, YStack, ScrollView } from 'tamagui'

export type PlanOption = {
  id: string
  name: string
  price: string
  period: string
  tagline?: string
  pricePerWeek?: string
  savings?: string
  popular?: boolean
  trial?: string
  features?: string[]
}

export type PaywallVariant =
  | 'default'
  | 'social-proof'
  | 'comparison'
  | 'creator-sheet'
  | 'immersive-dark'

export type PaywallFeature =
  | string
  | {
      title: string
      description?: string
      icon?: ReactNode
    }

export type PaywallComparisonRow = {
  label: string
  free?: boolean
  premium?: boolean
}

export type PaywallTestimonial = {
  quote: string
  author: string
  meta?: string
}

export type PaywallCreator = {
  name: string
  meta?: string
  avatar?: ReactNode
}

export type PaywallScreenProps = {
  variant?: PaywallVariant
  eyebrow?: string
  title?: string
  subtitle?: string
  features?: PaywallFeature[]
  plans: PlanOption[]
  selectedPlan?: string
  onSelectPlan?: (planId: string) => void
  onContinue?: () => void
  onClose?: () => void
  onRestore?: () => void
  onTerms?: () => void
  onPrivacy?: () => void
  continueLabel?: string
  reassurance?: string
  hero?: ReactNode
  socialProof?: string
  countdownMinutes?: number
  badge?: string
  comparisonRows?: PaywallComparisonRow[]
  testimonials?: PaywallTestimonial[]
  creator?: PaywallCreator
  topSlot?: ReactNode
  footerSlot?: ReactNode
  trustBadges?: { icon?: ReactNode; label: string }[]
}

function useCountdown(minutes?: number) {
  const [seconds, setSeconds] = useState((minutes ?? 0) * 60)
  useEffect(() => {
    if (!minutes) return
    setSeconds(minutes * 60)
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [minutes])
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  return { display: `${mm}:${ss}`, expired: seconds <= 0 }
}

function normalizeFeature(f: PaywallFeature) {
  return typeof f === 'string' ? { title: f } : f
}

function BenefitRow({ feature, tone, muted }: { feature: PaywallFeature; tone: string; muted: string }) {
  const f = normalizeFeature(feature)
  return (
    <XStack gap="$3" alignItems="center">
      <Circle size={40} backgroundColor="$color3">{f.icon ?? <SizableText size="$5" color="$color9">✦</SizableText>}</Circle>
      <YStack flex={1} gap="$0.5">
        <SizableText size="$4" fontWeight="700" color={tone}>{f.title}</SizableText>
        {f.description ? <SizableText size="$2" color={muted}>{f.description}</SizableText> : null}
      </YStack>
    </XStack>
  )
}

function PlanRow({ plan, selected, onPress }: { plan: PlanOption; selected: boolean; onPress: () => void }) {
  return (
    <XStack width="100%" padding="$3" paddingHorizontal="$3.5" borderRadius="$5" borderWidth={2}
      borderColor={selected ? '$color9' : '$color5'} backgroundColor={selected ? '$color3' : '$color1'}
      pressStyle={{ scale: 0.98, opacity: 0.9 }} animation="quick" onPress={onPress}
      cursor="pointer" alignItems="center" gap="$3" position="relative">
      {plan.popular && (
        <YStack position="absolute" top={-10} right={12} backgroundColor="$color9" paddingHorizontal="$2" paddingVertical={2} borderRadius="$10">
          <SizableText size="$1" color="white" fontWeight="700">BEST VALUE</SizableText>
        </YStack>
      )}
      <Circle size={22} borderWidth={2} borderColor={selected ? '$color9' : '$color7'} backgroundColor={selected ? '$color9' : 'transparent'}>
        {selected && <Circle size={8} backgroundColor="white" />}
      </Circle>
      <YStack flex={1} gap="$0.5">
        <XStack gap="$2" alignItems="center">
          <SizableText size="$4" fontWeight="700">{plan.name}</SizableText>
          {plan.trial && (
            <YStack backgroundColor="$green3" paddingHorizontal="$1.5" paddingVertical={2} borderRadius="$10">
              <SizableText size="$1" color="$green9" fontWeight="700">{plan.trial}</SizableText>
            </YStack>
          )}
        </XStack>
        {plan.tagline ? <SizableText size="$2" color="$color10">{plan.tagline}</SizableText> : null}
      </YStack>
      <YStack alignItems="flex-end" gap="$0.5">
        <XStack alignItems="baseline" gap="$1">
          <SizableText size="$5" fontWeight="800">{plan.price}</SizableText>
          <SizableText size="$2" color="$color10">/{plan.period}</SizableText>
        </XStack>
        {plan.savings && (
          <YStack backgroundColor="$green3" paddingHorizontal="$1.5" paddingVertical={1} borderRadius="$10">
            <SizableText size="$1" color="$green9" fontWeight="700">{plan.savings}</SizableText>
          </YStack>
        )}
        {plan.pricePerWeek && <SizableText size="$1" color="$color10">{plan.pricePerWeek}</SizableText>}
      </YStack>
    </XStack>
  )
}

function ComparisonIcon({ enabled }: { enabled?: boolean }) {
  return (
    <Circle size={24} backgroundColor={enabled ? '$green3' : '$color4'}>
      <SizableText size="$2" color={enabled ? '$green10' : '$color8'} fontWeight="700">
        {enabled ? '✓' : '✕'}
      </SizableText>
    </Circle>
  )
}

function TestimonialCard({ t }: { t: PaywallTestimonial }) {
  return (
    <YStack minWidth={240} backgroundColor="$color2" borderRadius="$6" padding="$3.5" gap="$2.5">
      <SizableText size="$3" color="$color11" fontStyle="italic">&ldquo;{t.quote}&rdquo;</SizableText>
      <XStack gap="$2" alignItems="center">
        <Circle size={32} backgroundColor="$color5"><SizableText size="$2" fontWeight="700">{t.author[0]}</SizableText></Circle>
        <YStack>
          <SizableText size="$2" fontWeight="700">{t.author}</SizableText>
          {t.meta ? <SizableText size="$1" color="$color10">{t.meta}</SizableText> : null}
        </YStack>
      </XStack>
    </YStack>
  )
}

function CreatorHeader({ c }: { c: PaywallCreator }) {
  return (
    <XStack alignItems="center" justifyContent="center" gap="$3">
      {c.avatar && <Circle size={72} overflow="hidden" backgroundColor="$color3">{c.avatar}</Circle>}
      <YStack alignItems="center" gap="$1">
        <SizableText size="$6" fontWeight="800">{c.name}</SizableText>
        {c.meta ? <SizableText size="$3" color="$color10">{c.meta}</SizableText> : null}
      </YStack>
    </XStack>
  )
}

function TrustBadges({ badges }: { badges: { icon?: ReactNode; label: string }[] }) {
  return (
    <XStack justifyContent="center" gap="$4" paddingTop="$1">
      {badges.map((b, i) => (
        <YStack key={i} alignItems="center" gap="$1">
          <Circle size={28} backgroundColor="$color3">
            {b.icon ?? <SizableText size="$2" color="$color9">✦</SizableText>}
          </Circle>
          <SizableText size="$1" color="$color10" textAlign="center">{b.label}</SizableText>
        </YStack>
      ))}
    </XStack>
  )
}

export function PaywallScreen({
  variant = 'default',
  eyebrow,
  title = 'Unlock Premium',
  subtitle,
  features = [],
  plans,
  selectedPlan,
  onSelectPlan,
  onContinue,
  onClose,
  onRestore,
  onTerms,
  onPrivacy,
  continueLabel = 'Continue',
  reassurance = 'Cancel anytime',
  hero,
  socialProof,
  countdownMinutes,
  badge,
  comparisonRows = [],
  testimonials = [],
  creator,
  topSlot,
  footerSlot,
  trustBadges,
}: PaywallScreenProps) {
  const selected = selectedPlan ?? plans.find((p) => p.popular)?.id ?? plans[0]?.id
  const countdown = useCountdown(countdownMinutes)
  const dark = variant === 'immersive-dark'
  const bg = dark ? '$color1' : '$background'
  const tone = dark ? '$color12' : '$color11'
  const muted = '$color10'

  return (
    <YStack flex={1} backgroundColor={bg}>
      {onClose && (
        <XStack position="absolute" top="$4" right="$4" zIndex={10}>
          <Button size="$3" circular chromeless onPress={onClose} pressStyle={{ opacity: 0.6 }}>
            <SizableText size="$5" color={muted}>✕</SizableText>
          </Button>
        </XStack>
      )}

      <ScrollView flex={1} contentContainerStyle={{ paddingBottom: 240 }}>
        <YStack paddingHorizontal="$5" paddingTop="$8" gap="$5">
          {topSlot}

          {creator && variant === 'creator-sheet' ? <CreatorHeader c={creator} /> : null}

          {hero && <YStack alignItems="center" paddingVertical="$3">{hero}</YStack>}

          {badge && (
            <XStack justifyContent="center">
              <YStack backgroundColor="$color9" paddingHorizontal="$3" paddingVertical="$1" borderRadius="$10">
                <SizableText size="$2" color="white" fontWeight="700">{badge}</SizableText>
              </YStack>
            </XStack>
          )}

          <YStack gap="$1.5" alignItems="center">
            {eyebrow ? <SizableText size="$2" fontWeight="700" color="$color9" textTransform="uppercase">{eyebrow}</SizableText> : null}
            <SizableText size="$9" fontWeight="800" textAlign="center" color={tone}>{title}</SizableText>
            {subtitle && <SizableText size="$4" color={muted} textAlign="center">{subtitle}</SizableText>}
            {socialProof && <SizableText size="$3" color="$color9" fontWeight="600" textAlign="center" paddingTop="$1">{socialProof}</SizableText>}
          </YStack>

          {countdownMinutes && !countdown.expired ? (
            <XStack justifyContent="center" padding="$2" backgroundColor="$red3" borderRadius="$4" alignSelf="center" paddingHorizontal="$4" gap="$2" alignItems="center">
              <SizableText size="$2" color="$red9" fontWeight="600">Offer ends in</SizableText>
              <SizableText size="$5" color="$red9" fontWeight="800" fontFamily="$mono">{countdown.display}</SizableText>
            </XStack>
          ) : null}

          {features.length > 0 && (
            <YStack gap="$3.5">
              {features.map((feature, i) => (
                <BenefitRow key={i} feature={feature} tone={tone} muted={muted} />
              ))}
            </YStack>
          )}

          {variant === 'social-proof' && testimonials.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <XStack gap="$3" paddingRight="$4">
                {testimonials.map((t, i) => (
                  <TestimonialCard key={`${t.author}-${i}`} t={t} />
                ))}
              </XStack>
            </ScrollView>
          ) : null}

          {variant === 'comparison' && comparisonRows.length > 0 ? (
            <YStack backgroundColor={dark ? '$color2' : '$color1'} borderRadius="$6" padding="$3.5" gap="$2" borderWidth={1} borderColor="$color4">
              <XStack alignItems="center">
                <SizableText flex={1} size="$2" fontWeight="700" color={muted}>Feature</SizableText>
                <SizableText width={64} size="$2" fontWeight="700" textAlign="center" color={muted}>Free</SizableText>
                <SizableText width={84} size="$2" fontWeight="700" textAlign="center" color="$color9">Premium</SizableText>
              </XStack>
              {comparisonRows.map((row) => (
                <XStack key={row.label} alignItems="center" paddingVertical="$1.5">
                  <SizableText flex={1} size="$3" color={tone}>{row.label}</SizableText>
                  <XStack width={64} justifyContent="center"><ComparisonIcon enabled={row.free} /></XStack>
                  <XStack width={84} justifyContent="center"><ComparisonIcon enabled={row.premium} /></XStack>
                </XStack>
              ))}
            </YStack>
          ) : null}

          <YStack gap="$3">
            {plans.map((plan) => (
              <PlanRow
                key={plan.id}
                plan={plan}
                selected={selected === plan.id}
                onPress={() => onSelectPlan?.(plan.id)}
              />
            ))}
          </YStack>
        </YStack>
      </ScrollView>

      <YStack position="absolute" bottom={0} left={0} right={0} padding="$4" paddingBottom="$6"
        backgroundColor={bg} borderTopWidth={1} borderTopColor="$color4" gap="$2.5">
        <Button size="$5" backgroundColor="$color9" color="$color1" onPress={onContinue}
          pressStyle={{ backgroundColor: '$color8', scale: 0.98 }} animation="quick" borderRadius="$10" fontWeight="700">
          {continueLabel}
        </Button>
        {reassurance && <SizableText size="$2" color="$color9" textAlign="center">{reassurance}</SizableText>}
        <XStack justifyContent="center" gap="$3">
          {onRestore && <SizableText size="$2" color="$color8" onPress={onRestore} pressStyle={{ opacity: 0.6 }}>Restore</SizableText>}
          {onTerms && <SizableText size="$2" color="$color8" onPress={onTerms} pressStyle={{ opacity: 0.6 }}>Terms</SizableText>}
          {onPrivacy && <SizableText size="$2" color="$color8" onPress={onPrivacy} pressStyle={{ opacity: 0.6 }}>Privacy</SizableText>}
        </XStack>
        {trustBadges && trustBadges.length > 0 && <TrustBadges badges={trustBadges} />}
        {footerSlot}
      </YStack>
    </YStack>
  )
}
