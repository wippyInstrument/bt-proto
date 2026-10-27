import { useState } from 'react'

const STORAGE_KEY = 'bt-proto:settings'

export const DEFAULT_SETTINGS = {
  trainGlow: 'orange', // 'orange' | 'teal'
}

function load() {
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) }
  } catch {
    return DEFAULT_SETTINGS
  }
}

/** Prototype settings, remembered in this browser between visits. */
export function useSettings() {
  const [settings, setSettings] = useState(load)

  function updateSetting(key, value) {
    setSettings((prev) => {
      const next = { ...prev, [key]: value }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // Storage unavailable (private mode etc.): the setting still applies for this visit
      }
      return next
    })
  }

  return [settings, updateSetting]
}
