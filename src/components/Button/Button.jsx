import { forwardRef } from 'react'
import { Text } from '../../design-system/Text'
import './Button.css'

// Label text style and text color per size / variant (design-system/typography.css, tokens.css)
const LABEL_VARIANT = {
  small: 'small-bold',
  medium: 'body-bold',
  large: 'body-bold',
}

const LABEL_COLOR = {
  glass: 'default',
  prominent: 'inverse',
  blue: 'on-blue-tees-golf',
}

/**
 * Button (Figma: "Overlay Button").
 *
 * `variant` is "glass" | "prominent" (white) | "blue" (Blue Tees Golf) and `size` is
 * "small" (36px) | "medium" (52px) | "large" (64px). `icon` should use `currentColor` so it
 * follows the variant; pass `<ButtonPlaceholderIcon />` for the Figma placeholder.
 * Omit `children` for an icon-only (circular) button and pass `aria-label` instead.
 */
const Button = forwardRef(function Button(
  { variant = 'glass', size = 'small', icon, type = 'button', className, children, ...rest },
  ref
) {
  const iconOnly = children == null || children === false
  const classes = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    iconOnly && 'button--icon-only',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button ref={ref} type={type} className={classes} {...rest}>
      <span className={['button__fill', variant === 'glass' && 'ds-glass'].filter(Boolean).join(' ')} aria-hidden="true" />
      {icon && (
        <span className="button__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {!iconOnly && (
        <Text as="span" variant={LABEL_VARIANT[size]} color={LABEL_COLOR[variant]} className="button__label">
          {children}
        </Text>
      )}
    </button>
  )
})

/** Figma "Placeholder" icon; sized by the button and tinted with the label color. */
export function ButtonPlaceholderIcon() {
  return <span className="button__placeholder" />
}

export default Button
