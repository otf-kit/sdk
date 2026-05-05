import { useState } from 'react'
import {
  NotificationBanner,
  YStack,
  Button,
  SizableText,
  CheckCircle2,
  Info,
  AlertTriangle,
  XCircle,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function NotificationBannerShowcase() {
  const [showSuccess, setShowSuccess] = useState(true)
  const [showInfo, setShowInfo] = useState(true)
  const [showWarning, setShowWarning] = useState(true)
  const [showError, setShowError] = useState(true)

  const allDismissed = !showSuccess && !showInfo && !showWarning && !showError

  return (
    <ShowcaseFrame
      title="Notification Banner"
      description="Inline status banner. Four tones (info, success, warning, error), each optionally dismissible or pressable."
      docPath="packages/ui-native/src/patterns/NotificationBanner.tsx"
    >
      <Section title="Tones — non-dismissible">
        <YStack gap="$2">
          <NotificationBanner
            variant="info"
            title="New release available"
            message="Version 2.3 ships with offline mode and faster sync."
            icon={<Info size={18} />}
          />
          <NotificationBanner
            variant="success"
            title="Workout saved"
            message="Pushed to your Monday log."
            icon={<CheckCircle2 size={18} />}
          />
          <NotificationBanner
            variant="warning"
            title="Heads up — quota at 80%"
            message="Upgrade your plan to avoid throttling."
            icon={<AlertTriangle size={18} />}
          />
          <NotificationBanner
            variant="error"
            title="Sync failed"
            message="Couldn't reach the server. We'll retry shortly."
            icon={<XCircle size={18} />}
          />
        </YStack>
      </Section>

      <Section
        title="Dismissible"
        hint={allDismissed ? 'All dismissed — tap reset' : 'Tap × to dismiss'}
      >
        <YStack gap="$2">
          {showSuccess && (
            <NotificationBanner
              variant="success"
              title="Invite sent to Sarah Chen"
              message="They'll appear once they accept."
              icon={<CheckCircle2 size={18} />}
              onDismiss={() => setShowSuccess(false)}
            />
          )}
          {showInfo && (
            <NotificationBanner
              variant="info"
              title="3 updates ready"
              message="Tap to review pending review items."
              icon={<Info size={18} />}
              onDismiss={() => setShowInfo(false)}
              onPress={() => {}}
            />
          )}
          {showWarning && (
            <NotificationBanner
              variant="warning"
              title="Card expires soon"
              message="Visa ending 4242 expires next month."
              icon={<AlertTriangle size={18} />}
              onDismiss={() => setShowWarning(false)}
            />
          )}
          {showError && (
            <NotificationBanner
              variant="error"
              title="Upload failed for 2 files"
              icon={<XCircle size={18} />}
              onDismiss={() => setShowError(false)}
            />
          )}
          {allDismissed && (
            <Button
              alignSelf="flex-start"
              size="$3"
              onPress={() => {
                setShowSuccess(true)
                setShowInfo(true)
                setShowWarning(true)
                setShowError(true)
              }}
            >
              Reset banners
            </Button>
          )}
        </YStack>
      </Section>

      <Section title="Title only" hint="Compact mode without body copy">
        <YStack gap="$2">
          <NotificationBanner variant="success" title="Saved" />
          <NotificationBanner variant="error" title="Couldn't save changes" />
        </YStack>
        <SizableText size="$2" color="$color10">
          Useful inside dense list items or toolbars.
        </SizableText>
      </Section>
    </ShowcaseFrame>
  )
}
