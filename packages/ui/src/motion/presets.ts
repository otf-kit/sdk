import type { TargetAndTransition } from 'motion/react'

export type MotionPreset =
  | 'fadeIn' | 'fadeOut'
  | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight'
  | 'scaleIn' | 'scaleOut'
  | 'blurIn' | 'blurOut'
  | 'none'

export interface MotionVariants {
  initial: TargetAndTransition
  animate: TargetAndTransition
  exit: TargetAndTransition
}

export const MOTION_PRESETS: Record<MotionPreset, MotionVariants> = {
  fadeIn:     { initial: { opacity: 0 },           animate: { opacity: 1 },           exit: { opacity: 0 } },
  fadeOut:    { initial: { opacity: 1 },           animate: { opacity: 0 },           exit: { opacity: 1 } },
  slideUp:    { initial: { opacity: 0, y: 16 },    animate: { opacity: 1, y: 0 },     exit: { opacity: 0, y: 16 } },
  slideDown:  { initial: { opacity: 0, y: -16 },   animate: { opacity: 1, y: 0 },     exit: { opacity: 0, y: -16 } },
  slideLeft:  { initial: { opacity: 0, x: 16 },    animate: { opacity: 1, x: 0 },     exit: { opacity: 0, x: 16 } },
  slideRight: { initial: { opacity: 0, x: -16 },   animate: { opacity: 1, x: 0 },     exit: { opacity: 0, x: -16 } },
  scaleIn:    { initial: { opacity: 0, scale: 0.92 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.92 } },
  scaleOut:   { initial: { opacity: 1, scale: 1 }, animate: { opacity: 0, scale: 0.92 }, exit: { opacity: 1, scale: 1 } },
  blurIn:     { initial: { opacity: 0, filter: 'blur(8px)' }, animate: { opacity: 1, filter: 'blur(0px)' }, exit: { opacity: 0, filter: 'blur(8px)' } },
  blurOut:    { initial: { opacity: 1, filter: 'blur(0px)' }, animate: { opacity: 0, filter: 'blur(8px)' }, exit: { opacity: 1, filter: 'blur(0px)' } },
  none:       { initial: {}, animate: {}, exit: {} },
}

export const DEFAULT_TRANSITION = {
  duration: 0.2,
  ease: [0.16, 1, 0.3, 1] as const, // ease-out-expo (BezierDefinition)
}
