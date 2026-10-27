import React from "react";

/**
 * Text: renders any BTG Clubhouse DS text style.
 *
 * @param {object} props
 * @param {string} [props.variant="body"]  One of the keys of DEFAULT_ELEMENT below.
 * @param {string} [props.as]              Element override, e.g. "h2", "label", "span".
 * @param {string} [props.color]           "default" | "subtle" | "disabled" | "placeholder" | "link" |
 *                                         "inverse" | "inverse-subdued" | "danger" | "positive" |
 *                                         "on-accent" | "on-positive" | "on-danger" | "on-warning" |
 *                                         "on-blue-tees-golf" | "on-scout-ai"
 * @param {string} [props.className]
 */
const DEFAULT_ELEMENT = {
  "large-number-1": "span",
  "large-number-2": "span",
  "large-number-3": "span",
  "number-1": "span",
  "number-2": "span",
  "number-3": "span",
  "number-4": "span",
  "title-1": "h1",
  "title-2": "h2",
  "title-3": "h3",
  "title-4": "h4",
  large: "p",
  "large-bold": "p",
  body: "p",
  "body-bold": "p",
  small: "p",
  "small-bold": "p",
  tiny: "span",
  "tiny-bold": "span",
  "caption-1": "span",
  "caption-2": "span",
};

export const TEXT_VARIANTS = Object.keys(DEFAULT_ELEMENT);

export const Text = React.forwardRef(function Text(
  { variant = "body", as, color, className, children, ...rest },
  ref
) {
  const Component = as || DEFAULT_ELEMENT[variant] || "span";
  const classes = [
    "ds-text",
    `ds-text-${variant}`,
    color && `ds-color-${color}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component ref={ref} className={classes} {...rest}>
      {children}
    </Component>
  );
});

export default Text;
