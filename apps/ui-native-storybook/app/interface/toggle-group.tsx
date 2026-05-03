import { ShowcaseFrame, ComingSoon } from '../../components/ShowcaseFrame'

export default function ToggleGroupShowcase() {
  return (
    <ShowcaseFrame
      title="Toggle Group"
      description="Multi/single toggle pills."
      docPath="packages/ui-native/src/interface/OtfToggleGroup.tsx"
    >
      <ComingSoon
        title="Stub — wire up next milestone"
        body="OtfToggleGroup ships in @otf/ui-native already; this screen will exercise its variants once we rebuild the showcase entry."
      />
    </ShowcaseFrame>
  )
}
