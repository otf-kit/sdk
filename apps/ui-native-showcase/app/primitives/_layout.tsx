import { Slot } from 'expo-router'

// Sidebar lives at the root layout; this group passes children through
// so the URL is /primitives/<slug>.
export default function PrimitivesLayout() {
  return <Slot />
}
