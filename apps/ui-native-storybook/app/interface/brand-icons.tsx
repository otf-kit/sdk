import { ShowcaseFrame, ComingSoon } from '../../components/ShowcaseFrame'

export default function BrandIconsShowcase() {
  return (
    <ShowcaseFrame
      title="Brand Icons"
      description="Google / Apple / GitHub / Microsoft logos for OAuth buttons."
      docPath="packages/ui-native/src/interface/BrandIcons.tsx"
    >
      <ComingSoon
        title="Stub — wire up next milestone"
        body="BrandIcons ship in @otf/ui-native already; this screen will exercise their variants once we rebuild the showcase entry."
      />
    </ShowcaseFrame>
  )
}
