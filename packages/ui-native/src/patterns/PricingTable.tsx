import { Button, Circle, SizableText, XStack, YStack } from 'tamagui'
import { Check, Minus } from '@tamagui/lucide-icons'

export type PricingPlan = {
  id: string
  name: string
  price: string
  period?: string
  description?: string
  features: { label: string; included: boolean }[]
  popular?: boolean
  cta?: string
  trial?: string
}

export type PricingTableProps = {
  plans: PricingPlan[]
  selectedPlan?: string
  onSelectPlan?: (planId: string) => void
  annual?: boolean
  onToggleBilling?: (annual: boolean) => void
  onContinue?: () => void
  continueLabel?: string
  reassurance?: string
}

function BillingToggle({ annual, onToggle }: { annual: boolean; onToggle: (v: boolean) => void }) {
  return (
    <XStack alignSelf="center" backgroundColor="$color3" borderRadius="$10" padding="$1" gap="$0.5">
      {(['Monthly', 'Annual'] as const).map((label, i) => {
        const active = i === 1 ? annual : !annual
        return (
          <XStack
            key={label}
            paddingHorizontal="$4"
            paddingVertical="$2"
            borderRadius="$10"
            backgroundColor={active ? '$color9' : 'transparent'}
            onPress={() => onToggle(i === 1)}
            pressStyle={{ opacity: 0.8 }}
            animation="quick"
          >
            <SizableText size="$3" fontWeight="600" color={active ? '$color1' : '$color11'}>{label}</SizableText>
          </XStack>
        )
      })}
    </XStack>
  )
}

function PlanRow({ plan, selected, onSelect }: { plan: PricingPlan; selected: boolean; onSelect: () => void }) {
  return (
    <XStack
      padding="$4"
      borderRadius="$6"
      borderWidth={2}
      borderColor={selected ? '$color9' : '$color4'}
      backgroundColor={selected ? '$color2' : '$color1'}
      alignItems="center"
      gap="$3"
      onPress={onSelect}
      pressStyle={{ scale: 0.98, opacity: 0.9 }}
      animation="quick"
      cursor="pointer"
      position="relative"
    >
      {plan.popular && (
        <XStack position="absolute" top={-10} right={12} backgroundColor="$color9" paddingHorizontal="$2.5" paddingVertical={2} borderRadius="$10">
          <SizableText size="$1" fontWeight="700" color="$color1">BEST VALUE</SizableText>
        </XStack>
      )}
      <Circle
        size={22}
        borderWidth={2}
        borderColor={selected ? '$color9' : '$color6'}
        backgroundColor={selected ? '$color9' : 'transparent'}
      >
        {selected && <Circle size={8} backgroundColor="$color1" />}
      </Circle>
      <YStack flex={1} gap="$0.5">
        <XStack alignItems="center" gap="$2">
          <SizableText size="$5" fontWeight="700">{plan.name}</SizableText>
          {plan.trial && (
            <XStack backgroundColor="$green3" paddingHorizontal="$2" paddingVertical={2} borderRadius="$10">
              <SizableText size="$1" fontWeight="700" color="$green9">{plan.trial}</SizableText>
            </XStack>
          )}
        </XStack>
        {plan.description && <SizableText size="$2" color="$color11">{plan.description}</SizableText>}
      </YStack>
      <SizableText size="$5" fontWeight="800">{plan.price}</SizableText>
    </XStack>
  )
}

function FeatureList({ features }: { features: { label: string; included: boolean }[] }) {
  return (
    <YStack gap="$2.5" paddingHorizontal="$1">
      {features.map((f, i) => (
        <XStack key={i} gap="$2.5" alignItems="center">
          <Circle size={20} backgroundColor={f.included ? '$green3' : '$color3'}>
            {f.included ? <Check size={16} color="$green10" /> : <Minus size={16} color="$color7" />}
          </Circle>
          <SizableText size="$3" color={f.included ? '$color11' : '$color8'} flex={1}>{f.label}</SizableText>
        </XStack>
      ))}
    </YStack>
  )
}

export function PricingTable({ plans, selectedPlan, onSelectPlan, annual = false, onToggleBilling, onContinue, continueLabel, reassurance }: PricingTableProps) {
  const selected = selectedPlan ?? plans.find((p) => p.popular)?.id ?? plans[0]?.id
  const activePlan = plans.find((p) => p.id === selected)
  return (
    <YStack gap="$4">
      {onToggleBilling && <BillingToggle annual={annual} onToggle={onToggleBilling} />}

      {activePlan && activePlan.features.length > 0 && (
        <YStack backgroundColor="$color1" borderRadius="$6" padding="$4" gap="$3" borderWidth={1} borderColor="$color4">
          <FeatureList features={activePlan.features} />
        </YStack>
      )}

      <YStack gap="$3">
        {plans.map((plan) => (
          <PlanRow
            key={plan.id}
            plan={plan}
            selected={selected === plan.id}
            onSelect={() => onSelectPlan?.(plan.id)}
          />
        ))}
      </YStack>

      {reassurance && <SizableText size="$2" color="$color11" textAlign="center">{reassurance}</SizableText>}

      {onContinue && (
        <Button
          size="$5"
          backgroundColor="$color9"
          color="$color1"
          borderRadius="$10"
          fontWeight="700"
          onPress={onContinue}
          pressStyle={{ scale: 0.97, backgroundColor: '$color8' }}
          animation="quick"
        >
          {continueLabel ?? activePlan?.cta ?? 'Get Started'}
        </Button>
      )}
    </YStack>
  )
}
