import { posthog } from './posthog'

export const track = (event: string, props?: Record<string, unknown>) =>
  posthog.capture(event, props)
