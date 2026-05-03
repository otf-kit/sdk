'use client'

import React from 'react'
import ReactCrop, {
  type Crop,
  type PixelCrop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { cn } from '../utils/cn'

export type { Crop, PixelCrop } from 'react-image-crop'

export type ImageCropProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onComplete'
> & {
  /** Image URL — required. */
  src: string
  /** Optional aspect-ratio lock, e.g. 16/9, 1, 4/3. */
  aspect?: number
  /** Minimum crop width in pixels. */
  minWidth?: number
  /** Minimum crop height in pixels. */
  minHeight?: number
  /** Initial crop in % values. */
  defaultCrop?: { x: number; y: number; width: number; height: number }
  /** Render a circular crop mask (for avatars). Default false. */
  circular?: boolean
  /** Fired (debounced) after a drag with the cropped data URL + pixel crop. */
  onComplete?: (result: { croppedSrc: string; crop: PixelCrop }) => void
  /** Output image format. Default 'png'. */
  outputFormat?: 'png' | 'jpeg' | 'webp'
  /** Output image quality 0..1 (jpeg/webp only). Default 0.92. */
  outputQuality?: number
  /** Alt text for the source image. */
  alt?: string
}

const DEBOUNCE_MS = 200

function buildDefaultCrop(
  defaultCrop: ImageCropProps['defaultCrop'],
  aspect: number | undefined,
  imgWidth: number,
  imgHeight: number,
): Crop {
  if (defaultCrop) {
    return {
      unit: '%',
      x: defaultCrop.x,
      y: defaultCrop.y,
      width: defaultCrop.width,
      height: defaultCrop.height,
    }
  }
  if (aspect) {
    return centerCrop(
      makeAspectCrop({ unit: '%', width: 80 }, aspect, imgWidth, imgHeight),
      imgWidth,
      imgHeight,
    )
  }
  return { unit: '%', x: 10, y: 10, width: 80, height: 80 }
}

async function extractCroppedDataUrl(
  image: HTMLImageElement,
  crop: PixelCrop,
  format: 'png' | 'jpeg' | 'webp',
  quality: number,
): Promise<string> {
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(crop.width * scaleX))
  canvas.height = Math.max(1, Math.round(crop.height * scaleY))
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height,
  )
  const mime =
    format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png'
  return canvas.toDataURL(mime, quality)
}

/**
 * Drag-to-crop image utility built on `react-image-crop`.
 * Supports aspect-ratio lock, circular masking, and emits a base64 data URL
 * of the cropped region via `onComplete` (debounced 200ms).
 */
export const ImageCrop = React.forwardRef<HTMLDivElement, ImageCropProps>(
  (
    {
      src,
      aspect,
      minWidth,
      minHeight,
      defaultCrop,
      circular = false,
      onComplete,
      outputFormat = 'png',
      outputQuality = 0.92,
      alt = 'Crop source',
      className,
      ...props
    },
    ref,
  ) => {
    const [crop, setCrop] = React.useState<Crop | undefined>(undefined)
    const imgRef = React.useRef<HTMLImageElement | null>(null)
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    React.useEffect(() => {
      // Reset when src changes so the next image initializes its own crop.
      setCrop(undefined)
    }, [src])

    React.useEffect(() => {
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    }, [])

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget
      setCrop(buildDefaultCrop(defaultCrop, aspect, width, height))
    }

    const handleComplete = (pixelCrop: PixelCrop) => {
      if (!onComplete || !imgRef.current) return
      if (pixelCrop.width === 0 || pixelCrop.height === 0) return
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(async () => {
        const img = imgRef.current
        if (!img) return
        const croppedSrc = await extractCroppedDataUrl(
          img,
          pixelCrop,
          outputFormat,
          outputQuality,
        )
        onComplete({ croppedSrc, crop: pixelCrop })
      }, DEBOUNCE_MS)
    }

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md border border-border bg-card p-2 text-foreground',
          // ReactCrop CSS overrides — match our tokens
          '[&_.ReactCrop\\_\\_crop-selection]:border-foreground',
          '[&_.ReactCrop\\_\\_drag-handle::after]:bg-foreground',
          '[&_.ReactCrop\\_\\_drag-handle::after]:border-background',
          circular &&
            '[&_.ReactCrop\\_\\_crop-selection]:[mask-image:radial-gradient(circle,black_99%,transparent_100%)]',
          className,
        )}
        {...props}
      >
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={handleComplete}
          aspect={aspect}
          minWidth={minWidth}
          minHeight={minHeight}
          circularCrop={circular}
          keepSelection
          className="max-w-full"
        >
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            onLoad={onImageLoad}
            className="block max-h-[70vh] w-auto select-none"
            draggable={false}
            crossOrigin="anonymous"
          />
        </ReactCrop>
      </div>
    )
  },
)
ImageCrop.displayName = 'ImageCrop'
