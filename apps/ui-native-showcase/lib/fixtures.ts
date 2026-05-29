// ─────────────────────────────────────────────────────────────────────────
// Showcase imagery fixtures — ONE typed source for every real photo the
// interactive demos render. All assets are self-hosted on R2
// (cdn.otf-kit.dev/img/showcase/**), curated + uploaded by
// scripts/fetch-showcase-images.ts. We never hotlink i.pravatar.cc /
// images.unsplash.com (those re-encode/delete → broken demos on buyer
// deploys; AGENTS self-host rule).
//
// Photos: Pexels (free license). Credits are in the script's attribution
// output and docs/lessons.md; Pexels doesn't require in-app attribution but we
// keep the record. To add/replace imagery, edit the manifest in the fetch
// script, re-run it, and update the keys here — never paste a third-party URL.
// ─────────────────────────────────────────────────────────────────────────

const CDN = 'https://cdn.otf-kit.dev/img/showcase'

// ── People — coherent personas reused across swipe / testimonial / chat /
// avatar / profile / app-header so the showcase reads as one product. ───────
export interface Person {
  id: string
  name: string
  role: string
  avatar: string
}

export const PEOPLE: Person[] = [
  { id: 'sarah',  name: 'Sarah Chen',  role: 'Product designer',  avatar: `${CDN}/people/sarah.jpg` },
  { id: 'alex',   name: 'Alex Rivera', role: 'Indie filmmaker',   avatar: `${CDN}/people/alex.jpg` },
  { id: 'jordan', name: 'Jordan Kim',  role: 'Backend engineer',  avatar: `${CDN}/people/jordan.jpg` },
  { id: 'maya',   name: 'Maya Patel',  role: 'Synth builder',     avatar: `${CDN}/people/maya.jpg` },
  { id: 'diego',  name: 'Diego Costa', role: 'Trail runner',      avatar: `${CDN}/people/diego.jpg` },
  { id: 'priya',  name: 'Priya Nair',  role: 'Growth lead',       avatar: `${CDN}/people/priya.jpg` },
]

export function personById(id: string): Person {
  const p = PEOPLE.find((x) => x.id === id)
  if (!p) throw new Error(`fixtures: no person "${id}"`)
  return p
}

/** Avatar URL by id — convenience for demos that only need the image. */
export const avatar = (id: string): string => personById(id).avatar

// ── Swipe-card profiles (dating-style deck) ─────────────────────────────────
// `accent` tints the gradient scrim + match badge so each card stays vivid in
// any theme (theme tokens would render dim in dark palettes).
export interface SwipeProfile {
  id: string
  name: string
  age: number
  bio: string
  image: string
  accent: string
}

export const SWIPE_PROFILES: SwipeProfile[] = [
  { id: '1', name: 'Sarah Chen',  age: 28, bio: 'Climbs rocks, designs interfaces.',          image: `${CDN}/people/sarah.jpg`,  accent: '#0D9488' },
  { id: '2', name: 'Alex Rivera', age: 41, bio: 'Indie filmmaker + dad-joke connoisseur.',    image: `${CDN}/people/alex.jpg`,   accent: '#F97316' },
  { id: '3', name: 'Jordan Kim',  age: 26, bio: 'Late-night hacker, espresso enthusiast.',    image: `${CDN}/people/jordan.jpg`, accent: '#7C3AED' },
  { id: '4', name: 'Maya Patel',  age: 29, bio: 'Designer building tiny synths.',             image: `${CDN}/people/maya.jpg`,   accent: '#DB2777' },
  { id: '5', name: 'Diego Costa', age: 33, bio: 'Trail runner, weekend ceramicist.',          image: `${CDN}/people/diego.jpg`,  accent: '#EF4444' },
]

// ── Products — e-commerce card / carousel demos ─────────────────────────────
export interface Product {
  id: string
  name: string
  price: string
  image: string
  tag?: string
}

export const PRODUCTS: Product[] = [
  { id: 'sneaker',  name: 'Runner Lowtop',  price: '$128', image: `${CDN}/products/sneaker.jpg`,  tag: 'New' },
  { id: 'jacket',   name: 'Denim Jacket',   price: '$96',  image: `${CDN}/products/jacket.jpg` },
  { id: 'backpack', name: 'Field Pack 22L', price: '$164', image: `${CDN}/products/backpack.jpg`, tag: 'Bestseller' },
  { id: 'watch',    name: 'Mono Watch',     price: '$249', image: `${CDN}/products/watch.jpg` },
]

// ── Scenes — editorial / travel imagery for media cards + carousels ─────────
export interface Scene {
  id: string
  title: string
  subtitle: string
  image: string
}

export const SCENES: Scene[] = [
  { id: 'coast',     title: 'Big Sur Coast',   subtitle: 'California, USA',  image: `${CDN}/scenes/coast.jpg` },
  { id: 'mountains', title: 'Dolomite Ridge',  subtitle: 'Golden hour',     image: `${CDN}/scenes/mountains.jpg` },
  { id: 'city',      title: 'Night Districts', subtitle: 'Neon after dark', image: `${CDN}/scenes/city.jpg` },
  { id: 'desert',    title: 'Dune Sea',        subtitle: 'Minimal & warm',  image: `${CDN}/scenes/desert.jpg` },
  { id: 'forest',    title: 'Mist Trail',      subtitle: 'Morning hush',    image: `${CDN}/scenes/forest.jpg` },
  { id: 'cafe',      title: 'Corner Roastery', subtitle: 'Slow mornings',   image: `${CDN}/scenes/cafe.jpg` },
]

// ── Stays — lodging / interior imagery for stay-browse / detail / immersive ─
export interface Stay {
  id: string
  title: string
  location: string
  price: string
  image: string
}

export const STAYS: Stay[] = [
  { id: 'cabin',   title: 'A-Frame in the Pines',  location: 'Big Bear, CA',   price: '$214/night', image: `${CDN}/stays/cabin.jpg` },
  { id: 'loft',    title: 'Sunlit Downtown Loft',  location: 'Lisbon, PT',     price: '$156/night', image: `${CDN}/stays/loft.jpg` },
  { id: 'villa',   title: 'Cliffside Villa & Pool', location: 'Santorini, GR', price: '$498/night', image: `${CDN}/stays/villa.jpg` },
  { id: 'bedroom', title: 'Boutique Hotel Suite',  location: 'Kyoto, JP',      price: '$182/night', image: `${CDN}/stays/bedroom.jpg` },
]
