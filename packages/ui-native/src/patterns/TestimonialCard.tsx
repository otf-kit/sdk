import { Circle, Image, SizableText, XStack, YStack } from 'tamagui'
import { Star } from '@tamagui/lucide-icons'
import { LinearGradient } from 'tamagui/linear-gradient'

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
    <XStack gap="$1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={15}
          color={i < Math.round(count) ? '#F59E0B' : '$color5'}
          fill={i < Math.round(count) ? '#F59E0B' : 'transparent'}
        />
      ))}
    </XStack>
  )
}

function AuthorRow({ author, role, avatar }: Pick<TestimonialCardProps, 'author' | 'role' | 'avatar'>) {
  return (
    <XStack gap="$2.5" alignItems="center">
      {avatar ? (
        <Image source={{ uri: avatar }} width={36} height={36} borderRadius={18} objectFit="cover" />
      ) : (
        <Circle size={36} backgroundColor="$color9">
          <SizableText size="$3" fontWeight="700" color="$color1">
            {author[0]?.toUpperCase() ?? '?'}
          </SizableText>
        </Circle>
      )}
      <YStack>
        <SizableText size="$3" fontWeight="600">{author}</SizableText>
        {role && <SizableText size="$2" color="$color11">{role}</SizableText>}
      </YStack>
    </XStack>
  )
}

export function TestimonialCard({ quote, author, role, avatar, rating, variant = 'card' }: TestimonialCardProps) {
  if (variant === 'minimal') {
    return (
      <YStack gap="$3" paddingVertical="$2">
        <Stars count={rating} />
        <SizableText size="$4" color="$color12" fontStyle="italic" lineHeight={24}>"{quote}"</SizableText>
        <AuthorRow author={author} role={role} avatar={avatar} />
      </YStack>
    )
  }

  if (variant === 'featured') {
    return (
      <YStack
        borderRadius="$6"
        overflow="hidden"
        gap="$4"
        alignItems="center"
        padding="$5"
        borderWidth={1}
        borderColor="$color5"
      >
        <LinearGradient
          colors={['$color3', '$color2']}
          start={[0, 0]}
          end={[0, 1]}
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
        />
        {/* Oversized decorative quote mark */}
        <SizableText
          size="$14"
          color="$color9"
          opacity={0.18}
          fontWeight="900"
          lineHeight={60}
          marginBottom={-20}
        >
          &ldquo;
        </SizableText>
        <Stars count={rating} />
        <SizableText size="$5" color="$color12" fontStyle="italic" textAlign="center" lineHeight={30}>
          &ldquo;{quote}&rdquo;
        </SizableText>
        <AuthorRow author={author} role={role} avatar={avatar} />
      </YStack>
    )
  }

  // Default card variant — bordered, with shadow
  return (
    <YStack
      backgroundColor="$color1"
      padding="$4"
      borderRadius="$5"
      borderWidth={1}
      borderColor="$color4"
      gap="$3"
      shadowColor="rgba(0,0,0,0.12)"
      shadowRadius={8}
      shadowOffset={{ width: 0, height: 3 }}
    >
      <Stars count={rating} />
      <SizableText size="$4" color="$color12" fontStyle="italic" lineHeight={24}>
        &ldquo;{quote}&rdquo;
      </SizableText>
      <AuthorRow author={author} role={role} avatar={avatar} />
    </YStack>
  )
}
