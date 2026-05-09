import type { RefObject } from 'react'
import { Platform, type View } from 'react-native'
import { makeImageFromView, type SkImage } from '@shopify/react-native-skia'
import type { ShockwaveValue } from './types'

// Skia's `makeImageFromView` is native-only. On web it requires a callback
// that returns a SkImage from a DOM snapshot — we don't ship one, so this
// component gracefully no-ops on web and the showcase routes the user to
// the OTF preview app QR instead.
const webNoopCallback = () => Promise.resolve<SkImage | null>(null)

/**
 * Snapshots both slot views as Skia images. Returns the pair labelled
 * by previous / next active value so the shader can read them as
 * iChannel0 (current) and iChannel1 (target). Returns null if either
 * snapshot fails — caller should fall back to an instant swap.
 */
export async function snapshotPair(
  fromRef: RefObject<View>,
  toRef: RefObject<View>,
  prev: ShockwaveValue,
  next: ShockwaveValue,
): Promise<{ from: SkImage; to: SkImage } | null> {
  const callback = Platform.OS === 'web' ? webNoopCallback : null
  const fromImg = await makeImageFromView(
    fromRef as RefObject<View>,
    callback,
  )
  const toImg = await makeImageFromView(
    toRef as RefObject<View>,
    callback,
  )
  if (!fromImg || !toImg) return null
  const fromSnapshot = prev === 'from' ? fromImg : toImg
  const toSnapshot = next === 'from' ? fromImg : toImg
  return { from: fromSnapshot, to: toSnapshot }
}
