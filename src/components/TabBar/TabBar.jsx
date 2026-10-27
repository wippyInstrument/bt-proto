import { useLayoutEffect, useRef } from 'react'
import { useLongPress } from '../../hooks/useLongPress.js'
import './TabBar.css'

/**
 * Tabs in the order they appear in the bar. `symbol` is a combined icon + label
 * glyph (used as a mask) shown when the tab is selected; `icon` is shown with a
 * text label otherwise. A tab without an `icon` shows its symbol in both states.
 */
const TABS = [
  { id: 'home', label: 'Home', symbol: '/icons/tab-bar/home.svg' },
  { id: 'my-bag', label: 'My Bag', icon: '/icons/tab-bar/my-bag.svg', iconSize: 28 },
  { id: 'play', label: 'Play', icon: '/icons/tab-bar/play.svg', iconSize: 28, symbol: '/icons/tab-bar/play-symbol.svg' },
  { id: 'profile', label: 'Profile', icon: '/icons/tab-bar/person.svg', iconSize: 28 },
]

/**
 * Floating tab bar (Figma: "Tab Bar"). `onTabChange` / `onTabLongPress` are called
 * with the tab id. One selection pill slides between tabs, measured from the active
 * button; while `pressedTab` is set (e.g. its long-press menu is open) the pill moves
 * there instead and brightens (Figma: "Press highlight").
 */
function TabBar({ activeTab = 'home', pressedTab, onTabChange, onTabLongPress, className }) {
  const barRef = useRef(null)
  const selectionRef = useRef(null)
  const bindLongPress = useLongPress(onTabLongPress)
  const selectedTab = pressedTab ?? activeTab

  useLayoutEffect(() => {
    const bar = barRef.current
    const selection = selectionRef.current

    function place() {
      const button = bar.querySelector(`[data-tab="${selectedTab}"]`)
      selection.hidden = !button
      if (!button) return
      // Figma: the selection overhangs its button by 2px on each side
      selection.style.setProperty('--tab-bar-selection-x', `${button.offsetLeft - 2}px`)
      selection.style.setProperty('--tab-bar-selection-width', `${button.offsetWidth + 4}px`)
    }

    place()
    // Enable the slide only after the first placement, so it doesn't fly in on load
    if (!selection.dataset.ready) {
      selection.getBoundingClientRect()
      selection.dataset.ready = 'true'
    }

    const observer = new ResizeObserver(place)
    observer.observe(bar)
    return () => observer.disconnect()
  }, [selectedTab])

  return (
    <nav className={['tab-bar', className].filter(Boolean).join(' ')} aria-label="Main">
      <div ref={barRef} className="tab-bar__bar ds-glass">
        <span
          ref={selectionRef}
          className={['tab-bar__selection', pressedTab && 'tab-bar__selection--pressed'].filter(Boolean).join(' ')}
          aria-hidden="true"
        />

        {TABS.map((tab) => {
          const isActive = tab.id === activeTab
          const showSymbol = Boolean(tab.symbol) && (isActive || !tab.icon)
          return (
            <button
              key={tab.id}
              type="button"
              data-tab={tab.id}
              className={['tab-bar__button', isActive && 'tab-bar__button--active'].filter(Boolean).join(' ')}
              aria-current={isActive ? 'page' : undefined}
              aria-label={tab.label}
              onClick={() => onTabChange?.(tab.id)}
              {...bindLongPress(tab.id)}
            >
              {tab.symbol && (
                <span
                  className={['tab-bar__symbol', !showSymbol && 'tab-bar__layer--hidden'].filter(Boolean).join(' ')}
                  aria-hidden="true"
                  style={{ '--tab-bar-symbol': `url("${tab.symbol}")` }}
                >
                  <span className="tab-bar__symbol-shade" />
                  <span className="tab-bar__symbol-tint" />
                </span>
              )}

              {tab.icon && (
                <span className={['tab-bar__plain', showSymbol && 'tab-bar__layer--hidden'].filter(Boolean).join(' ')} aria-hidden="true">
                  <span className="tab-bar__icon">
                    <img src={tab.icon} width={tab.iconSize} height={tab.iconSize} alt="" />
                  </span>
                  <span className="tab-bar__label">{tab.label}</span>
                </span>
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default TabBar
