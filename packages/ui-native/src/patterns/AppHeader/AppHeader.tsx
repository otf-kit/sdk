import { SizableText, XStack, YStack } from 'tamagui'
import { Avatar as OtfAvatar } from '../primitives/Avatar'

export type AppHeaderVariant = 'simple' | 'back' | 'profile' | 'centered'
export type AppHeaderProps = {
  title: string; subtitle?: string; variant?: AppHeaderVariant
  onBack?: () => void; avatar?: string; left?: React.ReactNode; right?: React.ReactNode
  transparent?: boolean; borderless?: boolean
}

export function AppHeader({ title, subtitle, variant = 'simple', onBack, avatar, left, right, transparent, borderless }: AppHeaderProps) {
  const leftContent = (() => {
    if (variant === 'back') return (
      <SizableText size="$6" paddingRight="$2" onPress={onBack} pressStyle={{ opacity: 0.6 }} cursor="pointer">{'\u2039'}</SizableText>
    )
    if (variant === 'profile') return <OtfAvatar uri={avatar} name={title} size="sm" />
    if (variant === 'centered') return left ?? null
    return null
  })()
  const rightContent = (variant === 'profile' || variant === 'centered') ? (right ?? null) : null

  return (
    <YStack paddingTop="$6" backgroundColor={transparent ? 'transparent' : '$background'}
      borderBottomWidth={borderless ? 0 : 1} borderBottomColor="$borderColor">
      <XStack height={56} alignItems="center" paddingHorizontal="$4" gap="$3">
        {leftContent}
        <YStack flex={1} alignItems={variant === 'centered' ? 'center' : 'flex-start'}>
          <SizableText size="$6" fontWeight="700" numberOfLines={1}>{title}</SizableText>
          {subtitle && <SizableText size="$2" color="$color9" numberOfLines={1}>{subtitle}</SizableText>}
        </YStack>
        {rightContent}
      </XStack>
    </YStack>
  )
}
