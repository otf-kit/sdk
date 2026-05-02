import { useCallback, useRef, useState } from 'react'
import { Platform, type TextInput } from 'react-native'
import { Input, SizableText, XStack, YStack } from 'tamagui'

export type OTPInputProps = {
  length?: number
  value?: string
  onChange?: (value: string) => void
  onComplete?: (code: string) => void
  error?: boolean
  autoFocus?: boolean
  secureEntry?: boolean
}

export function OTPInput({ length = 6, value = '', onChange, onComplete, error, autoFocus, secureEntry }: OTPInputProps) {
  const inputRef = useRef<TextInput>(null)
  const [focused, setFocused] = useState(false)
  const digits = value.padEnd(length, ' ').slice(0, length)

  const handleChange = useCallback((text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, length)
    onChange?.(cleaned)
    if (cleaned.length === length) onComplete?.(cleaned)
  }, [length, onChange, onComplete])

  const focusInput = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <YStack position="relative">
      <XStack gap="$2" justifyContent="center">
        {Array.from({ length }, (_, i) => {
          const char = digits[i]?.trim()
          const isCursor = focused && value.length === i
          return (
            <YStack
              key={i} width={48} height={56} borderRadius="$3"
              borderWidth={2}
              borderColor={error ? '$red9' : isCursor ? '$color9' : char ? '$color7' : '$color5'}
              backgroundColor={error ? '$red2' : isCursor ? '$color2' : '$color1'}
              alignItems="center" justifyContent="center"
              animation="quick"
              pointerEvents="none"
            >
              <SizableText size="$7" fontWeight="600" color="$color12">
                {char ? (secureEntry ? '●' : char) : ''}
              </SizableText>
              {isCursor && (
                <YStack
                  position="absolute" bottom={10}
                  width={20} height={2}
                  backgroundColor="$color9"
                  animation="quick"
                />
              )}
            </YStack>
          )
        })}
      </XStack>

      {Platform.OS === 'web' ? (
        <input
          ref={inputRef as any}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="one-time-code"
          maxLength={length}
          value={value}
          autoFocus={autoFocus}
          onChange={(e: any) => handleChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            width: '100%', height: '100%',
            opacity: 0,
            fontSize: 16,
            caretColor: 'transparent',
            cursor: 'pointer',
          }}
        />
      ) : (
        <Input
          ref={inputRef as any}
          value={value}
          onChangeText={handleChange}
          keyboardType="number-pad"
          maxLength={length}
          autoFocus={autoFocus}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          position="absolute"
          top={0} left={0} right={0} bottom={0}
          opacity={0}
          fontSize={16}
        />
      )}
    </YStack>
  )
}
