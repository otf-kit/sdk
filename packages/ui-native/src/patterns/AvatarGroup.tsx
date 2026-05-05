import { Circle, Image, SizableText, XStack } from 'tamagui'

export type AvatarGroupProps = {
  avatars: { uri?: string; name?: string; color?: string }[]
  max?: number
  size?: number
  overlap?: number
}

function getInitials(name?: string): string {
  if (!name) return '?'
  return name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2)
}

function AvatarItem({ uri, name, color, size }: { uri?: string; name?: string; color?: string; size: number }) {
  return (
    <Circle
      size={size} backgroundColor={color ?? '$color4'} borderWidth={2} borderColor="$background"
      overflow="hidden" alignItems="center" justifyContent="center"
    >
      {uri ? (
        <Image source={{ uri }} width={size} height={size} objectFit="cover" />
      ) : (
        <SizableText size="$2" fontWeight="600" color={color ? '$color1' : '$color11'}>
          {getInitials(name)}
        </SizableText>
      )}
    </Circle>
  )
}

export function AvatarGroup({ avatars, max = 4, size = 36, overlap = 10 }: AvatarGroupProps) {
  const visible = avatars.slice(0, max)
  const remaining = avatars.length - max

  return (
    <XStack alignItems="center">
      {visible.map((avatar, i) => (
        <XStack key={i} marginLeft={i === 0 ? 0 : -overlap} zIndex={visible.length - i}>
          <AvatarItem {...avatar} size={size} />
        </XStack>
      ))}
      {remaining > 0 && (
        <XStack marginLeft={-overlap} zIndex={0}>
          <Circle size={size} backgroundColor="$color6" borderWidth={2} borderColor="$background"
            alignItems="center" justifyContent="center">
            <SizableText size="$2" fontWeight="600" color="$color11">+{remaining}</SizableText>
          </Circle>
        </XStack>
      )}
    </XStack>
  )
}
