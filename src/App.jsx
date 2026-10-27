import { useState } from 'react'
import ModeGlow from './components/ModeGlow/ModeGlow.jsx'
import ModeMenu from './components/ModeMenu/ModeMenu.jsx'
import PhoneFrame from './components/PhoneFrame/PhoneFrame.jsx'
import SettingsPanel from './components/SettingsPanel/SettingsPanel.jsx'
import TabBar from './components/TabBar/TabBar.jsx'
import Home from './pages/Home/Home.jsx'
import Play from './pages/Play/Play.jsx'
import { useSettings } from './hooks/useSettings.js'
import './App.css'

// Tabs with a page; the others in the tab bar don't navigate yet
const PAGES = { home: Home, play: Play }

function App() {
  const [settings, updateSetting] = useSettings()
  const [tab, setTab] = useState('home')
  // Play/Train mode, shared by every page and shown by the glow
  const [mode, setMode] = useState('play')
  // Long-pressing the Play tab, from any page, opens a Play/Train shortcut menu;
  // choosing a mode there goes to the Play page in that mode
  const [modeMenuOpen, setModeMenuOpen] = useState(false)

  const Page = PAGES[tab]

  return (
    <>
      <PhoneFrame>
        <Page mode={mode} onModeChange={setMode} />
        <ModeGlow mode={mode} trainGlow={settings.trainGlow} />
        <ModeMenu
          open={modeMenuOpen}
          onSelect={(id) => {
            setMode(id)
            setTab('play')
            setModeMenuOpen(false)
          }}
          onClose={() => setModeMenuOpen(false)}
        />
        <TabBar
          className="app__tab-bar"
          activeTab={tab}
          pressedTab={modeMenuOpen ? 'play' : undefined}
          onTabChange={(id) => {
            setModeMenuOpen(false)
            if (PAGES[id]) setTab(id)
          }}
          onTabLongPress={(id) => id === 'play' && setModeMenuOpen(true)}
        />
      </PhoneFrame>
      <SettingsPanel settings={settings} onChange={updateSetting} />
    </>
  )
}

export default App
