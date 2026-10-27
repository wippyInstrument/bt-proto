import { useRef } from 'react'

const MOVE_TOLERANCE = 10 // px a press can drift before it no longer counts as a long press

/**
 * Long-press detection for a set of elements, keyed by id.
 *
 * Returns `bind(id)`, which gives the handlers to spread on each element. `onLongPress(id)`
 * fires once the press has been held for `delay` ms; the click that follows the release is
 * swallowed so the element's normal tap action doesn't also run. A right-click (or the
 * platform's own long-press context menu) counts as a long press too.
 */
export function useLongPress(onLongPress, { delay = 450 } = {}) {
  const press = useRef(null)
  const fired = useRef(false)

  function cancel() {
    if (press.current) clearTimeout(press.current.timer)
    press.current = null
  }

  function bind(id) {
    if (!onLongPress) return {}

    return {
      onPointerDown(e) {
        if (e.pointerType === 'mouse' && e.button !== 0) return
        cancel()
        fired.current = false
        press.current = {
          x: e.clientX,
          y: e.clientY,
          timer: setTimeout(() => {
            press.current = null
            fired.current = true
            onLongPress(id)
          }, delay),
        }
      },
      onPointerMove(e) {
        const p = press.current
        if (p && Math.hypot(e.clientX - p.x, e.clientY - p.y) > MOVE_TOLERANCE) cancel()
      },
      onPointerUp: cancel,
      onPointerLeave: cancel,
      onPointerCancel: cancel,
      onContextMenu(e) {
        e.preventDefault()
        cancel()
        fired.current = true
        onLongPress(id)
      },
      onClickCapture(e) {
        if (!fired.current) return
        fired.current = false
        e.preventDefault()
        e.stopPropagation()
      },
    }
  }

  return bind
}
