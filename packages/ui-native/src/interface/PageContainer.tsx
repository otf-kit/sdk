import { styled, YStack } from 'tamagui'

export const PageContainer = styled(YStack, {
  name: 'OtfPageContainer',
  position: 'relative',
  marginHorizontal: 'auto',
  flex: 1,
  flexBasis: 'auto',
  paddingHorizontal: '$4',
  width: '100%',
  minWidth: 380,
  $md: { maxWidth: 760 },
  $lg: { maxWidth: 860 },
  $xl: { maxWidth: 1140 },
})

export const PageMainContainer = styled(PageContainer, {
  name: 'OtfPageMainContainer',
  role: 'main',
})
