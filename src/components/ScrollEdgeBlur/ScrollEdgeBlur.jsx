import './ScrollEdgeBlur.css'

const LAYERS = [1, 2, 3, 4, 5]

/**
 * Progressive blur along a screen or card edge (Figma: "Scroll Edge Effect").
 * Fills its positioned parent; size it with `className`. `edge` is the side
 * where the blur is strongest ("top" | "bottom").
 */
function ScrollEdgeBlur({ edge = 'top', className }) {
  return (
    <div className={['scroll-edge-blur', `scroll-edge-blur--${edge}`, className].filter(Boolean).join(' ')} aria-hidden="true">
      {LAYERS.map((layer) => (
        <div key={layer} className="scroll-edge-blur__layer" />
      ))}
    </div>
  )
}

export default ScrollEdgeBlur
