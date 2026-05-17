import { useState } from 'react'
import {
  OtfDialog,
  OtfButton,
  YStack,
  XStack,
  SizableText,
  OtfInput,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function OtfDialogShowcase() {
  const [basicOpen, setBasicOpen] = useState(false)
  const [destructiveOpen, setDestructiveOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [name, setName] = useState('Sarah Chen')

  return (
    <ShowcaseFrame
      title="Dialog"
      description="Centered modal with adaptive bottom-sheet on touch. Use for confirmations and short forms."
      docPath="packages/ui-native/src/patterns/OtfDialog.tsx"
    >
      <Section title="Basic confirm">
        <XStack>
          <OtfDialog
            open={basicOpen}
            onOpenChange={setBasicOpen}
            trigger={<OtfButton>Open dialog</OtfButton>}
            title="Save changes?"
            description="Your edits will be applied to all team members."
            confirmLabel="Save"
            cancelLabel="Cancel"
            onConfirm={() => setBasicOpen(false)}
            onCancel={() => setBasicOpen(false)}
          />
        </XStack>
      </Section>

      <Section title="Destructive">
        <XStack>
          <OtfDialog
            open={destructiveOpen}
            onOpenChange={setDestructiveOpen}
            trigger={<OtfButton theme="red">Delete project</OtfButton>}
            title="Delete this project?"
            description="This permanently removes all data. There is no undo."
            confirmLabel="Delete"
            cancelLabel="Cancel"
            confirmTheme="red"
            onConfirm={() => setDestructiveOpen(false)}
            onCancel={() => setDestructiveOpen(false)}
          />
        </XStack>
      </Section>

      <Section title="With form content">
        <XStack>
          <OtfDialog
            open={formOpen}
            onOpenChange={setFormOpen}
            trigger={<OtfButton variant="outlined">Edit profile</OtfButton>}
            title="Edit profile"
            description="Updates apply across all your devices."
            confirmLabel="Save profile"
            cancelLabel="Cancel"
            onConfirm={() => setFormOpen(false)}
            onCancel={() => setFormOpen(false)}
          >
            <YStack gap="$3">
              <YStack gap="$1.5">
                <SizableText size="$2" color="$color11" fontWeight="600">Name</SizableText>
                <OtfInput value={name} onChangeText={setName} />
              </YStack>
              <YStack gap="$1.5">
                <SizableText size="$2" color="$color11" fontWeight="600">Email</SizableText>
                <OtfInput value="mock@otf-kit.dev" />
              </YStack>
            </YStack>
          </OtfDialog>
        </XStack>
      </Section>

      <Section title="Static — no actions">
        <XStack>
          <OtfDialog
            trigger={<OtfButton variant="outlined">Show info</OtfButton>}
            title="What's new in 1.4"
            description="Faster onboarding, redesigned settings, and 12 new patterns."
          >
            <YStack gap="$2">
              <SizableText size="$3" color="$color11">
                Tap outside or press Escape to dismiss.
              </SizableText>
            </YStack>
          </OtfDialog>
        </XStack>
      </Section>
    </ShowcaseFrame>
  )
}
