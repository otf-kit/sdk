import { styled, YStack } from 'tamagui'

export const ScreenLayout = styled(YStack, {
  name: 'OtfScreenLayout',
  flex: 1,
  backgroundColor: '$background',

  variants: {
    padded: {
      true: { padding: '$4' },
    },
    centered: {
      true: { alignItems: 'center', justifyContent: 'center' },
    },
    safe: {
      true: { paddingTop: '$6' },
    },
  } as const,
})
