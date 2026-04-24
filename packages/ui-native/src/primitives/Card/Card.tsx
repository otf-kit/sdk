import { styled, View, GetProps, withStaticProperties } from 'tamagui'

const CardFrame = styled(View, {
  name: 'OtfCard',
  backgroundColor: '$color2',
  borderRadius: '$4',
  overflow: 'hidden',

  variants: {
    variant: {
      flat: {},
      elevated: {
        shadowColor: '$shadow2',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 3,
      },
      outlined: {
        borderWidth: 1,
        borderColor: '$color5',
      },
    },
    size: {
      sm: { borderRadius: '$3', padding: '$3' },
      md: { borderRadius: '$4', padding: '$4' },
      lg: { borderRadius: '$5', padding: '$5' },
    },
    pressable: {
      true: {
        pressStyle: { scale: 0.98, opacity: 0.9 },
        cursor: 'pointer',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'flat',
    size: 'md',
  },
})

const CardHeader = styled(View, { name: 'OtfCardHeader', paddingBottom: '$3' })
const CardContent = styled(View, { name: 'OtfCardContent' })
const CardFooter = styled(View, {
  name: 'OtfCardFooter',
  paddingTop: '$3',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$2',
})

export type CardProps = GetProps<typeof CardFrame>

export const Card = withStaticProperties(CardFrame, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
})
