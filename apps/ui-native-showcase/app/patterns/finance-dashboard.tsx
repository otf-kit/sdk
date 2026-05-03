import {
  FinanceDashboard,
  YStack,
  SizableText,
  ArrowUpRight,
  ArrowDownLeft,
  Repeat,
  Plus,
  Coffee,
  ShoppingBag,
  Zap,
  Briefcase,
  Music,
  Bell,
  type FinanceMetric,
  type FinanceQuickAction,
  type FinanceDashboardSection,
} from '@otf/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

function FrameBox({ children }: { children: React.ReactNode }) {
  return (
    <YStack
      height={500}
      overflow="hidden"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
    >
      {children}
    </YStack>
  )
}

function MiniChart() {
  const points = [40, 55, 38, 72, 60, 82, 76, 90]
  const max = Math.max(...points)
  return (
    <YStack flexDirection="row" alignItems="flex-end" gap="$1.5" height={48}>
      {points.map((p, i) => (
        <YStack
          key={i}
          flex={1}
          height={`${(p / max) * 100}%`}
          backgroundColor="$color9"
          borderRadius={2}
          opacity={0.4 + (i / points.length) * 0.6}
        />
      ))}
    </YStack>
  )
}

const METRICS: FinanceMetric[] = [
  { label: 'Income', value: '$4,820', change: '+12% MoM' },
  { label: 'Spending', value: '$2,134', change: '-4% MoM' },
  { label: 'Savings', value: '$2,686', change: '+18% MoM' },
]

const QUICK_ACTIONS: FinanceQuickAction[] = [
  { id: 'send', label: 'Send', icon: <ArrowUpRight size={18} /> },
  { id: 'receive', label: 'Receive', icon: <ArrowDownLeft size={18} /> },
  { id: 'swap', label: 'Swap', icon: <Repeat size={18} /> },
  { id: 'add', label: 'Add', icon: <Plus size={18} /> },
]

const SECTIONS: FinanceDashboardSection[] = [
  {
    id: 'recent',
    title: 'Recent transactions',
    rows: [
      {
        id: 't1',
        title: 'Morning coffee',
        subtitle: 'Today · 8:14 AM',
        value: '-$5.40',
        leading: <Coffee size={16} />,
      },
      {
        id: 't2',
        title: 'Payroll deposit',
        subtitle: 'Yesterday',
        value: '+$2,410.00',
        leading: <Briefcase size={16} />,
      },
      {
        id: 't3',
        title: 'Streaming subscription',
        subtitle: 'May 1',
        value: '-$12.99',
        leading: <Music size={16} />,
      },
      {
        id: 't4',
        title: 'Online order',
        subtitle: 'Apr 30',
        value: '-$84.20',
        leading: <ShoppingBag size={16} />,
      },
      {
        id: 't5',
        title: 'Power bill',
        subtitle: 'Apr 28',
        value: '-$118.55',
        leading: <Zap size={16} />,
      },
    ],
  },
]

export default function FinanceDashboardShowcase() {
  return (
    <ShowcaseFrame
      title="Finance Dashboard"
      description="Top-of-app finance shell — balance hero, metric strip, quick actions, recent transactions."
      docPath="packages/ui-native/src/patterns/FinanceDashboard.tsx"
    >
      <Section title="Full dashboard">
        <FrameBox>
          <FinanceDashboard
            title="Overview"
            balanceLabel="Available balance"
            balance="$8,432.10"
            rangeLabel="May 2026 · resets in 12 days"
            metrics={METRICS}
            quickActions={QUICK_ACTIONS}
            sections={SECTIONS}
            chartSlot={<MiniChart />}
            topRight={<Bell size={22} />}
          />
        </FrameBox>
      </Section>

      <Section title="Without chart">
        <FrameBox>
          <FinanceDashboard
            title="Wallet"
            balance="$1,234.56"
            metrics={METRICS.slice(0, 2)}
            quickActions={QUICK_ACTIONS.slice(0, 3)}
            sections={[
              {
                id: 'top',
                title: 'Top categories',
                rows: [
                  { id: 'r1', title: 'Groceries', value: '$320.18', leading: <ShoppingBag size={16} /> },
                  { id: 'r2', title: 'Coffee', value: '$42.00', leading: <Coffee size={16} /> },
                  { id: 'r3', title: 'Utilities', value: '$256.55', leading: <Zap size={16} /> },
                ],
              },
            ]}
          />
        </FrameBox>
      </Section>

      <Section title="Minimal — balance only">
        <FrameBox>
          <FinanceDashboard
            title="Savings"
            balanceLabel="Total saved"
            balance="$24,108.92"
            rangeLabel="Goal: $30,000"
          />
        </FrameBox>
      </Section>

      <Section title="With sections only">
        <FrameBox>
          <FinanceDashboard
            balance="$512.40"
            sections={[
              {
                id: 'pending',
                title: 'Pending',
                rows: [
                  {
                    id: 'p1',
                    title: 'Refund — online order',
                    subtitle: 'Processing',
                    value: '+$48.00',
                    leading: <ShoppingBag size={16} />,
                  },
                ],
              },
            ]}
          />
        </FrameBox>
      </Section>
    </ShowcaseFrame>
  )
}
