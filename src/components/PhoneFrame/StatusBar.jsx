import cellularIcon from '../../assets/status-bar/cellular.svg'
import wifiIcon from '../../assets/status-bar/wifi.svg'
import batteryIcon from '../../assets/status-bar/battery.svg'
import './StatusBar.css'

/** Simulated iOS status bar ("On Dark"), only shown inside the desktop phone frame. */
function StatusBar({ time = '9:41', className }) {
  return (
    <div className={['status-bar', className].filter(Boolean).join(' ')} aria-hidden="true">
      <div className="status-bar__time">{time}</div>
      <div className="status-bar__levels">
        <img src={cellularIcon} width="19.2" height="12.2264" alt="" />
        <img src={wifiIcon} width="17.1417" height="12.3283" alt="" />
        <img src={batteryIcon} width="27.328" height="13" alt="" />
      </div>
    </div>
  )
}

export default StatusBar
