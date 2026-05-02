import { memo } from 'react'
import { Circle, Image, SizableText } from 'tamagui'

type SimpleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const simpleSizes: Record<SimpleSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
}

function getSize(size: number | SimpleSize): number {
  if (typeof size === 'number') return size
  return simpleSizes[size] ?? 40
}

export type AvatarProps = {
  uri?: string
  name?: string
  size?: number | SimpleSize
}

export const Avatar = memo(({ uri, name, size: sizeIn = 'md' }: AvatarProps) => {
  const size = getSize(sizeIn)

  return (
    <Circle
      size={size}
      overflow="hidden"
      backgroundColor="$color4"
      alignItems="center"
      justifyContent="center"
    >
      {uri ? (
        <Image
          source={{ uri }}
          width={size}
          height={size}
          objectFit="cover"
        />
      ) : (
        <SizableText
          size="$3"
          fontWeight="600"
          color="$color11"
        >
          {name ? name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2) : '?'}
        </SizableText>
      )}
    </Circle>
  )
})
