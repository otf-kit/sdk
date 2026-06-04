import { Separator, SizableText, XStack } from 'tamagui'

export type DividerProps = {
  label?: string
}

export function Divider({ label }: DividerProps) {
  if (!label) return <Separator borderColor="$color4" />
  return (
    <XStack alignItems="center" gap="$3">
      <Separator flex={1} borderColor="$color4" />
      <SizableText size="$2" color="$color11">{label}</SizableText>
      <Separator flex={1} borderColor="$color4" />
    </XStack>
  )
}
