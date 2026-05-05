import { Badge, XStack, YStack, SizableText } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function BadgeShowcase() {
  return (
    <ShowcaseFrame
      title="Badge"
      description="Status pill — used for inline state indicators (success, warning, error, info)."
      docPath="packages/ui-native/src/interface/Badge.tsx"
    >
      <Section title="Variants">
        <XStack gap="$2" flexWrap="wrap" alignItems="center">
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </XStack>
      </Section>

      <Section title="In context">
        <YStack gap="$2">
          <XStack alignItems="center" gap="$2">
            <SizableText size="$3" color="$color12" flex={1}>
              Workout sync
            </SizableText>
            <Badge variant="success">Synced</Badge>
          </XStack>
          <XStack alignItems="center" gap="$2">
            <SizableText size="$3" color="$color12" flex={1}>
              Heart-rate sensor
            </SizableText>
            <Badge variant="warning">Battery low</Badge>
          </XStack>
          <XStack alignItems="center" gap="$2">
            <SizableText size="$3" color="$color12" flex={1}>
              Backup
            </SizableText>
            <Badge variant="error">Failed</Badge>
          </XStack>
          <XStack alignItems="center" gap="$2">
            <SizableText size="$3" color="$color12" flex={1}>
              New release
            </SizableText>
            <Badge variant="info">Beta</Badge>
          </XStack>
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
