import { Input as TamaguiInput, styled, View, SizableText, type GetProps } from 'tamagui'

const InputFrame = styled(View, {
  name: 'OtfInputFrame',
  gap: '$1.5',
})

const InputLabel = styled(SizableText, {
  name: 'OtfInputLabel',
  size: '$4',
  fontWeight: '500',
  color: '$color11',
})

const InputField = styled(TamaguiInput, {
  name: 'OtfInput',
  height: 50,
  size: '$5',
  borderWidth: 0.5,
  borderColor: '$color5',
  borderRadius: '$4',
  backgroundColor: '$color1',
  placeholderTextColor: '$color8',

  focusVisibleStyle: {
    outlineWidth: 3,
    outlineStyle: 'solid',
    outlineColor: '$background04',
    outlineOffset: 1,
    borderWidth: 0.5,
    borderColor: '$color7',
  },

  variants: {
    hasError: {
      true: {
        borderColor: '$red9',
        focusVisibleStyle: { borderColor: '$red9' },
      },
    },
    variant: {
      default: {},
      filled: {
        backgroundColor: '$color2',
        borderColor: 'transparent',
        focusVisibleStyle: { borderColor: '$color7' },
      },
    },
  } as const,

  defaultVariants: { variant: 'default' },
})

const InputError = styled(SizableText, { name: 'OtfInputError', size: '$2', color: '$red10' })
const InputHint = styled(SizableText, { name: 'OtfInputHint', size: '$2', color: '$color9' })

export type InputProps = GetProps<typeof InputField> & {
  label?: string
  error?: string
  hint?: string
}

export function Input({ label, error, hint, ...props }: InputProps) {
  return (
    <InputFrame>
      {label && <InputLabel>{label}</InputLabel>}
      <InputField hasError={!!error} {...props} />
      {error && <InputError>{error}</InputError>}
      {hint && !error && <InputHint>{hint}</InputHint>}
    </InputFrame>
  )
}
