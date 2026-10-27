import { Text } from '../../design-system/Text'
import './SegmentedControl.css'

/**
 * Segmented Control (Figma: "Segmented Control"), a single-select row of equal segments.
 * `options` is a list of { id, label }; the highlight slides to the segment matching `value`.
 * `variant` is "outline" (bordered, 8px inset) | "glass" (Liquid Glass pill, 2px inset).
 */
function SegmentedControl({ options, value, onChange, variant = 'outline', className, ...rest }) {
  const index = Math.max(0, options.findIndex((o) => o.id === value))

  return (
    <div
      role="group"
      className={['segmented-control', `segmented-control--${variant}`, variant === 'glass' && 'ds-glass', className]
        .filter(Boolean)
        .join(' ')}
      style={{ '--segmented-count': options.length, '--segmented-index': index }}
      {...rest}
    >
      <span className="segmented-control__indicator" aria-hidden="true" />
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className="segmented-control__segment"
          aria-pressed={option.id === value}
          onClick={() => onChange?.(option.id)}
        >
          <Text as="span" variant="small-bold" className="segmented-control__label">
            {option.label}
          </Text>
        </button>
      ))}
    </div>
  )
}

export default SegmentedControl
