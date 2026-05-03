import { ShowcaseFrame, ComingSoon } from '../../components/ShowcaseFrame'

export default function FormFieldShowcase() {
  return (
    <ShowcaseFrame
      title="Form Field"
      description="Label + input + helper/error wrapper."
      docPath="packages/ui-native/src/interface/FormField.tsx"
    >
      <ComingSoon
        title="Stub — wire up next milestone"
        body="FormField ships in @otf/ui-native already; this screen will exercise its variants once we rebuild the showcase entry."
      />
    </ShowcaseFrame>
  )
}
