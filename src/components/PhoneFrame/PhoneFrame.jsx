import StatusBar from './StatusBar.jsx'
import './PhoneFrame.css'

/**
 * On wide (desktop) viewports, wraps the app in an iPhone-sized frame with a
 * simulated status bar. On phone-sized viewports the frame and status bar are
 * hidden by CSS and the app fills the screen.
 */
function PhoneFrame({ children }) {
  return (
    <div className="phone-frame">
      <div className="phone-frame__device">
        <div className="phone-frame__screen">{children}</div>
        <StatusBar className="phone-frame__status-bar" />
      </div>
    </div>
  )
}

export default PhoneFrame
