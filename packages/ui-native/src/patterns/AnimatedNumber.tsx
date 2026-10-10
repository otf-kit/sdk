import { OtfText, type OtfTextProps } from '../primitives/Text'
import { useCountUp } from '../hooks/useCountUp'

export interface AnimatedNumberProps extends Omit<OtfTextProps, 'children'> {
  /** Number to show. Every change tweens from the currently shown figure. */
  value: number
  /** Starting figure of the first count. Default `0`. */
  from?: number
  /** Count length in ms. Default `1200`; `0` renders `value` statically. */
  duration?: number
  /** Wait in ms before counting. Default `0`. */
  delay?: number
  /** Values with an absolute value below this render statically. Default `10`. */
  countMin?: number
  /** Decimal places. Default `0`. */
  decimals?: number
  /** Text before the number, e.g. `$`. */
  prefix?: string
  /** Text after the number, e.g. `%`. */
  suffix?: string
  /** `true` (default) groups thousands, `false` prints plain digits, a function formats the figure itself. */
  format?: boolean | ((n: number) => string)
  /** Locale for thousands grouping when `format` is `true`. Default `en-US`. */
  locale?: string
}

const FIGURE_SPACE = '\u2007'

/**
 * Number that counts up to `value`. Shares `value`, `from`, `duration`, `decimals`,
 * `prefix`, `suffix`, `format` and `locale` with the web `AnimatedNumber`; adds `delay`,
 * `countMin` and `variant`; has no `autoStart` (no scroll-into-view trigger on native) or `easing`.
 * Blank figure spaces hold the final width so the count never shifts layout.
 *
 * @example
 * <AnimatedNumber value={coins} duration={450} delay={300} prefix="+" />
 */
export function AnimatedNumber({
  value,
  from = 0,
  duration = 1200,
  delay = 0,
  countMin,
  decimals = 0,
  prefix = '',
  suffix = '',
  format = true,
  locale = 'en-US',
  variant = 'display',
  style,
  ...textProps
}: AnimatedNumberProps) {
  const safe = Number.isFinite(value) ? value : 0
  const shown = useCountUp(safe, { delay, duration, countMin, from, decimals })
  const fmt = (n: number) =>
    prefix +
    (typeof format === 'function'
      ? format(n)
      : format
        ? n.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : n.toFixed(decimals)) +
    suffix
  const final = fmt(safe)
  return (
    <OtfText
      variant={variant}
      numberOfLines={1}
      accessibilityLabel={final}
      {...textProps}
      style={[{ fontVariant: ['tabular-nums'] }, style]}
    >
      {(shown === null ? '' : fmt(shown)).padStart(final.length, FIGURE_SPACE)}
    </OtfText>
  )
}

AnimatedNumber.displayName = 'AnimatedNumber'
