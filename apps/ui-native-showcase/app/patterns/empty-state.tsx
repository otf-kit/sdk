import {
  EmptyState,
  YStack,
  Inbox,
  Search,
  ShoppingCart,
  Users,
  WifiOff,
  FileText,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

function EmptyFrame({ children }: { children: React.ReactNode }) {
  return (
    <YStack
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius="$4"
      backgroundColor="$background"
      minHeight={260}
      overflow="hidden"
    >
      {children}
    </YStack>
  )
}

export default function EmptyStateShowcase() {
  return (
    <ShowcaseFrame
      title="Empty State"
      description="Iconography + title + body + CTA when a list is empty. Use one variant per surface — inbox, search no-results, cart, network error, etc."
      docPath="packages/ui-native/src/patterns/EmptyState.tsx"
    >
      <Section title="Default — inbox empty">
        <EmptyFrame>
          <EmptyState
            icon={<Inbox size={48} color="$color9" />}
            title="Inbox zero"
            description="You are all caught up. New activity will land here."
            actionLabel="Refresh"
            onAction={() => {}}
          />
        </EmptyFrame>
      </Section>

      <Section title="No search results">
        <EmptyFrame>
          <EmptyState
            icon={<Search size={48} color="$color9" />}
            title="No matches"
            description="Try a different keyword, or clear filters to see everything."
            actionLabel="Clear filters"
            onAction={() => {}}
          />
        </EmptyFrame>
      </Section>

      <Section title="Empty cart">
        <EmptyFrame>
          <EmptyState
            icon={<ShoppingCart size={48} color="$color9" />}
            title="Your cart is empty"
            description="Looks quiet in here. Browse the catalog to start adding items."
            actionLabel="Start shopping"
            onAction={() => {}}
          />
        </EmptyFrame>
      </Section>

      <Section title="Network error">
        <EmptyFrame>
          <EmptyState
            icon={<WifiOff size={48} color="$red9" />}
            title="No connection"
            description="We could not reach the server. Check your network and try again."
            actionLabel="Retry"
            onAction={() => {}}
          />
        </EmptyFrame>
      </Section>

      <Section title="No team yet — invite CTA">
        <EmptyFrame>
          <EmptyState
            icon={<Users size={48} color="$color9" />}
            title="Invite your team"
            description="Workouts, plans, and chat are better together. Bring a friend along."
            actionLabel="Send invite"
            onAction={() => {}}
          />
        </EmptyFrame>
      </Section>

      <Section title="No description / no action" hint="title-only is valid">
        <EmptyFrame>
          <EmptyState
            icon={<FileText size={48} color="$color8" />}
            title="No documents"
          />
        </EmptyFrame>
      </Section>
    </ShowcaseFrame>
  )
}
