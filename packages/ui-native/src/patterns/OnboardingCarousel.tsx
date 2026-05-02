import { useState } from 'react'
import { Button, SizableText, XStack, YStack, Circle } from 'tamagui'
import type { ReactNode } from 'react'

export type OnboardingVariant =
  | 'default'
  | 'calm-gradient'
  | 'card-tilt'
  | 'editorial'
  | 'selection-step'
  | 'permission-prompt'

export type OnboardingStep = {
  title: string
  description: string
  icon?: ReactNode
  hero?: ReactNode
  eyebrow?: string
  ctaLabel?: string
  background?: ReactNode
}

export type OnboardingCarouselProps = {
  steps: OnboardingStep[]
  variant?: OnboardingVariant
  brand?: ReactNode
  topLeading?: ReactNode
  onComplete?: () => void
  onSkip?: () => void
  completeLabel?: string
  skipLabel?: string
  nextLabel?: string
  footerSlot?: ReactNode
}

export function OnboardingCarousel({
  steps,
  variant = 'default',
  brand,
  topLeading,
  onComplete,
  onSkip,
  completeLabel = 'Get Started',
  skipLabel = 'Skip',
  nextLabel = 'Next',
  footerSlot,
}: OnboardingCarouselProps) {
  const [current, setCurrent] = useState(0)
  if (steps.length === 0) {
    return (
      <YStack flex={1} backgroundColor="$background" padding="$4" alignItems="center" justifyContent="center">
        <SizableText size="$5" color="$color10" textAlign="center">
          Add at least one onboarding step.
        </SizableText>
      </YStack>
    )
  }
  const isLast = current === steps.length - 1
  const step = steps[current]
  const hero = step?.hero ?? step?.icon
  const isEditorial = variant === 'editorial'
  const isSelection = variant === 'selection-step'
  const isPermission = variant === 'permission-prompt'
  const topPadding = isEditorial ? '$6' : '$4'
  const titleSize = isEditorial ? '$10' : '$9'
  const backgroundColor = variant === 'calm-gradient' ? '$color2' : '$background'
  const heroBackground = isPermission ? '$color3' : isSelection ? '$color1' : '$color2'
  const heroRadius = variant === 'card-tilt' || isSelection ? '$8' : '$10'
  const buttonTone = variant === 'editorial' ? '$color12' : '$color9'

  return (
    <YStack flex={1} backgroundColor={backgroundColor} padding="$4" justifyContent="space-between">
      {step?.background ? <YStack position="absolute" left={0} right={0} top={0} bottom={0}>{step.background}</YStack> : null}
      <XStack justifyContent="space-between" alignItems="center" paddingTop={topPadding}>
        <XStack minWidth={40}>
          {topLeading}
        </XStack>
        {brand ? <YStack alignItems="center" flex={1}>{brand}</YStack> : <YStack flex={1} />}
        {!isLast && onSkip && (
          <Button chromeless onPress={onSkip}>
            <SizableText size="$4" color="$color9">
              {skipLabel}
            </SizableText>
          </Button>
        )}
      </XStack>

      <YStack flex={1} alignItems="center" justifyContent="center" gap="$5" paddingHorizontal="$4">
        {hero ? (
          variant === 'card-tilt' || isSelection ? (
            <YStack
              width="100%"
              maxWidth={340}
              minHeight={260}
              borderRadius={heroRadius}
              backgroundColor={heroBackground}
              padding="$3"
              alignItems="center"
              justifyContent="center"
              borderWidth={variant === 'card-tilt' ? 3 : 1}
              borderColor="$color4"
              shadowColor="$shadowColor"
              shadowOpacity={0.14}
              shadowRadius={18}
              shadowOffset={{ width: 0, height: 10 }}
              style={variant === 'card-tilt' ? ({ transform: [{ rotate: '-5deg' }] } as any) : undefined}
            >
              {hero}
            </YStack>
          ) : (
            <Circle size={isPermission ? 140 : 120} backgroundColor={heroBackground} alignItems="center" justifyContent="center">
              {hero}
            </Circle>
          )
        ) : null}
        <YStack gap="$3" alignItems="center">
          {step?.eyebrow ? (
            <SizableText size="$2" color="$color9" fontWeight="700" textTransform="uppercase">
              {step.eyebrow}
            </SizableText>
          ) : null}
          <SizableText size={titleSize} fontWeight="700" textAlign="center">
            {step?.title}
          </SizableText>
          <SizableText size="$4" color="$color10" textAlign="center" maxWidth={300}>
            {step?.description}
          </SizableText>
        </YStack>
      </YStack>

      <YStack gap="$3" paddingBottom="$2">
        <XStack justifyContent="center" gap="$2">
          {steps.map((_, i) => (
            <Circle
              key={i}
              size={variant === 'card-tilt' ? 10 : 8}
              width={i === current && variant !== 'default' ? 24 : undefined}
              backgroundColor={i === current ? '$color9' : '$color4'}
              borderRadius="$10"
              animation="quick"
            />
          ))}
        </XStack>
        <Button
          size="$5"
          backgroundColor={buttonTone}
          color="$color1"
          borderRadius={variant === 'editorial' ? '$10' : '$5'}
          hoverStyle={{ backgroundColor: variant === 'editorial' ? '$color11' : '$color10' }}
          pressStyle={{ backgroundColor: '$color8' }}
          onPress={() => (isLast ? onComplete?.() : setCurrent((c) => c + 1))}
        >
          {isLast ? (step?.ctaLabel ?? completeLabel) : (step?.ctaLabel ?? nextLabel)}
        </Button>
        {footerSlot}
      </YStack>
    </YStack>
  )
}
