import { useState } from 'react'
import {
  ActionSheet,
  Button,
  SizableText,
  YStack,
  XStack,
  Link2,
  Mail,
  MessageCircle,
  FileText,
  Camera,
  Image as ImageIcon,
  FolderUp,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

const ICON = { size: 18, color: '$color11' } as const

export default function ActionSheetShowcase() {
  const [openShare, setOpenShare] = useState(false)
  const [openPost, setOpenPost] = useState(false)
  const [openMedia, setOpenMedia] = useState(false)

  const [last, setLast] = useState<string | null>(null)

  return (
    <ShowcaseFrame
      title="Action Sheet"
      description="iOS-style sheet of contextual actions. Destructive items render in red; cancel sits in a separate footer."
      docPath="packages/ui-native/src/patterns/ActionSheet.tsx"
    >
      <Section title="Share — neutral options" hint={last ? `Picked: ${last}` : 'No selection yet'}>
        <YStack gap="$3" alignItems="flex-start">
          <Button onPress={() => setOpenShare(true)}>Open share sheet</Button>
          <SizableText size="$2" color="$color11">
            {last ? `Last action: ${last}` : 'Tap to open'}
          </SizableText>
        </YStack>
        <ActionSheet
          open={openShare}
          onOpenChange={setOpenShare}
          title="Share weekly report"
          items={[
            { id: 'copy', label: 'Copy link', icon: <Link2 {...ICON} /> },
            { id: 'mail', label: 'Email to team', icon: <Mail {...ICON} /> },
            { id: 'slack', label: 'Send to Slack', icon: <MessageCircle {...ICON} /> },
            { id: 'pdf', label: 'Export as PDF', icon: <FileText {...ICON} /> },
          ]}
          onSelect={(id: string) => setLast(id)}
        />
      </Section>

      <Section title="Post — destructive option">
        <XStack gap="$3" alignItems="center">
          <Button onPress={() => setOpenPost(true)} backgroundColor="$color4">More</Button>
          <SizableText size="$2" color="$color11">Includes a destructive Delete row.</SizableText>
        </XStack>
        <ActionSheet
          open={openPost}
          onOpenChange={setOpenPost}
          title="Post by Maya Patel"
          items={[
            { id: 'pin', label: 'Pin to top' },
            { id: 'mute', label: 'Mute author' },
            { id: 'report', label: 'Report' },
            { id: 'delete', label: 'Delete post', destructive: true },
          ]}
          onSelect={(id: string) => setLast(id)}
        />
      </Section>

      <Section title="Media — minimal, no title">
        <Button onPress={() => setOpenMedia(true)}>Add media</Button>
        <ActionSheet
          open={openMedia}
          onOpenChange={setOpenMedia}
          items={[
            { id: 'camera', label: 'Take photo', icon: <Camera {...ICON} /> },
            { id: 'library', label: 'Choose from library', icon: <ImageIcon {...ICON} /> },
            { id: 'file', label: 'Upload file', icon: <FolderUp {...ICON} /> },
          ]}
          onSelect={(id: string) => setLast(id)}
          cancelLabel="Not now"
        />
      </Section>
    </ShowcaseFrame>
  )
}
