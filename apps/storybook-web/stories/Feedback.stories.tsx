import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Banner, LoadingOverlay, Stepper } from '@otf/ui'

const meta: Meta = { title: 'Feedback/Banner, LoadingOverlay, Stepper', tags: ['autodocs'] }
export default meta

export const BannerInfo: StoryObj = {
  name: 'Banner - Info',
  render: () => (
    <Banner
      variant="info"
      title="New update available"
      description="Refresh the page to get the latest features."
      action={{ label: 'Refresh now', onClick: () => {} }}
      dismissible
    />
  ),
}

export const BannerSuccess: StoryObj = {
  name: 'Banner - Success',
  render: () => (
    <Banner
      variant="success"
      title="Deployment succeeded"
      description="Your app is live."
      dismissible
    />
  ),
}

export const BannerWarning: StoryObj = {
  name: 'Banner - Warning',
  render: () => (
    <Banner
      variant="warning"
      title="Trial ending soon"
      description="Your free trial expires in 3 days. Upgrade to keep access."
      action={{ label: 'Upgrade plan', onClick: () => {} }}
    />
  ),
}

export const BannerError: StoryObj = {
  name: 'Banner - Error',
  render: () => (
    <Banner
      variant="error"
      title="Build failed"
      description="There was an error during deployment. Check the logs for details."
      action={{ label: 'View logs', onClick: () => {} }}
      dismissible
    />
  ),
}

export const BannerAllVariants: StoryObj = {
  name: 'Banner - All variants',
  render: () => (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      <Banner variant="info"    title="Info"    description="Something you should know about." dismissible />
      <Banner variant="success" title="Success" description="Everything went smoothly."        dismissible />
      <Banner variant="warning" title="Warning" description="Might need your attention."       dismissible />
      <Banner variant="error"   title="Error"   description="Something went wrong."            dismissible />
      <Banner variant="neutral" title="Neutral" description="A general notice."                dismissible />
    </div>
  ),
}

export const LoadingOverlayStory: StoryObj = {
  name: 'LoadingOverlay',
  render: () => (
    <LoadingOverlay loading text="Saving changes...">
      <div className="rounded border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
        Content behind the overlay
      </div>
    </LoadingOverlay>
  ),
}

const stepDefs = [
  { title: 'Account',  description: 'Create your account' },
  { title: 'Profile',  description: 'Set up your profile' },
  { title: 'Billing',  description: 'Add payment method' },
  { title: 'Done',     description: 'Review and confirm' },
]

export const StepperStep1: StoryObj = {
  name: 'Stepper - Step 1',
  render: () => <Stepper currentStep={0} steps={stepDefs} className="max-w-2xl" />,
}
export const StepperStep3: StoryObj = {
  name: 'Stepper - Step 3',
  render: () => <Stepper currentStep={2} steps={stepDefs} className="max-w-2xl" />,
}
export const StepperComplete: StoryObj = {
  name: 'Stepper - Complete',
  render: () => <Stepper currentStep={4} steps={stepDefs} className="max-w-2xl" />,
}
