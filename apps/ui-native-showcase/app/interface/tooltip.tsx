import { Info, OtfButton, OtfTooltip, SizableText, XStack, YStack } from '@otfdashkit/ui-native'
import { Section, ShowcaseFrame } from '../../components/ShowcaseFrame'

export default function TooltipShowcase() {
  return (
    <ShowcaseFrame
      title="Tooltip"
      description="Hover (web) or long-press (native) helper text. Built on Popover so it works offline of any portal context."
      docPath="packages/ui-native/src/interface/Tooltip.tsx"
    >
      <Section title="Sides" hint="Hover or tap each trigger">
        <XStack gap="$4" flexWrap="wrap" alignItems="center" justifyContent="center" paddingVertical="$4">
          <OtfTooltip content="Tooltip on top" side="top">
            <OtfButton size="sm">Top</OtfButton>
          </OtfTooltip>
          <OtfTooltip content="Tooltip on bottom" side="bottom">
            <OtfButton size="sm">Bottom</OtfButton>
          </OtfTooltip>
          <OtfTooltip content="Tooltip on left" side="left">
            <OtfButton size="sm">Left</OtfButton>
          </OtfTooltip>
          <OtfTooltip content="Tooltip on right" side="right">
            <OtfButton size="sm">Right</OtfButton>
          </OtfTooltip>
        </XStack>
      </Section>

      <Section title="On an icon trigger">
        <XStack alignItems="center" gap="$2">
          <SizableText size="$3" color="$color12">API key</SizableText>
          <OtfTooltip content="Found in Settings → Developers" side="top">
            <Info size={16} color="$color10" />
          </OtfTooltip>
        </XStack>
      </Section>

      <Section title="Long content">
        <XStack justifyContent="center" paddingVertical="$3">
          <OtfTooltip
            content="This action permanently archives the workspace. You can restore it within 30 days from the trash."
            side="top"
          >
            <OtfButton variant="outlined" size="sm">Hover for details</OtfButton>
          </OtfTooltip>
        </XStack>
      </Section>

      <Section title="Inline label">
        <YStack gap="$2">
          <XStack alignItems="center" gap="$2">
            <SizableText size="$3" color="$color12" flex={1}>
              Auto-renew subscription
            </SizableText>
            <OtfTooltip content="Charges your card on the 1st of each month." side="left">
              <Info size={16} color="$color10" />
            </OtfTooltip>
          </XStack>
          <XStack alignItems="center" gap="$2">
            <SizableText size="$3" color="$color12" flex={1}>
              Two-factor authentication
            </SizableText>
            <OtfTooltip content="Required for accounts on the Team plan." side="left">
              <Info size={16} color="$color10" />
            </OtfTooltip>
          </XStack>
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
