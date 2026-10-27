import courseImage from '../../assets/home/course.png'
import scrollEdgeMask from '../../assets/home/scroll-edge-mask.svg'
import './Home.css'

/** Home · Play mode (Figma: "Loop W / A1 · Home · Play mode (Option A)"). */
function Home() {
  return (
    <main className="home">
      <div className="home__backdrop">
        <img className="home__course" src={courseImage} alt="" />
        <div className="home__fade" />
      </div>

      <header className="home__header">
        <div
          className="home__scroll-edge"
          style={{ maskImage: `url("${scrollEdgeMask}")`, WebkitMaskImage: `url("${scrollEdgeMask}")` }}
        />
      </header>

      <div className="home__glow" aria-hidden="true">
        <div className="home__glow-shape" />
      </div>
    </main>
  )
}

export default Home
