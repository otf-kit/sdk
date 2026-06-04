import { useState, useEffect, type ReactNode } from 'react'
import { Button, Circle, Image, SizableText, XStack, YStack, ScrollView } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'
import { Check, X, Zap } from '@tamagui/lucide-icons'

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
  /**
   * Full-bleed cinematic background photo (R2/CDN URL) behind the whole
   * paywall — RevenueCat / Superwall-style. A dual scrim is layered on top
   * automatically (light top for the close control, heavy bottom so the
   * plan rows + CTA stay crisp over any image) and all overlaid UI switches
   * to a legible glass-dark treatment regardless of the app theme.
   */
  backgroundImage?: string
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
      <Circle size={44} backgroundColor="$color9"
        shadowColor="$color9" shadowOpacity={0.35} shadowRadius={8} shadowOffset={{ width: 0, height: 4 }}>
        {f.icon ?? <Zap size={20} color="$color1" />}
      </Circle>
      <YStack flex={1} gap="$0.5">
        <SizableText size="$4" fontWeight="700" color={tone}>{f.title}</SizableText>
        {f.description ? <SizableText size="$2" color={muted}>{f.description}</SizableText> : null}
      </YStack>
    </XStack>
  )
}

function PlanRow({ plan, selected, onPress, onImage }: { plan: PlanOption; selected: boolean; onPress: () => void; onImage: boolean }) {
  // Over a photo, surfaces become translucent glass + text goes white so the
  // rows read crisply on any image regardless of the app's light/dark theme.
  const borderColor = selected ? '$color9' : onImage ? 'rgba(255,255,255,0.22)' : '$color5'
  const backgroundColor = onImage
    ? selected ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.07)'
    : selected ? '$color3' : '$color1'
  const radioBorder = selected ? '$color9' : onImage ? 'rgba(255,255,255,0.5)' : '$color7'
  const textColor = onImage ? 'white' : undefined
  const subColor = onImage ? 'rgba(255,255,255,0.72)' : '$color11'
  const pillBg = onImage ? 'rgba(74,222,128,0.18)' : '$green3'
  const pillText = onImage ? '#4ade80' : '$green9'
  const glow = selected
    ? { shadowColor: '$color9' as const, shadowOpacity: onImage ? 0.45 : 0.25, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } }
    : null
  return (
    <XStack width="100%" padding="$3" paddingHorizontal="$3.5" borderRadius="$5" borderWidth={2}
      borderColor={borderColor} backgroundColor={backgroundColor}
      pressStyle={{ scale: 0.98, opacity: 0.9 }} animation="quick" onPress={onPress}
      cursor="pointer" alignItems="center" gap="$3" position="relative" {...glow}>
      {plan.popular && (
        <YStack position="absolute" top={-10} right={12} backgroundColor="$color9" paddingHorizontal="$2" paddingVertical={2} borderRadius="$10">
          <SizableText size="$1" color="white" fontWeight="700">BEST VALUE</SizableText>
        </YStack>
      )}
      <Circle size={22} borderWidth={2} borderColor={radioBorder} backgroundColor={selected ? '$color9' : 'transparent'}>
        {selected && <Circle size={8} backgroundColor="white" />}
      </Circle>
      <YStack flex={1} gap="$0.5">
        <XStack gap="$2" alignItems="center">
          <SizableText size="$4" fontWeight="700" color={textColor}>{plan.name}</SizableText>
          {plan.trial && (
            <YStack backgroundColor={pillBg} paddingHorizontal="$1.5" paddingVertical={2} borderRadius="$10">
              <SizableText size="$1" color={pillText} fontWeight="700">{plan.trial}</SizableText>
            </YStack>
          )}
        </XStack>
        {plan.tagline ? <SizableText size="$2" color={subColor}>{plan.tagline}</SizableText> : null}
      </YStack>
      <YStack alignItems="flex-end" gap="$0.5">
        <XStack alignItems="baseline" gap="$1">
          <SizableText size="$5" fontWeight="800" color={textColor}>{plan.price}</SizableText>
          <SizableText size="$2" color={subColor}>/{plan.period}</SizableText>
        </XStack>
        {plan.savings && (
          <YStack backgroundColor={pillBg} paddingHorizontal="$1.5" paddingVertical={1} borderRadius="$10">
            <SizableText size="$1" color={pillText} fontWeight="700">{plan.savings}</SizableText>
          </YStack>
        )}
        {plan.pricePerWeek && <SizableText size="$1" color={subColor}>{plan.pricePerWeek}</SizableText>}
      </YStack>
    </XStack>
  )
}

