import { useState } from 'react'
import './ModeGlow.css'

/**
 * Bottom-of-screen glow for the Play/Train mode: blue in Play, the Train colour in Train.
 * Lives at the app level so it carries across pages; pages stack their content above it
 * (see the z-index notes in ModeGlow.css).
 *
 * `trainGlow` ("orange" | "teal") picks the Train glow colour (secret settings panel).
 */
function ModeGlow({ mode, trainGlow = 'orange', className }) {
  // Set on the first mode change so the switch swell never plays on load
  const [prevMode, setPrevMode] = useState(mode)
  const [animated, setAnimated] = useState(false)
  if (mode !== prevMode) {
    setPrevMode(mode)
    setAnimated(true)
  }

  return (
    <div
      className={['mode-glow', `mode-glow--${mode}`, animated && 'mode-glow--animated', className].filter(Boolean).join(' ')}
      data-train-glow={trainGlow}
      aria-hidden="true"
    >
      <div className="mode-glow__shape" />
    </div>
  )
}

export default ModeGlow
