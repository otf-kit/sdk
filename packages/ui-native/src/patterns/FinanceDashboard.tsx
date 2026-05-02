import type { ReactNode } from 'react'
import { SizableText, XStack, YStack } from 'tamagui'

export type FinanceMetric = {
  label: string
  value: string
  change?: string
}

export type FinanceQuickAction = {
  id: string
  label: string
  icon?: ReactNode
  onPress?: () => void
}

export type FinanceDashboardSection = {
  id?: string
  title: string
  rows: Array<{
    id: string
    title: string
    subtitle?: string
    value?: string
    leading?: ReactNode
  }>
}

export type FinanceDashboardProps = {
  title?: string
  balanceLabel?: string
  balance: string
  rangeLabel?: string
  metrics?: FinanceMetric[]
  quickActions?: FinanceQuickAction[]
  sections?: FinanceDashboardSection[]
  chartSlot?: ReactNode
  topRight?: ReactNode
}

export function FinanceDashboard({
  title = 'Overview',
  balanceLabel = 'Available balance',
  balance,
  rangeLabel,
  metrics = [],
  quickActions = [],
  sections = [],
  chartSlot,
  topRight,
}: FinanceDashboardProps) {
  return (
    <YStack flex={1} backgroundColor="$background" padding="$4" gap="$4">
      <XStack justifyContent="space-between" alignItems="center" paddingTop="$4">
        <YStack gap="$1">
          <SizableText size="$6" fontWeight="700">{title}</SizableText>
          {rangeLabel ? <SizableText size="$2" color="$color9">{rangeLabel}</SizableText> : null}
        </YStack>
        {topRight}
      </XStack>

      <YStack backgroundColor="$color1" borderRadius="$7" padding="$4" gap="$2" borderWidth={1} borderColor="$color4">
        <SizableText size="$3" color="$color10">{balanceLabel}</SizableText>
        <SizableText size="$11" fontWeight="800">{balance}</SizableText>
        {chartSlot ? <YStack marginTop="$2">{chartSlot}</YStack> : null}
      </YStack>

      {metrics.length > 0 ? (
        <XStack gap="$3" flexWrap="wrap">
          {metrics.map((metric) => (
            <YStack key={metric.label} flex={1} minWidth={120} backgroundColor="$color1" borderRadius="$6" padding="$3" gap="$1" borderWidth={1} borderColor="$color4">
              <SizableText size="$2" color="$color10">{metric.label}</SizableText>
              <SizableText size="$7" fontWeight="800">{metric.value}</SizableText>
              {metric.change ? <SizableText size="$2" color="$color9">{metric.change}</SizableText> : null}
            </YStack>
          ))}
        </XStack>
      ) : null}

      {quickActions.length > 0 ? (
        <XStack gap="$3" flexWrap="wrap">
          {quickActions.map((action) => (
            <YStack
              key={action.id}
              flex={1}
              minWidth={88}
              backgroundColor="$color1"
              borderRadius="$6"
              padding="$3"
              gap="$2"
              alignItems="center"
              justifyContent="center"
              borderWidth={1}
              borderColor="$color4"
              onPress={action.onPress}
            >
              <YStack width={36} height={36} borderRadius="$10" backgroundColor="$color3" alignItems="center" justifyContent="center">
                {action.icon ?? <SizableText size="$4">•</SizableText>}
              </YStack>
              <SizableText size="$2" textAlign="center">{action.label}</SizableText>
            </YStack>
          ))}
        </XStack>
      ) : null}

      <YStack gap="$3">
        {sections.map((section, index) => (
          <YStack key={section.id ?? `${section.title}-${index}`} backgroundColor="$color1" borderRadius="$6" borderWidth={1} borderColor="$color4" overflow="hidden">
            <XStack padding="$3" justifyContent="space-between" alignItems="center">
              <SizableText size="$4" fontWeight="700">{section.title}</SizableText>
            </XStack>
            <YStack>
              {section.rows.map((row, index) => (
                <XStack
                  key={row.id}
                  padding="$3"
                  gap="$3"
                  alignItems="center"
                  borderTopWidth={index === 0 ? 0 : 1}
                  borderTopColor="$color4"
                >
                  {row.leading ? (
                    <YStack width={32} height={32} borderRadius="$8" backgroundColor="$color3" alignItems="center" justifyContent="center">
                      {row.leading}
                    </YStack>
                  ) : null}
                  <YStack flex={1}>
                    <SizableText size="$3" fontWeight="600">{row.title}</SizableText>
                    {row.subtitle ? <SizableText size="$2" color="$color10">{row.subtitle}</SizableText> : null}
                  </YStack>
                  {row.value ? <SizableText size="$3" color="$color11">{row.value}</SizableText> : null}
                </XStack>
              ))}
            </YStack>
          </YStack>
        ))}
      </YStack>
    </YStack>
  )
}
