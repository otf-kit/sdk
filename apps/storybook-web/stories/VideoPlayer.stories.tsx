import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { VideoPlayer, type VideoChapter } from '@otf/ui'

const SAMPLE_SRC =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
const SAMPLE_POSTER =
  'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg'

const CHAPTERS: VideoChapter[] = [
  { time: 0, title: 'Cold open' },
  { time: 60, title: 'Bunny wakes up' },
  { time: 180, title: 'Forest encounter' },
  { time: 360, title: 'The chase' },
  { time: 540, title: 'Showdown' },
]

const meta: Meta<typeof VideoPlayer> = {
  title: 'Data/VideoPlayer',
  component: VideoPlayer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}
export default meta
type Story = StoryObj<typeof VideoPlayer>

export const Default: Story = {
  render: () => (
    <div className="max-w-3xl">
      <VideoPlayer src={SAMPLE_SRC} poster={SAMPLE_POSTER} />
    </div>
  ),
}

export const WithChapters: Story = {
  render: () => (
    <div className="max-w-3xl">
      <VideoPlayer src={SAMPLE_SRC} poster={SAMPLE_POSTER} chapters={CHAPTERS} />
    </div>
  ),
}

export const Autoplay: Story = {
  render: () => (
    <div className="max-w-3xl">
      <VideoPlayer
        src={SAMPLE_SRC}
        poster={SAMPLE_POSTER}
        autoPlay
        loop
        muted
        controls={false}
      />
    </div>
  ),
}

export const MinimalControls: Story = {
  render: () => (
    <div className="max-w-3xl">
      <VideoPlayer
        src={SAMPLE_SRC}
        poster={SAMPLE_POSTER}
        controls={false}
      />
    </div>
  ),
}

export const WithCallbacks: Story = {
  render: () => {
    const [log, setLog] = React.useState<string[]>([])
    const push = (msg: string) =>
      setLog((l) => [`${new Date().toLocaleTimeString()}  ${msg}`, ...l].slice(0, 8))
    return (
      <div className="max-w-3xl space-y-3">
        <VideoPlayer
          src={SAMPLE_SRC}
          poster={SAMPLE_POSTER}
          onPlay={() => push('play')}
          onPause={() => push('pause')}
          onTimeUpdate={(t, d) =>
            push(`timeupdate ${t.toFixed(1)}s / ${d.toFixed(1)}s`)
          }
          onEnded={() => push('ended')}
        />
        <pre className="rounded-md border border-border bg-muted/30 p-3 font-mono text-xs leading-relaxed">
          {log.length === 0 ? 'Events will appear here…' : log.join('\n')}
        </pre>
      </div>
    )
  },
}
