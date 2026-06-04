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
            <SizableText size="$1" color="$color11">Google</SizableText>
          </YStack>
          <YStack gap="$1" alignItems="center">
            <AppleLogo />
            <SizableText size="$1" color="$color11">Apple</SizableText>
          </YStack>
          <YStack gap="$1" alignItems="center">
            <GitHubLogo color="#fff" />
            <SizableText size="$1" color="$color11">GitHub</SizableText>
          </YStack>
          <YStack gap="$1" alignItems="center">
            <MicrosoftLogo />
            <SizableText size="$1" color="$color11">Microsoft</SizableText>
          </YStack>
        </XStack>
      </Section>

      <Section title="Sizes">
        <XStack gap="$4" alignItems="center" flexWrap="wrap">
          {[16, 20, 24, 32, 48].map((size) => (
            <YStack key={size} gap="$1" alignItems="center">
              <GoogleLogo size={size} />
              <SizableText size="$1" color="$color11">{size}px</SizableText>
            </YStack>
          ))}
        </XStack>
      </Section>

      <Section title="Apple — light vs dark">
        {/* Absolute light/dark swatches — NOT $color1/$color12 (those are
            theme-relative, so the "Light bg" swatch went black in dark theme
            and the Apple vanished). Fixed white + near-black demonstrate the
            real contrast the logo must hold on either surface. */}
        <XStack gap="$4" alignItems="center" flexWrap="wrap">
          <YStack
            padding="$4" borderRadius="$3" backgroundColor="#FFFFFF"
            borderWidth={1} borderColor="$color5"
            alignItems="center" gap="$2" minWidth={96}
          >
            <AppleLogo size={32} color="#000000" />
            <SizableText size="$1" color="#6B6B70">Light bg</SizableText>
          </YStack>
          <YStack
            padding="$4" borderRadius="$3" backgroundColor="#0E0F1A"
            borderWidth={1} borderColor="$color5"
            alignItems="center" gap="$2" minWidth={96}
          >
            <AppleLogo size={32} color="#FFFFFF" />
            <SizableText size="$1" color="#9DA2C0">Dark bg</SizableText>
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
