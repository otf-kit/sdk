// Skia SkSL shader. Produces a circular shockwave from `iMouse`, displaces
// the source image along the radial direction with chromatic aberration
// (per-channel offset for an analog-lens feel), then crossfades from
// snapshot A → snapshot B as the wave passes over each pixel.
//
// Uniforms set per-frame from the host component. Don't edit unless you
// know what you're doing — the shockStrength / lensingSpread tuning is
// surface-area for users via the public Shockwave props.
export const SHOCKWAVE_SHADER_SOURCE = `
uniform float2 iResolution;
uniform float  iTime;
uniform float2 iMouse;
uniform float  uShockStrength;
uniform float  uLensingSpread;
uniform shader iChannel0;
uniform shader iChannel1;

half4 main(float2 fragCoord) {
  float2 uv = fragCoord / iResolution;
  float2 origin = iMouse / iResolution;

  float t = clamp(iTime, 0.0, 1.0);
  float radius = sqrt(2.0) * t;
  float circle = radius - distance(origin, uv);
  float factor = uShockStrength
                 * sin(t * 3.14159265)
                 * pow(clamp(1.0 - abs(circle), 0.0, 1.0), 20.0);

  float2 delta = origin - uv;
  float2 dir = delta / (length(delta) + 1e-6);

  float2 d0 = (uLensingSpread)        * factor * dir * iResolution;
  float2 d1 = (uLensingSpread * 1.2)  * factor * dir * iResolution;
  float2 d2 = (uLensingSpread * 1.5)  * factor * dir * iResolution;

  half4 a = half4(
    iChannel0.eval(fragCoord + d0).r,
    iChannel0.eval(fragCoord + d1).g,
    iChannel0.eval(fragCoord + d2).b,
    1.0
  );
  half4 b = half4(
    iChannel1.eval(fragCoord + d0).r,
    iChannel1.eval(fragCoord + d1).g,
    iChannel1.eval(fragCoord + d2).b,
    1.0
  );

  half mixT = half(clamp(t + circle * 5.0, 0.0, 1.0));
  return mix(a, b, mixT);
}
`
