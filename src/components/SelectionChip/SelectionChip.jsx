import { Text } from '../../design-system/Text'
import './SelectionChip.css'

/**
 * Selection Chip (Figma: "Selection Chip"), one option in a single-select group.
 * `active` marks the selected chip; it's exposed to assistive tech via `aria-pressed`.
 */
function SelectionChip({ active = false, type = 'button', className, children, ...rest }) {
  return (
    <button
      type={type}
      className={['selection-chip', active && 'selection-chip--active', className].filter(Boolean).join(' ')}
      aria-pressed={active}
      {...rest}
    >
      <Text as="span" variant="body" className="selection-chip__label">
        {children}
      </Text>
    </button>
  )
}

export default SelectionChip
