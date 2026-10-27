import { useEffect, useState } from 'react'
import { Text } from '../../design-system/Text'
import './SettingsPanel.css'

const TRAIN_GLOW_OPTIONS = [
  { value: 'orange', label: 'Orange' },
  { value: 'teal', label: 'Teal' },
]

function isTyping(target) {
  return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
}

/**
 * Secret prototype settings. Hidden until toggled: press "S" on a keyboard, or tap
 * with three fingers at once on a touch screen. Escape also closes it.
 */
function SettingsPanel({ settings, onChange }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key.toLowerCase() !== 's' || e.repeat || e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return
      setOpen((o) => !o)
    }

    // touchstart fires per finger; the third finger landing is the toggle
    function onTouchStart(e) {
      if (e.touches.length === 3) setOpen((o) => !o)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('touchstart', onTouchStart)
    }
  }, [])

  if (!open) return null

  return (
    <aside className="settings-panel ds-glass" aria-label="Prototype settings">
      <div className="settings-panel__header">
        <Text as="h2" variant="small-bold">Settings</Text>
        <button type="button" className="settings-panel__close" aria-label="Close settings" onClick={() => setOpen(false)}>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <label className="settings-panel__row">
        <Text as="span" variant="small" color="subtle">Train glow color</Text>
        <span className="settings-panel__select">
          <select value={settings.trainGlow} onChange={(e) => onChange('trainGlow', e.target.value)}>
            {TRAIN_GLOW_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
            <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </label>

      <Text variant="caption-2" color="placeholder" className="settings-panel__hint">
        <span className="settings-panel__hint--desktop">Press S to close</span>
        <span className="settings-panel__hint--touch">Tap with 3 fingers to close</span>
      </Text>
    </aside>
  )
}

export default SettingsPanel
