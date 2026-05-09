// Route shell for the Shockwave demo.
//
// Shockwave depends on @shopify/react-native-skia + react-native-worklets —
// neither runs faithfully on web. We don't try to approximate; instead we
// show the standard MobileOnlyFallback (badge + QR codes pointing at the
// OTF preview build).
//
// Native (iOS / Android via Expo Dev Client / preview build) loads the
// real demo with the full Skia shockwave shader.
import { Platform } from 'react-native'
import ShockwaveDemoNative from '../../components/shockwave-demo'
import { MobileOnlyFallback } from '../../components/MobileOnlyFallback'

export default function ShockwaveScreen() {
  if (Platform.OS === 'web') {
    return (
      <MobileOnlyFallback
        title="Shockwave"
        description="Skia-shader transition between two views. The wave displaces the source image with chromatic aberration as it passes from origin to edge."
        tags={['Skia', 'Reanimated', 'Worklets']}
      />
    )
  }
  return <ShockwaveDemoNative />
}
