import {
  LoginScreen,
  YStack,
  XStack,
  SizableText,
  Circle,
  Activity,
} from '@otf/ui-native'
import type { AuthProvider } from '@otf/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

const PROVIDERS: AuthProvider[] = [
  { id: 'apple', name: 'Continue with Apple', brand: 'apple' },
  { id: 'google', name: 'Continue with Google', brand: 'google' },
  { id: 'github', name: 'Continue with GitHub', brand: 'github' },
]

const LOGO = (
  <Circle size={56} backgroundColor="$color9" alignItems="center" justifyContent="center">
    <Activity size={28} color="white" />
  </Circle>
)

const HERO_PILL = (
  <XStack
    backgroundColor="$color3"
    paddingHorizontal="$3"
    paddingVertical="$1.5"
    borderRadius="$10"
    gap="$2"
    alignItems="center"
  >
    <Circle size={6} backgroundColor="$green9" />
    <SizableText size="$2" color="$color11" fontWeight="600">
      Trusted by 124k athletes
    </SizableText>
  </XStack>
)

function ScreenFrame({ children }: { children: React.ReactNode }) {
  return (
    <YStack
      height={620}
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius="$5"
      overflow="hidden"
      backgroundColor="$background"
    >
      {children}
    </YStack>
  )
}

export default function LoginScreenShowcase() {
  return (
    <ShowcaseFrame
      title="Login Screen"
      description="Email + provider auth shell. Default, editorial, and centered-card variants — branded provider buttons + email form composable independently."
      docPath="packages/ui-native/src/patterns/LoginScreen.tsx"
    >
      <Section title="Default — providers + email" hint="brand-colored buttons">
        <ScreenFrame>
          <LoginScreen
            logo={LOGO}
            title="Welcome back"
            subtitle="Sign in to continue your streak"
            providers={PROVIDERS}
            showEmailForm
            onProviderPress={() => {}}
            onEmailSubmit={() => {}}
            onForgotPassword={() => {}}
            onCreateAccount={() => {}}
            onTerms={() => {}}
            onPrivacy={() => {}}
          />
        </ScreenFrame>
      </Section>

      <Section title="Email-only" hint="no SSO providers">
        <ScreenFrame>
          <LoginScreen
            logo={LOGO}
            title="Sign in"
            subtitle="Use your work email"
            showEmailForm
            onEmailSubmit={() => {}}
            onForgotPassword={() => {}}
            onCreateAccount={() => {}}
          />
        </ScreenFrame>
      </Section>

      <Section title="Providers only" hint="passwordless flow">
        <ScreenFrame>
          <LoginScreen
            logo={LOGO}
            title="Get started"
            subtitle="Pick how you want to sign in"
            providers={PROVIDERS}
            onProviderPress={() => {}}
            onTerms={() => {}}
            onPrivacy={() => {}}
          />
        </ScreenFrame>
      </Section>

      <Section title="Editorial — branded hero" hint="oversized title, rounded providers">
        <ScreenFrame>
          <LoginScreen
            variant="editorial"
            logo={LOGO}
            hero={HERO_PILL}
            title="Show up daily"
            subtitle="Your training partner — one streak at a time"
            providers={PROVIDERS}
            showEmailForm
            onProviderPress={() => {}}
            onEmailSubmit={() => {}}
            onTerms={() => {}}
            onPrivacy={() => {}}
          />
        </ScreenFrame>
      </Section>

      <Section title="Centered card" hint="modal-feel for web + landing pages">
        <ScreenFrame>
          <LoginScreen
            variant="centered-card"
            logo={LOGO}
            title="Sign in"
            subtitle="Welcome back"
            providers={[
              { id: 'google', name: 'Continue with Google', brand: 'google' },
              { id: 'apple', name: 'Continue with Apple', brand: 'apple' },
            ]}
            showEmailForm
            onProviderPress={() => {}}
            onEmailSubmit={() => {}}
            onForgotPassword={() => {}}
            onCreateAccount={() => {}}
          />
        </ScreenFrame>
      </Section>

      <Section title="Loading state" hint="provider press fired">
        <ScreenFrame>
          <LoginScreen
            logo={LOGO}
            title="Signing you in"
            subtitle="One moment please"
            providers={PROVIDERS}
            showEmailForm
            loading
            onEmailSubmit={() => {}}
          />
        </ScreenFrame>
      </Section>
    </ShowcaseFrame>
  )
}
