import { ShowcaseFrame, ComingSoon } from '../../components/ShowcaseFrame'

export default function AccordionShowcase() {
  return (
    <ShowcaseFrame
      title="Accordion"
      description="Expand/collapse list of disclosure rows."
      docPath="packages/ui-native/src/interface/OtfAccordion.tsx"
    >
      <ComingSoon
        title="Stub — wire up next milestone"
        body="OtfAccordion ships in @otf/ui-native already; this screen will exercise its variants once we rebuild the showcase entry."
      />
    </ShowcaseFrame>
  )
}
