import { Circle, SizableText, XStack, YStack } from 'tamagui'
import { Check } from '@tamagui/lucide-icons'

export type ProgressStepsProps = { steps: string[]; currentStep: number; variant?: 'dots' | 'bar' | 'numbered' }

export function ProgressSteps({ steps, currentStep, variant = 'dots' }: ProgressStepsProps) {
  if (variant === 'bar') {
    const progress = steps.length > 1 ? (currentStep / (steps.length - 1)) * 100 : 100
    return (
      <YStack gap="$2">
        <YStack height={4} backgroundColor="$color4" borderRadius={2} overflow="hidden">
          <YStack height={4} width={`${progress}%`} backgroundColor="$color9" borderRadius={2} animation="quick" />
        </YStack>
        <XStack justifyContent="space-between">
          {steps.map((label, i) => <SizableText key={i} size="$2" fontWeight={i === currentStep ? '600' : '400'} color={i <= currentStep ? '$color11' : '$color8'}>{label}</SizableText>)}
        </XStack>
      </YStack>
    )
  }
  return (
    <XStack alignItems="center" justifyContent="center" gap="$0">
      {steps.map((label, i) => (
        <XStack key={i} alignItems="center" gap="$0">
          <YStack alignItems="center" gap="$1.5">
            <Circle size={variant === 'numbered' ? 28 : 10} backgroundColor={i <= currentStep ? '$color9' : '$color4'} animation="quick">
              {variant === 'numbered' &&
                (i < currentStep ? (
                  // Completed steps show a check; current/upcoming show the number.
                  <Check size={14} color="$color1" />
                ) : (
                  <SizableText size="$2" fontWeight="600" color={i === currentStep ? '$color1' : '$color8'}>
                    {i + 1}
                  </SizableText>
                ))}
            </Circle>
            <SizableText size="$1" color={i <= currentStep ? '$color11' : '$color8'} numberOfLines={1}>{label}</SizableText>
          </YStack>
          {i < steps.length - 1 && <YStack height={2} width={32} backgroundColor={i < currentStep ? '$color9' : '$color4'} marginBottom="$4" />}
        </XStack>
      ))}
    </XStack>
  )
}
