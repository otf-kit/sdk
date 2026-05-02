import { SizableText, XStack, YStack, Circle, Image } from 'tamagui'

export type ChatMessage = {
  id: string
  text: string
  sender: 'user' | 'other'
  timestamp?: string
  avatar?: string
  senderName?: string
}

export type ChatBubbleProps = {
  message: ChatMessage
  showAvatar?: boolean
}

export function ChatBubble({ message, showAvatar = true }: ChatBubbleProps) {
  const isUser = message.sender === 'user'

  return (
    <XStack
      alignSelf={isUser ? 'flex-end' : 'flex-start'}
      maxWidth="75%"
      gap="$2"
      flexDirection={isUser ? 'row-reverse' : 'row'}
    >
      {showAvatar && !isUser && (
        <Circle size={32} backgroundColor="$color4" overflow="hidden">
          {message.avatar ? (
            <Image source={{ uri: message.avatar }} width={32} height={32} objectFit="cover" />
          ) : (
            <SizableText size="$2" fontWeight="600" color="$color11">
              {message.senderName?.[0]?.toUpperCase() ?? '?'}
            </SizableText>
          )}
        </Circle>
      )}
      <YStack
        backgroundColor={isUser ? '$color9' : '$color3'}
        paddingHorizontal="$3"
        paddingVertical="$2.5"
        borderRadius="$5"
        borderBottomRightRadius={isUser ? '$2' : '$5'}
        borderBottomLeftRadius={isUser ? '$5' : '$2'}
        gap="$1"
      >
        <SizableText size="$3" color={isUser ? '$color1' : '$color12'}>
          {message.text}
        </SizableText>
        {message.timestamp && (
          <SizableText size="$1" color={isUser ? '$color3' : '$color9'} alignSelf="flex-end">
            {message.timestamp}
          </SizableText>
        )}
      </YStack>
    </XStack>
  )
}
