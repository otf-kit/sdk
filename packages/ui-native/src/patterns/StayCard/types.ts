import type { ReactNode } from 'react'

export interface StayCategoryChip {
  /** Display label, e.g. "Hotel" / "Villa". */
  label: string
  /** Highlight as the active filter. */
  active?: boolean
  /** Press handler — fires for every chip, active or not. */
  onPress?: () => void
}

export interface StayListing {
  /** Image URL (remote PNG/JPG). Square or landscape both work. */
  image: string
  /** Listing title (e.g. property name). */
  title: string
  /** Address / location line. */
  address: string
  /** Rating 0-5 with one decimal — shown as a star + number. */
  rating?: number
  /** Bed count for the chip row. */
  bed?: number
  /** Bath count. */
  bath?: number
  /** Square footage / size — used by the detail screen. */
  sqft?: number
  /** Price per night (whole number). */
  pricePerNight?: number
  /** Owner / lister name shown in the detail subtitle. */
  ownerName?: string
}

export interface StayBrowseScreenProps {
  /** Greeting line at the top, default "Good morning". */
  greeting?: string
  /** Multi-line headline below the greeting (use \n for line breaks). */
  headline?: string
  /** Category filter chips. */
  categories?: StayCategoryChip[]
  /** The featured listing card. */
  listing: StayListing
  /** Tap the heart icon. */
  onFavorite?: () => void
  /** Override the wrapper background — defaults to a soft warm off-white. */
  backgroundColor?: string
}

export interface StayDetailMetric {
  label: string
  value: ReactNode
  /** Optional inline icon to the left of the value. */
  icon?: ReactNode
}

export interface StayDetailScreenProps {
  /** The listing being booked. */
  listing: StayListing
  /** Override the metric row (defaults to bed/bath/wifi). */
  metrics?: StayDetailMetric[]
  /** Section eyebrow above the price, default "BOOKING DETAILS". */
  eyebrow?: string
  /** Reserve button label, default "Reserve now". */
  ctaLabel?: string
  /** Reserve button press. */
  onReserve?: () => void
  /** Override the wrapper background (the dark booking sheet) — default near-black. */
  backgroundColor?: string
  /** Override the CTA tint — defaults to OTF accent orange. */
  ctaColor?: string
}
