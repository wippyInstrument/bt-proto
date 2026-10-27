import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Text } from '../../design-system/Text'
import './ModeMenu.css'

const OPTIONS = [
  { id: 'play', label: 'Play', icon: '/icons/tab-bar/play.svg' },
  { id: 'train', label: 'Train', icon: '/icons/play/train-target.svg' },
]

function optionAt(x, y) {
  return document.elementFromPoint(x, y)?.closest('.mode-menu__item')?.dataset.mode
}

/**
 * Play tab shortcut menu (Figma: "Loop W / S1 · Long-press Play · shortcut menu"):
 * a blurred scrim over the page and a glass menu above the Play tab. Choosing an
 * option calls `onSelect(mode)`; tapping the scrim or pressing Escape calls `onClose`.
 *
 * Like an iOS context menu, the finger that long-pressed the tab can slide straight
 * onto an option and let go to choose it. Letting go anywhere else leaves the menu
 * open for a tap.
 */
function ModeMenu({ open, onSelect, onClose }) {
  // Option under the pointer, highlighted while sliding across the menu
  const [hovered, setHovered] = useState(null)
  const [prevOpen, setPrevOpen] = useState(open)
  if (open !== prevOpen) {
    setPrevOpen(open)
    setHovered(null)
  }

  useEffect(() => {
    if (!open) return
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose?.()
    }
    // Window-level, as a touch stays captured by the tab it started on
    function onPointerMove(e) {
      setHovered(optionAt(e.clientX, e.clientY) ?? null)
    }
    function onPointerUp(e) {
      const option = optionAt(e.clientX, e.clientY)
      if (option) onSelect?.(option)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [open, onSelect, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="scrim"
          className="mode-menu__scrim"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
      {open && (
        <motion.div
          key="menu"
          role="menu"
          aria-label="Mode"
          className="mode-menu ds-glass"
          initial={{ opacity: 0, scale: 0.6, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ type: 'spring', duration: 0.4, bounce: 0.25 }}
        >
          {OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              role="menuitem"
              data-mode={option.id}
              className={['mode-menu__item', option.id === hovered && 'mode-menu__item--hovered'].filter(Boolean).join(' ')}
              // Pointer releases are handled above; this keeps keyboard activation working
              onClick={(e) => e.detail === 0 && onSelect?.(option.id)}
            >
              <img src={option.icon} width={20} height={20} alt="" />
              <Text as="span" variant="body" className="mode-menu__label">{option.label}</Text>
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ModeMenu
