'use client'
import { AnimatePresence } from 'motion/react'
import React from 'react'

export interface TransitionProps {
  show?: boolean
  children: React.ReactNode
  mode?: 'wait' | 'sync' | 'popLayout'
}

export function Transition({ show = true, children, mode = 'wait' }: TransitionProps) {
  return <AnimatePresence mode={mode}>{show ? children : null}</AnimatePresence>
}
