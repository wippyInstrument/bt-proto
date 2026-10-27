import { useRef } from 'react'

const AXIS_LOCK_DISTANCE = 10 // px moved before deciding between a swipe and a scroll

/**
 * Horizontal swipe detection that leaves vertical scrolling to the browser.
 *
 * Spread the returned handlers on the swipe area and give it `touch-action: pan-y`:
 * the browser keeps vertical pans (and cancels our pointer when it starts scrolling),
 * while horizontal drags reach us. A gesture locks to one axis after a few pixels, so
 * a mostly-vertical scroll never counts as a swipe.
 *
 * `onSwipeLeft` / `onSwipeRight` are named for the direction the finger moves.
 */
export function useHorizontalSwipe({ onSwipeLeft, onSwipeRight, threshold = 50 }) {
  const gesture = useRef(null)
  const suppressClick = useRef(false)

  function onPointerDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    suppressClick.current = false
    gesture.current = { id: e.pointerId, x: e.clientX, y: e.clientY, axis: null }
  }

  function onPointerMove(e) {
    const g = gesture.current
    if (!g || g.id !== e.pointerId || g.axis) return

    const dx = Math.abs(e.clientX - g.x)
    const dy = Math.abs(e.clientY - g.y)
    if (Math.max(dx, dy) < AXIS_LOCK_DISTANCE) return

    g.axis = dx > dy ? 'x' : 'y'
    // Keep receiving moves for a horizontal swipe even if the pointer leaves the element
    if (g.axis === 'x') e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  function onPointerUp(e) {
    const g = gesture.current
    gesture.current = null
    if (!g || g.id !== e.pointerId || g.axis !== 'x') return

    // A horizontal drag shouldn't also click the button it started on
    suppressClick.current = true

    const dx = e.clientX - g.x
    if (Math.abs(dx) < threshold) return
    if (dx > 0) onSwipeRight?.()
    else onSwipeLeft?.()
  }

  function onPointerCancel() {
    gesture.current = null
  }

  function onClickCapture(e) {
    if (!suppressClick.current) return
    suppressClick.current = false
    e.preventDefault()
    e.stopPropagation()
  }

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel, onClickCapture }
}
