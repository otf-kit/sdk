import { useState } from 'react'
import {
  ConfirmDialog,
  Button,
  XStack,
  YStack,
  SizableText,
  AlertTriangle,
  Trash2,
  LogOut,
} from '@otf/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function ConfirmDialogShowcase() {
  const [openSave, setOpenSave] = useState(false)
  const [openSignOut, setOpenSignOut] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openIcon, setOpenIcon] = useState(false)

  const [last, setLast] = useState<string | null>(null)

  return (
    <ShowcaseFrame
      title="Confirm Dialog"
      description="Centered modal for confirming an action. Defaults to neutral; flip `destructive` to surface a red confirm button."
      docPath="packages/ui-native/src/patterns/ConfirmDialog.tsx"
    >
      <Section title="Neutral — save changes" hint={last ? `Last: ${last}` : 'No action yet'}>
        <Button onPress={() => setOpenSave(true)}>Save changes</Button>
        <ConfirmDialog
          open={openSave}
          onOpenChange={setOpenSave}
          title="Save changes?"
          description="Your draft will be published to the team."
          confirmLabel="Save"
          onConfirm={() => setLast('saved')}
          onCancel={() => setLast('cancelled save')}
        />
      </Section>

      <Section title="Neutral — sign out (no destructive flag)">
        <Button onPress={() => setOpenSignOut(true)} backgroundColor="$color4">Sign out</Button>
        <ConfirmDialog
          open={openSignOut}
          onOpenChange={setOpenSignOut}
          title="Sign out of this device?"
          description="You'll need to log back in to access your data."
          confirmLabel="Sign out"
          icon={<LogOut size={32} color="$color9" />}
          onConfirm={() => setLast('signed out')}
        />
      </Section>

      <Section title="Destructive — delete account">
        <XStack gap="$3" alignItems="center">
          <Button onPress={() => setOpenDelete(true)} backgroundColor="$red9" color="white">
            Delete account
          </Button>
          <SizableText size="$2" color="$color10">Confirm button renders red.</SizableText>
        </XStack>
        <ConfirmDialog
          open={openDelete}
          onOpenChange={setOpenDelete}
          title="Delete this account?"
          description="This will permanently remove all data for Sarah Chen. This cannot be undone."
          confirmLabel="Delete forever"
          destructive
          icon={<Trash2 size={32} color="$red9" />}
          onConfirm={() => setLast('deleted')}
          onCancel={() => setLast('cancelled delete')}
        />
      </Section>

      <Section title="With warning icon">
        <Button onPress={() => setOpenIcon(true)} backgroundColor="$yellow9">
          Discard draft
        </Button>
        <ConfirmDialog
          open={openIcon}
          onOpenChange={setOpenIcon}
          title="Discard your draft?"
          description="3 unsaved changes will be lost."
          confirmLabel="Discard"
          destructive
          icon={<AlertTriangle size={32} color="$yellow9" />}
          onConfirm={() => setLast('discarded')}
        />
      </Section>

      <YStack paddingTop="$2">
        <SizableText size="$2" color="$color10">
          Last action: {last ?? '—'}
        </SizableText>
      </YStack>
    </ShowcaseFrame>
  )
}
