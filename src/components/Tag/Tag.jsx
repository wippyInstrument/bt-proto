import { Text } from '../../design-system/Text'
import './Tag.css'

// Label text color per variant (design-system/tokens.css)
const LABEL_COLOR = {
  default: 'inverse',
  subtle: 'default',
  danger: 'on-danger',
  positive: 'on-positive',
  warning: 'on-warning',
  inverse: 'default',
}

/**
 * Tag (Figma: "Tag"), a small label / chip / badge.
 *
 * `variant` is "default" (white) | "subtle" | "danger" | "positive" | "warning" | "inverse" (dark).
 */
function Tag({ variant = 'default', className, children, ...rest }) {
  return (
    <span className={['tag', `tag--${variant}`, className].filter(Boolean).join(' ')} {...rest}>
      <Text variant="caption-2" color={LABEL_COLOR[variant]} className="tag__label">
        {children}
      </Text>
    </span>
  )
}

export default Tag
