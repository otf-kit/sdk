import { ShowcaseFrame, ComingSoon } from '../../components/ShowcaseFrame'

export default function TabsShowcase() {
  return (
    <ShowcaseFrame
      title="Tabs"
      description="Switch between content panels with a header strip."
      docPath="packages/ui-native/src/interface/OtfTabs.tsx"
    >
      <ComingSoon
        title="Stub — wire up next milestone"
        body="OtfTabs ships in @otf/ui-native already; this screen will exercise its variants once we rebuild the showcase entry."
      />
    </ShowcaseFrame>
  )
}
