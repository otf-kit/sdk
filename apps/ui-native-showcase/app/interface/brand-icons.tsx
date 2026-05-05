import {
  AppleLogo,
  GitHubLogo,
  GoogleLogo,
  MicrosoftLogo,
  OtfButton,
  SizableText,
  XStack,
  YStack,
} from '@otfdashkit/ui-native'
import { Section, ShowcaseFrame } from '../../components/ShowcaseFrame'

export default function BrandIconsShowcase() {
  return (
    <ShowcaseFrame
      title="Brand Icons"
      description="Google / Apple / GitHub / Microsoft logos for OAuth buttons. Pure SVG — no font dependency."
      docPath="packages/ui-native/src/interface/BrandIcons.tsx"
    >
      <Section title="Default size" hint="20px">
        <XStack gap="$5" alignItems="center" flexWrap="wrap">
          <YStack gap="$1" alignItems="center">
            <GoogleLogo />
            <SizableText size="$1" color="$color10">Google</SizableText>
          </YStack>
          <YStack gap="$1" alignItems="center">
            <AppleLogo />
            <SizableText size="$1" color="$color10">Apple</SizableText>
          </YStack>
          <YStack gap="$1" alignItems="center">
            <GitHubLogo color="#fff" />
            <SizableText size="$1" color="$color10">GitHub</SizableText>
          </YStack>
          <YStack gap="$1" alignItems="center">
            <MicrosoftLogo />
            <SizableText size="$1" color="$color10">Microsoft</SizableText>
          </YStack>
        </XStack>
      </Section>

      <Section title="Sizes">
        <XStack gap="$4" alignItems="center" flexWrap="wrap">
          {[16, 20, 24, 32, 48].map((size) => (
            <YStack key={size} gap="$1" alignItems="center">
              <GoogleLogo size={size} />
              <SizableText size="$1" color="$color10">{size}px</SizableText>
            </YStack>
          ))}
        </XStack>
      </Section>

      <Section title="Apple — light vs dark">
        <XStack gap="$4" alignItems="center" flexWrap="wrap">
          <YStack
            padding="$3" borderRadius="$3" backgroundColor="$color1"
            alignItems="center" gap="$1"
          >
            <AppleLogo size={32} color="#000" />
            <SizableText size="$1" color="$color10">Light bg</SizableText>
          </YStack>
          <YStack
            padding="$3" borderRadius="$3" backgroundColor="$color12"
            alignItems="center" gap="$1"
          >
            <AppleLogo size={32} color="#fff" />
            <SizableText size="$1" color="$color1">Dark bg</SizableText>
          </YStack>
        </XStack>
      </Section>

      <Section title="GitHub — color variants">
        <XStack gap="$4" alignItems="center" flexWrap="wrap">
          <GitHubLogo size={28} color="#fff" />
          <GitHubLogo size={28} color="#000" />
          <GitHubLogo size={28} color="#888" />
        </XStack>
      </Section>

      <Section title="In OAuth buttons">
        <YStack gap="$2" maxWidth={320}>
          <OtfButton icon={<GoogleLogo size={18} />}>Continue with Google</OtfButton>
          <OtfButton icon={<AppleLogo size={18} color="#fff" />}>
            Continue with Apple
          </OtfButton>
          <OtfButton icon={<GitHubLogo size={18} color="#fff" />}>
            Continue with GitHub
          </OtfButton>
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
