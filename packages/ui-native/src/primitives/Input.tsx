import { Platform } from 'react-native'
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
  height: 50,
  size: '$5',
  color: '$color12',
  borderWidth: 0.5,
  borderColor: '$color5',
  borderRadius: '$4',
  backgroundColor: '$color1',
  placeholderTextColor: '$color7',

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
const InputHint = styled(SizableText, { name: 'OtfInputHint', size: '$2', color: '$color11' })

export type InputProps = GetProps<typeof InputField> & {
  label?: string
  error?: string
  hint?: string
}

// On web: Tamagui's Input sub-theme always wins the ::placeholder specificity
// battle and sets it to $color9 (orange). We inject a one-time <style> tag
// that overrides .is_Input::placeholder, which is the atomic class Tamagui
// adds to every InputField we render.
let _webPlaceholderInjected = false
function injectWebPlaceholderFix() {
  if (Platform.OS !== 'web' || _webPlaceholderInjected || typeof document === 'undefined') return
  _webPlaceholderInjected = true
  const s = document.createElement('style')
  s.textContent = 'input.is_Input::placeholder, textarea.is_Input::placeholder { color: rgba(160,150,140,0.55) !important; }'
  document.head.appendChild(s)
}
injectWebPlaceholderFix()

export function Input({ label, error, hint, ...props }: InputProps) {
  return (
    <InputFrame>
      {label && <InputLabel>{label}</InputLabel>}
      <InputField hasError={!!error} color="$color12" {...props} />
      {error && <InputError>{error}</InputError>}
      {hint && !error && <InputHint>{hint}</InputHint>}
    </InputFrame>
  )
}
