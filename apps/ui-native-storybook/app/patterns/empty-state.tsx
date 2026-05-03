import { ShowcaseFrame, ComingSoon } from '../../components/ShowcaseFrame'

export default function EmptyStateShowcase() {
  return (
    <ShowcaseFrame
      title="Empty State"
      description="Iconography + title + body + CTA when a list is empty."
      docPath="packages/ui-native/src/patterns/EmptyState.tsx"
    >
      <ComingSoon title="Stub — wire up next milestone" />
    </ShowcaseFrame>
  )
}
