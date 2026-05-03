import { ShowcaseFrame, ComingSoon } from '../../components/ShowcaseFrame'

export default function TooltipShowcase() {
  return (
    <ShowcaseFrame
      title="Tooltip"
      description="Hover/long-press helper text."
      docPath="packages/ui-native/src/interface/Tooltip.tsx"
    >
      <ComingSoon
        title="Stub — wire up next milestone"
        body="OtfTooltip ships in @otf/ui-native already; this screen will exercise its variants once we rebuild the showcase entry."
      />
    </ShowcaseFrame>
  )
}
