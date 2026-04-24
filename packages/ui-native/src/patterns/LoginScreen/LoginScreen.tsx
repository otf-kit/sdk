import { useState, type ReactNode } from 'react'
import { Button, Circle, SizableText, Spinner, XStack, YStack } from 'tamagui'
import { Input } from '../primitives/Input'
import { Divider } from '../layouts/Divider'
import { GoogleLogo, AppleLogo, GitHubLogo, MicrosoftLogo } from '../interface/BrandIcons'

export type AuthProviderBrand = 'google' | 'apple' | 'github' | 'microsoft' | 'custom'
export type LoginScreenVariant = 'default' | 'editorial' | 'centered-card'
export type AuthProvider = {
  id: string
  name: string
  icon?: ReactNode
  brand?: AuthProviderBrand
  description?: string
}
export type LoginScreenProps = {
  variant?: LoginScreenVariant
  title?: string; subtitle?: string; logo?: ReactNode; providers?: AuthProvider[]
  hero?: ReactNode
  backgroundSlot?: ReactNode
  footerSlot?: ReactNode
  providerButtonStyle?: 'neutral' | 'brand'
  onProviderPress?: (id: string) => void; showEmailForm?: boolean
  onEmailSubmit?: (email: string, password: string) => void
  onForgotPassword?: () => void; onCreateAccount?: () => void
  onTerms?: () => void; onPrivacy?: () => void; loading?: boolean
}

const BRAND_ICON_MAP: Record<AuthProviderBrand, (props: { size?: number; color?: string }) => any> = {
  google: ({ size }) => <GoogleLogo size={size} />,
  apple: ({ size, color }) => <AppleLogo size={size} color={color} />,
  github: ({ size, color }) => <GitHubLogo size={size} color={color} />,
  microsoft: ({ size }) => <MicrosoftLogo size={size} />,
  custom: ({ size = 20 }) => (
    <Circle size={size} backgroundColor="$color4" alignItems="center" justifyContent="center">
      <SizableText fontSize={size * 0.6} color="$color10">{'•'}</SizableText>
    </Circle>
  ),
}

const BRAND_STYLES: Record<AuthProviderBrand, { backgroundColor: string; borderColor: string; textColor: string }> = {
  google: { backgroundColor: '$color1', borderColor: '$color5', textColor: '$color12' },
  apple: { backgroundColor: '$color12', borderColor: '$color12', textColor: '$color1' },
  github: { backgroundColor: '$color12', borderColor: '$color12', textColor: '$color1' },
  microsoft: { backgroundColor: '$color1', borderColor: '$color5', textColor: '$color12' },
  custom: { backgroundColor: '$color1', borderColor: '$color5', textColor: '$color12' },
}

function ProviderBadge({ provider }: { provider: AuthProvider }) {
  const brand = provider.brand ?? 'custom'
  if (provider.icon) return <>{provider.icon}</>
  const renderIcon = BRAND_ICON_MAP[brand]
  const iconColor = brand === 'apple' || brand === 'github' ? '#fff' : undefined
  return renderIcon({ size: 20, color: iconColor })
}

