import onTheCourseImage from '../../assets/play/on-the-course.png'
import onRainmakerImage from '../../assets/play/on-rainmaker.png'
import { Text } from '../../design-system/Text'
import ScrollEdgeBlur from '../../components/ScrollEdgeBlur/ScrollEdgeBlur.jsx'
import SegmentedControl from '../../components/SegmentedControl/SegmentedControl.jsx'
import { useHorizontalSwipe } from '../../hooks/useHorizontalSwipe.js'
import './Play.css'

const MODES = [
  { id: 'play', label: 'Play', title: 'How are you playing today?' },
  { id: 'train', label: 'Train', title: 'How are you training today?' },
]

/** Ways into a session. Not tappable yet. */
const WAYS_IN = [
  {
    id: 'course',
    title: 'On the course',
    detail: 'Bandon Trails · Sat 8:10 AM',
    image: onTheCourseImage,
    icon: { src: '/icons/play/sessions.svg', width: 12, height: 20 },
  },
  {
    id: 'rainmaker',
    title: 'On Rainmaker',
    detail: 'Lag putting plan · 15 min',
    image: onRainmakerImage,
    icon: { src: '/icons/play/train-target.svg', width: 22, height: 22 },
  },
]

function WayInCard({ way }) {
  return (
    <article className="play__way" aria-labelledby={`play-way-${way.id}`}>
      <img className="play__way-photo" src={way.image} alt="" />
      <ScrollEdgeBlur edge="bottom" className="play__way-blur" />

      <div className="play__way-badge">
        <img
          className={`play__way-icon play__way-icon--${way.id}`}
          src={way.icon.src}
          width={way.icon.width}
          height={way.icon.height}
          alt=""
        />
      </div>

      <div className="play__way-text">
        <h2 id={`play-way-${way.id}`} className="play__way-title">{way.title}</h2>
        <Text variant="caption-2" className="play__way-detail">{way.detail}</Text>
      </div>

      <img className="play__way-chevron" src="/icons/play/chevron.svg" width={20} height={20} alt="" />
    </article>
  )
}

/**
 * Play tab (Figma: "Modes / B1 · Play tab · three ways in"). The Play/Train control
 * (or a horizontal swipe) switches the shared mode, which drives the app's glow.
 */
function Play({ mode = 'play', onModeChange }) {
  const swipe = useHorizontalSwipe({
    onSwipeRight: () => onModeChange?.('train'),
    onSwipeLeft: () => onModeChange?.('play'),
  })
  const current = MODES.find((m) => m.id === mode)

  return (
    <main className="play" {...swipe}>
      <div className="play__scroll">
        <div className="play__content">
          {/* Keyed by mode so the title fades in again on each switch */}
          <Text key={mode} as="h1" variant="large-bold" className="play__title">
            {current.title}
          </Text>

          {WAYS_IN.map((way) => (
            <WayInCard key={way.id} way={way} />
          ))}
        </div>
      </div>

      {/* Drawn above the scrolling content, so it scrolls under the blur */}
      <header className="play__header">
        <ScrollEdgeBlur />
        <SegmentedControl
          className="play__modes"
          aria-label="Mode"
          options={MODES}
          value={mode}
          onChange={onModeChange}
        />
      </header>
    </main>
  )
}

export default Play
