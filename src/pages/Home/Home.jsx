import courseImage from '../../assets/home/course.png'
import trainImage from '../../assets/home/train.png'
import { Text } from '../../design-system/Text'
import Button from '../../components/Button/Button.jsx'
import ScrollEdgeBlur from '../../components/ScrollEdgeBlur/ScrollEdgeBlur.jsx'
import SegmentedControl from '../../components/SegmentedControl/SegmentedControl.jsx'
import Tag from '../../components/Tag/Tag.jsx'
import { useHorizontalSwipe } from '../../hooks/useHorizontalSwipe.js'
import './Home.css'

const MODES = [
  { id: 'play', label: 'Play', image: courseImage, cta: 'Set up a round' },
  { id: 'train', label: 'Train', image: trainImage, cta: 'Start Session' },
]

/** Play mode body: course summary (Figma: "Loop W / A1 · Home · Play mode (Option A)"). */
function PlayContent() {
  return (
    <section className="home__course-info" aria-labelledby="home-course-name">
      <Button
        size="large"
        className="home__preview-button"
        icon={<img src="/icons/home/eye.svg" width={24} height={24} alt="" />}
        aria-label="Preview course"
      />

      <div className="home__title">
        <Tag variant="subtle">IQ 8.7</Tag>
        <Text as="h1" id="home-course-name" variant="number-3">Bandon Dunes</Text>
      </div>

      <ul className="home__conditions">
        <li className="home__condition">
          <img src="/icons/home/tee.svg" width={16} height={16} alt="" />
          <Text as="span" variant="small-bold">Bandon, OR</Text>
        </li>
        <li className="home__divider" aria-hidden="true">
          <img src="/icons/home/divider.svg" width={1} height={32} alt="" />
        </li>
        <li className="home__condition">
          <img src="/icons/home/sun.svg" width={16} height={16} alt="" />
          <Text as="span" variant="small-bold">58</Text>
          <img className="home__degree" src="/icons/home/degree.svg" width={4} height={4} alt="degrees" />
        </li>
        <li className="home__divider" aria-hidden="true">
          <img src="/icons/home/divider.svg" width={1} height={32} alt="" />
        </li>
        <li className="home__condition">
          <img src="/icons/home/location.svg" width={16} height={16} alt="" />
          <Text as="span" variant="small-bold">5 mph</Text>
        </li>
      </ul>
    </section>
  )
}

/** Train mode body: session summary (Figma: "Loop W / A2 · Home · Train mode (Option A)"). */
function TrainContent() {
  return (
    <section className="home__session-info" aria-labelledby="home-session-name">
      <Text variant="caption-1" color="subtle">Train · Rainmaker connected · 15 min</Text>
      <Text as="h1" id="home-session-name" variant="number-3">Find your real carries</Text>
    </section>
  )
}

/**
 * Home, with Play and Train modes switched by the header control or a horizontal swipe.
 * The mode is shared across pages (App.jsx), which also draws the mode glow.
 */
function Home({ mode = 'play', onModeChange }) {
  function selectMode(id) {
    if (id !== mode) onModeChange?.(id)
  }

  const swipe = useHorizontalSwipe({
    onSwipeRight: () => selectMode('train'),
    onSwipeLeft: () => selectMode('play'),
  })
  const current = MODES.find((m) => m.id === mode)

  return (
    <main className={['home', `home--${mode}`].join(' ')} {...swipe}>
      <div className="home__backdrop">
        {MODES.map((m) => (
          <img
            key={m.id}
            className={['home__photo', `home__photo--${m.id}`, m.id === mode && 'home__photo--active'].filter(Boolean).join(' ')}
            src={m.image}
            alt=""
          />
        ))}
        <div className="home__fade" />
      </div>

      <div className="home__content">
        {/* Keyed by mode so the body fades in again on each switch */}
        <div key={`body-${mode}`} className="home__mode-body">
          {mode === 'play' ? <PlayContent /> : <TrainContent />}
        </div>

        <div key={`cta-${mode}`} className="home__cta">
          <Button variant="blue" size="large">{current.cta}</Button>
        </div>
      </div>

      {/* Always shown and drawn above everything else, so content scrolls under its blur */}
      <header className="home__header">
        <ScrollEdgeBlur />

        <div className="home__actions">
          <div className="home__action">
            <Button
              size="medium"
              icon={<img src="/icons/home/notification.svg" width={20} height={20} alt="" />}
              aria-label="Notifications"
            />
            <img className="home__action-dot" src="/icons/home/notification-dot.svg" width={12} height={12} alt="" />
          </div>
          <SegmentedControl
            variant="glass"
            className="home__modes"
            aria-label="Mode"
            options={MODES}
            value={mode}
            onChange={selectMode}
          />
          <div className="home__action">
            <Button
              size="medium"
              icon={<img src="/icons/home/device.svg" width={20} height={20} alt="" />}
              aria-label={mode === 'train' ? 'Devices, Rainmaker connected' : 'Devices'}
            />
            {mode === 'train' && (
              <img className="home__action-dot" src="/icons/home/device-dot.svg" width={12} height={12} alt="" />
            )}
          </div>
        </div>
      </header>
    </main>
  )
}

export default Home