export function LoginScreen({
  variant = 'default',
  title = 'Welcome',
  subtitle = 'Sign in to continue',
  logo,
  providers = [],
  hero,
  backgroundSlot,
  footerSlot,
  providerButtonStyle = 'brand',
  onProviderPress,
  showEmailForm,
  onEmailSubmit,
  onForgotPassword,
  onCreateAccount,
  onTerms,
  onPrivacy,
  loading,
}: LoginScreenProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isEditorial = variant === 'editorial'
  const isCenteredCard = variant === 'centered-card'
  return (
    <YStack flex={1} padding="$4" gap="$5" backgroundColor="$background" justifyContent="center">
      {backgroundSlot ? <YStack position="absolute" left={0} right={0} top={0} bottom={0}>{backgroundSlot}</YStack> : null}
      <YStack
        gap="$5"
        backgroundColor={isCenteredCard ? '$color1' : 'transparent'}
        borderRadius={isCenteredCard ? '$7' : undefined}
        padding={isCenteredCard ? '$4' : undefined}
        borderWidth={isCenteredCard ? 1 : 0}
        borderColor={isCenteredCard ? '$color4' : undefined}
      >
      <YStack alignItems="center" gap="$2">
        {logo && <YStack paddingBottom="$3">{logo}</YStack>}
        {hero ? <YStack paddingBottom="$2">{hero}</YStack> : null}
        <SizableText size={isEditorial ? '$10' : '$9'} fontWeight="700" textAlign="center" fontFamily={isEditorial ? '$heading' : undefined}>{title}</SizableText>
        <SizableText size="$4" color="$color10" textAlign="center">{subtitle}</SizableText>
      </YStack>
      {providers.length > 0 && (
        <YStack gap="$2.5">
          {providers.map(p => (
            <Button
              key={p.id}
              size="$5"
              borderWidth={1.5}
              borderColor={providerButtonStyle === 'brand' ? BRAND_STYLES[p.brand ?? 'custom'].borderColor : '$color5'}
              backgroundColor={providerButtonStyle === 'brand' ? BRAND_STYLES[p.brand ?? 'custom'].backgroundColor : '$color1'}
              borderRadius={isEditorial ? '$6' : '$4'}
              disabled={loading}
              onPress={() => onProviderPress?.(p.id)}
              hoverStyle={{ backgroundColor: providerButtonStyle === 'brand' ? BRAND_STYLES[p.brand ?? 'custom'].backgroundColor : '$color2' }}
              pressStyle={{ backgroundColor: '$color3' }}
            >
              <XStack alignItems="center" justifyContent="space-between" width="100%" gap="$2">
                <XStack alignItems="center" gap="$2.5">
                  <ProviderBadge provider={p} />
                  <YStack alignItems="flex-start">
                    <SizableText size="$4" fontWeight="600" color={providerButtonStyle === 'brand' ? BRAND_STYLES[p.brand ?? 'custom'].textColor : undefined}>{p.name}</SizableText>
                    {p.description ? <SizableText size="$2" color="$color10">{p.description}</SizableText> : null}
                  </YStack>
                </XStack>
                <SizableText size="$4" color={providerButtonStyle === 'brand' ? BRAND_STYLES[p.brand ?? 'custom'].textColor : '$color9'}>→</SizableText>
              </XStack>
            </Button>
          ))}
        </YStack>
      )}
      {showEmailForm && providers.length > 0 && <Divider label="or" />}
      {showEmailForm && (
        <YStack gap="$3">
          <Input label="Email" placeholder="your@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <Input label="Password" placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry />
          {onForgotPassword && <XStack justifyContent="flex-end"><SizableText size="$3" color="$color9" onPress={onForgotPassword}>Forgot password?</SizableText></XStack>}
          <Button size="$5" backgroundColor="$color9" color="$color1" borderRadius="$5" disabled={loading}
            onPress={() => onEmailSubmit?.(email, password)}
            hoverStyle={{ backgroundColor: '$color10' }} pressStyle={{ backgroundColor: '$color8' }}
            icon={loading ? <Spinner size="small" color="$color1" /> : undefined}>
            Sign In
          </Button>
          {onCreateAccount && <Button size="$3" chromeless onPress={onCreateAccount}><SizableText size="$3" color="$color9">Create Account</SizableText></Button>}
        </YStack>
      )}
      {(onTerms || onPrivacy) && (
        <YStack paddingTop="$2" alignItems="center">
          <SizableText size="$2" color="$color8" textAlign="center">
            By continuing you agree to our{' '}
            {onTerms && <SizableText size="$2" color="$color9" onPress={onTerms}>Terms of Service</SizableText>}
            {onTerms && onPrivacy && ' & '}
            {onPrivacy && <SizableText size="$2" color="$color9" onPress={onPrivacy}>Privacy Policy</SizableText>}
          </SizableText>
        </YStack>
      )}
      {footerSlot}
      </YStack>
    </YStack>
  )
}
