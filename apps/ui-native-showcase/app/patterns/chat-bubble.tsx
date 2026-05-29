import { ChatBubble, YStack, type ChatMessage } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'
import { avatar } from '../../lib/fixtures'

const SARAH_AVATAR = avatar('sarah')
const ALEX_AVATAR = avatar('alex')

const userMsg: ChatMessage = {
  id: 'u1',
  text: 'Hey! Can you take a look at the new dashboard tile?',
  sender: 'user',
}

const otherMsg: ChatMessage = {
  id: 'o1',
  text: 'On it — pulling the latest build now.',
  sender: 'other',
  senderName: 'Sarah Chen',
  avatar: SARAH_AVATAR,
}

const userMsgStamped: ChatMessage = {
  id: 'u2',
  text: 'Awesome, thanks!',
  sender: 'user',
  timestamp: '10:42 AM',
}

const otherMsgStamped: ChatMessage = {
  id: 'o2',
  text: 'Looks great. One nit — the chart legend feels a little cramped on small screens.',
  sender: 'other',
  senderName: 'Alex Rivera',
  avatar: ALEX_AVATAR,
  timestamp: '10:44 AM',
}

const thread: ChatMessage[] = [
  {
    id: 't1',
    text: 'Morning! Standup notes ready when you are.',
    sender: 'other',
    senderName: 'Jordan Kim',
    timestamp: '9:01 AM',
  },
  {
    id: 't2',
    text: 'Posting now — stuck on the export bug, will need a hand after lunch.',
    sender: 'user',
    timestamp: '9:02 AM',
  },
  {
    id: 't3',
    text: 'Got it. I can pair at 1pm if that works.',
    sender: 'other',
    senderName: 'Jordan Kim',
    timestamp: '9:03 AM',
  },
  {
    id: 't4',
    text: 'Perfect, see you then.',
    sender: 'user',
    timestamp: '9:04 AM',
  },
]

export default function ChatBubbleShowcase() {
  return (
    <ShowcaseFrame
      title="Chat Bubble"
      description="Single-message bubble for inline chat threads. Differentiates user vs other, with optional avatar + timestamp."
      docPath="packages/ui-native/src/patterns/ChatBubble.tsx"
    >
      <Section title="User bubble">
        <ChatBubble message={userMsg} />
      </Section>

      <Section title="Other — with avatar">
        <ChatBubble message={otherMsg} />
      </Section>

      <Section title="With timestamps">
        <YStack gap="$2">
          <ChatBubble message={otherMsgStamped} />
          <ChatBubble message={userMsgStamped} />
        </YStack>
      </Section>

      <Section title="Thread mock" hint="4 messages, alternating sender">
        <YStack gap="$2">
          {thread.map((m) => (
            <ChatBubble key={m.id} message={m} />
          ))}
        </YStack>
      </Section>

      <Section title="Without avatar">
        <ChatBubble message={otherMsg} showAvatar={false} />
      </Section>
    </ShowcaseFrame>
  )
}
