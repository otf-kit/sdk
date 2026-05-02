import { Image, SizableText, XStack, YStack } from 'tamagui'

export type TestimonialCardProps = {
  quote: string
  author: string
  role?: string
  avatar?: string
  rating?: number
  variant?: 'card' | 'minimal' | 'featured'
}

function Stars({ count = 0 }: { count?: number }) {
  if (!count) return null
  return (
    <XStack gap="$0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <SizableText key={i} size="$3" color={i < Math.round(count) ? '$yellow9' : '$color5'}>★</SizableText>
      ))}
    </XStack>
  )
}

function AuthorRow({ author, role, avatar }: Pick<TestimonialCardProps, 'author' | 'role' | 'avatar'>) {
  return (
    <XStack gap="$2.5" alignItems="center">
      {avatar && (
        <Image source={{ uri: avatar }} width={36} height={36} borderRadius={18} objectFit="cover" />
      )}
      <YStack>
        <SizableText size="$3" fontWeight="600">{author}</SizableText>
        {role && <SizableText size="$2" color="$color9">{role}</SizableText>}
      </YStack>
    </XStack>
  )
}

export function TestimonialCard({ quote, author, role, avatar, rating, variant = 'card' }: TestimonialCardProps) {
  if (variant === 'minimal') {
    return (
      <YStack gap="$3" paddingVertical="$2">
        <Stars count={rating} />
        <SizableText size="$4" color="$color11" fontStyle="italic" lineHeight={24}>"{quote}"</SizableText>
        <AuthorRow author={author} role={role} avatar={avatar} />
      </YStack>
    )
  }

  if (variant === 'featured') {
    return (
      <YStack backgroundColor="$color3" padding="$5" borderRadius="$6" gap="$4" alignItems="center">
        <SizableText size="$8" color="$color9" opacity={0.3} fontWeight="800">"</SizableText>
        <Stars count={rating} />
        <SizableText size="$5" color="$color12" fontStyle="italic" textAlign="center" lineHeight={28}>
          "{quote}"
        </SizableText>
        <AuthorRow author={author} role={role} avatar={avatar} />
      </YStack>
    )
  }

  return (
    <YStack backgroundColor="$color1" padding="$4" borderRadius="$5" borderWidth={1}
      borderColor="$color4" gap="$3">
      <Stars count={rating} />
      <SizableText size="$4" color="$color11" fontStyle="italic" lineHeight={24}>"{quote}"</SizableText>
      <AuthorRow author={author} role={role} avatar={avatar} />
    </YStack>
  )
}
