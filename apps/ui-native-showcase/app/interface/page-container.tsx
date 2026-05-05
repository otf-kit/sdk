import {
  PageContainer,
  PageMainContainer,
  SizableText,
  YStack,
} from '@otfdashkit/ui-native'
import { Section, ShowcaseFrame } from '../../components/ShowcaseFrame'

export default function PageContainerShowcase() {
  return (
    <ShowcaseFrame
      title="Page Container"
      description="Centered max-width frame for page-level content. PageMainContainer adds the role=main landmark for a11y."
      docPath="packages/ui-native/src/interface/PageContainer.tsx"
    >
      <Section
        title="PageContainer"
        hint="Responsive max-width — 760 / 860 / 1140"
      >
        <YStack
          backgroundColor="$color2"
          borderWidth={1}
          borderColor="$borderColor"
          borderRadius="$3"
          paddingVertical="$4"
        >
          <PageContainer>
            <YStack
              padding="$4"
              backgroundColor="$color3"
              borderRadius="$3"
              gap="$2"
            >
              <SizableText size="$5" fontWeight="600" color="$color12">
                Centered content
              </SizableText>
              <SizableText size="$3" color="$color11">
                The container caps width at 760px on md, 860px on lg, and
                1140px on xl. Content shorter than that grows to fill its
                parent.
              </SizableText>
            </YStack>
          </PageContainer>
        </YStack>
      </Section>

      <Section title="PageMainContainer" hint="role=main landmark">
        <YStack
          backgroundColor="$color2"
          borderWidth={1}
          borderColor="$borderColor"
          borderRadius="$3"
          paddingVertical="$4"
        >
          <PageMainContainer>
            <YStack
              padding="$4"
              backgroundColor="$color3"
              borderRadius="$3"
              gap="$2"
            >
              <SizableText size="$5" fontWeight="600" color="$color12">
                Main page region
              </SizableText>
              <SizableText size="$3" color="$color11">
                Same layout as PageContainer, but renders with role=main so
                screen-readers can jump to it via the &quot;skip to main
                content&quot; link.
              </SizableText>
            </YStack>
          </PageMainContainer>
        </YStack>
      </Section>

      <Section title="Multiple regions stacked">
        <YStack
          gap="$2"
          backgroundColor="$color2"
          borderWidth={1}
          borderColor="$borderColor"
          borderRadius="$3"
          paddingVertical="$4"
        >
          <PageContainer>
            <YStack padding="$3" backgroundColor="$blue3" borderRadius="$3">
              <SizableText size="$3" fontWeight="600" color="$blue11">
                Header region
              </SizableText>
            </YStack>
          </PageContainer>
          <PageMainContainer>
            <YStack padding="$3" backgroundColor="$green3" borderRadius="$3">
              <SizableText size="$3" fontWeight="600" color="$green11">
                Main region
              </SizableText>
            </YStack>
          </PageMainContainer>
          <PageContainer>
            <YStack padding="$3" backgroundColor="$color4" borderRadius="$3">
              <SizableText size="$3" fontWeight="600" color="$color11">
                Footer region
              </SizableText>
            </YStack>
          </PageContainer>
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
