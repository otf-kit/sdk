import React from 'react'

export interface SparklineProps {
  data: number[]
  type?: 'line' | 'area'
  color?: string
  height?: number
  width?: number
  className?: string
}

function buildPath(data: number[], w: number, h: number): string {
  if (data.length < 2) return ''
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pad = 2
  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2)
    const y = pad + (1 - (v - min) / range) * (h - pad * 2)
    return `${x},${y}`
  })
  return `M ${points.join(' L ')}`
}

export function Sparkline({
  data,
  type = 'line',
  color = 'hsl(var(--primary))',
  height = 32,
  width = 100,
  className,
}: SparklineProps) {
  const path = buildPath(data, width, height)
  if (!path) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pad = 2
  const lastY = pad + (1 - (data[data.length - 1] - min) / range) * (height - pad * 2)

  const areaPath = type === 'area'
    ? `${path} L ${width - pad},${height - pad} L ${pad},${height - pad} Z`
    : undefined

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {type === 'area' && areaPath && (
        <path d={areaPath} fill={color} fillOpacity={0.15} stroke="none" />
      )}
      <path d={path} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={width - pad} cy={lastY} r={2} fill={color} />
    </svg>
  )
}