function ComparisonIcon({ enabled }: { enabled?: boolean }) {
  return (
    <Circle size={24} backgroundColor={enabled ? '$green3' : '$color4'}>
      {enabled ? <Check size={16} color="$green10" /> : <X size={16} color="$color8" />}
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
          {t.meta ? <SizableText size="$1" color="$color11">{t.meta}</SizableText> : null}
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
        {c.meta ? <SizableText size="$3" color="$color11">{c.meta}</SizableText> : null}
      </YStack>
    </XStack>
  )
}

function TrustBadges({ badges }: { badges: { icon?: ReactNode; label: string }[] }) {
  return (
    <XStack justifyContent="center" gap="$4" paddingTop="$1">
      {badges.map((b, i) => (
        <YStack key={i} alignItems="center" gap="$1">
          <Circle size={32} backgroundColor="$color9">
            {b.icon ?? <Zap size={14} color="$color1" />}
          </Circle>
          <SizableText size="$1" color="$color11" textAlign="center">{b.label}</SizableText>
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
  backgroundImage,
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
  const onImage = !!backgroundImage
  const dark = variant === 'immersive-dark' || onImage
  const bg = dark ? '$color1' : '$background'
  const tone = onImage ? 'white' : dark ? '$color12' : '$color11'
  const muted = onImage ? 'rgba(255,255,255,0.72)' : '$color11'
  const linkColor = onImage ? 'rgba(255,255,255,0.65)' : '$color8'

  return (
    <YStack flex={1} backgroundColor={bg}>
      {/* Cinematic full-bleed background (RevenueCat / Superwall-style): the
          photo, then a dual scrim — a light top wash so the close control
          stays legible and a heavy bottom wash so the plan rows + CTA read
          crisply over any image. */}
      {onImage ? (
        <>
          <Image
            source={{ uri: backgroundImage }}
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            width="100%"
            height="100%"
            objectFit="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.55)', 'rgba(0,0,0,0.34)', 'rgba(0,0,0,0.68)', 'rgba(0,0,0,0.97)']}
            locations={[0, 0.4, 0.72, 1]}
            start={[0, 0]}
            end={[0, 1]}
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
          />
        </>
      ) : null}

      {onClose && (
        <XStack position="absolute" top="$4" right="$4" zIndex={10}>
          <Button
            size="$3"
            circular
            chromeless
            onPress={onClose}
            pressStyle={{ opacity: 0.6 }}
            {...(onImage ? { backgroundColor: 'rgba(0,0,0,0.35)' } : null)}
          >
            <X size={18} color={onImage ? 'white' : muted} />
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
                onImage={onImage}
              />
            ))}
          </YStack>
        </YStack>
      </ScrollView>

      <YStack position="absolute" bottom={0} left={0} right={0} padding="$4" paddingBottom="$6"
        backgroundColor={onImage ? 'transparent' : bg}
        borderTopWidth={onImage ? 0 : 1} borderTopColor="$color4" gap="$2.5">
        {/* Over a photo the footer fades up out of the scrim (instead of a hard
            bordered bar) so the CTA zone stays dark + crisp while the image
            still breathes above it. */}
        {onImage ? (
          <LinearGradient
            colors={['rgba(8,8,10,0)', 'rgba(8,8,10,0.92)', 'rgba(8,8,10,1)']}
            locations={[0, 0.24, 1]}
            start={[0, 0]}
            end={[0, 1]}
            position="absolute"
            top={-28}
            left={0}
            right={0}
            bottom={0}
          />
        ) : null}
        <Button size="$5" backgroundColor="$color9" color="$color1" onPress={onContinue}
          pressStyle={{ backgroundColor: '$color8', scale: 0.98 }} animation="quick" borderRadius="$10" fontWeight="700"
          shadowColor="$color9" shadowOpacity={onImage ? 0.5 : 0} shadowRadius={18} shadowOffset={{ width: 0, height: 6 }}>
          {continueLabel}
        </Button>
        {reassurance && <SizableText size="$2" color={muted} textAlign="center">{reassurance}</SizableText>}
        <XStack justifyContent="center" gap="$3">
          {onRestore && <SizableText size="$2" color={linkColor} onPress={onRestore} pressStyle={{ opacity: 0.6 }}>Restore</SizableText>}
          {onTerms && <SizableText size="$2" color={linkColor} onPress={onTerms} pressStyle={{ opacity: 0.6 }}>Terms</SizableText>}
          {onPrivacy && <SizableText size="$2" color={linkColor} onPress={onPrivacy} pressStyle={{ opacity: 0.6 }}>Privacy</SizableText>}
        </XStack>
        {trustBadges && trustBadges.length > 0 && <TrustBadges badges={trustBadges} />}
        {footerSlot}
      </YStack>
    </YStack>
  )
}
