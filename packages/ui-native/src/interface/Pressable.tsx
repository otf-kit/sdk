import { styled, View } from 'tamagui'

// Tamagui's View handles onPress natively on both web and native. Adding
// `cursor: 'pointer'` ensures web treats it as an interactive element so
// onClick fires on the wrapping element regardless of nested children.
export const Pressable = styled(View, {
  name: 'OtfPressable',
  hitSlop: 10,
  cursor: 'pointer',
  pressStyle: { opacity: 0.5 },
})
