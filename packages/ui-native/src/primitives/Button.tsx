import { Button as TamaguiButton, styled, type GetProps } from 'tamagui'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Button: any = styled(TamaguiButton, {
  borderWidth: 0,
  cursor: 'pointer',
  focusVisibleStyle: {
    outlineWidth: 2,
    outlineStyle: 'solid',
    outlineColor: '$color8',
  },

  variants: {
    variant: {
      default: {
        backgroundColor: '$color3',
        hoverStyle: { backgroundColor: '$color4' },
        pressStyle: { backgroundColor: '$color2', opacity: 0.8 },
      },
      primary: {
        backgroundColor: '$color9',
        color: '$color1',
        hoverStyle: { backgroundColor: '$color10' },
        pressStyle: { backgroundColor: '$color8', opacity: 0.9 },
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '$color6',
        hoverStyle: { borderColor: '$color8' },
        pressStyle: { borderColor: '$color4', opacity: 0.8 },
      },
      transparent: {
        backgroundColor: 'transparent',
        hoverStyle: { backgroundColor: '$color2' },
        pressStyle: { backgroundColor: '$color1', opacity: 0.8 },
      },
      floating: {
        backgroundColor: '$color4',
        shadowColor: '$shadow2',
        shadowRadius: 5,
        shadowOffset: { height: 2, width: 0 },
        hoverStyle: { backgroundColor: '$color5' },
        pressStyle: { backgroundColor: '$color3', opacity: 0.9 },
      },
      destructive: {
        backgroundColor: '$red9',
        color: '$color1',
        hoverStyle: { backgroundColor: '$red10' },
        pressStyle: { backgroundColor: '$red8', opacity: 0.9 },
      },
    },
    size: {
      sm: { height: '$3', paddingHorizontal: '$3', borderRadius: '$3' },
      md: { height: '$4', paddingHorizontal: '$4', borderRadius: '$4' },
      lg: { height: '$5', paddingHorizontal: '$5', borderRadius: '$5' },
    },
    fullWidth: {
      true: { width: '100%' },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export type ButtonProps = GetProps<typeof Button>
