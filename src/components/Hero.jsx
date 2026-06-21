import { useEffect, useState } from 'react'
import BorderGlow from './BorderGlow'
import TrueFocus from './TrueFocus'

const heroBackgroundMedia = [
  {
    type: 'video',
    src: '/hero-media/robot-hero.mp4',
    poster: '/hero-media/robot-close.jpg',
    duration: 9000,
    objectPosition: '50% 50%',
  },
  {
    type: 'image',
    src: '/hero-media/robot-close.jpg',
    duration: 5400,
    objectPosition: '50% 46%',
  },
  {
    type: 'image',
    src: '/hero-media/student-build.jpg',
    duration: 5400,
    objectPosition: '58% 62%',
  },
  {
    type: 'image',
    src: '/hero-media/robot-wide.jpg',
    duration: 5400,
    objectPosition: '46% 52%',
  },
  {
    type: 'image',
    src: '/hero-media/circuit-board.jpg',
    duration: 5400,
    objectPosition: '46% 48%',
  },
]

export function Hero() {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0)
  const activeMedia = heroBackgroundMedia[activeMediaIndex]

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveMediaIndex((index) => (index + 1) % heroBackgroundMedia.length)
    }, activeMedia.duration)

    return () => window.clearTimeout(timer)
  }, [activeMedia.duration, activeMediaIndex])

  return (
    <section className="hero-section" id="home">
      <div className="hero-media-stage" aria-hidden="true">
        {activeMedia.type === 'video' ? (
          <video
            key={activeMedia.src}
            className="hero-media hero-media--video"
            autoPlay
            muted
            loop
            playsInline
            poster={activeMedia.poster}
            style={{ objectPosition: activeMedia.objectPosition }}
          >
            <source src={activeMedia.src} type="video/mp4" />
          </video>
        ) : (
          <img
            key={activeMedia.src}
            className="hero-media hero-media--image"
            src={activeMedia.src}
            alt=""
            style={{ objectPosition: activeMedia.objectPosition }}
          />
        )}
      </div>
      <div className="hero-background" aria-hidden="true" />

      <div className="hero-content page-shell">
        <div className="hero-copy" aria-label="Portfolio introduction">
          <h1>
            Build
            <span>systems that move.</span>
          </h1>
          <p>
            A high-school physics and engineering portfolio shaped by robotics, experimental data,
            and science outreach.
          </p>
        </div>

        <BorderGlow
          className="hero-feature-glow hero-feature-glow--control"
          edgeSensitivity={24}
          glowColor="176 72 74"
          backgroundColor="rgba(8, 17, 23, 0.68)"
          borderRadius={42}
          glowRadius={54}
          glowIntensity={0.82}
          coneSpread={22}
          animated
          colors={['#8be7dc', '#d6ed6f', '#ff8d61']}
          fillOpacity={0.28}
        >
          <aside className="hero-feature-card" aria-label="Featured project preview">
            <div className="feature-visual">
              <img src="/hero-media/circuit-board.jpg" alt="" />
            </div>
            <div className="feature-copy">
              <small>case 01</small>
              <h2>Embedded control</h2>
              <p>Signals, sensors, and moving hardware.</p>
            </div>
          </aside>
        </BorderGlow>

        <BorderGlow
          className="hero-feature-glow hero-feature-glow--robot"
          edgeSensitivity={24}
          glowColor="19 84 73"
          backgroundColor="rgba(5, 11, 15, 0.72)"
          borderRadius={42}
          glowRadius={54}
          glowIntensity={0.88}
          coneSpread={22}
          animated
          colors={['#8be7dc', '#ff8d61', '#d6ed6f']}
          fillOpacity={0.3}
        >
          <aside className="hero-feature-card" aria-label="Robot project preview">
            <div className="feature-visual feature-visual--robot">
              <img src="/hero-media/robot-wide.jpg" alt="" />
            </div>
            <div className="feature-copy">
              <small>case 02</small>
              <h2>Robot motion</h2>
              <p>Structure, balance, and autonomous movement.</p>
            </div>
          </aside>
        </BorderGlow>

        <div className="hero-focus-title" aria-label="Physics Engineering">
          <TrueFocus
            sentence="Physics Engineering"
            blurAmount={2.6}
            borderColor="#8be7dc"
            glowColor="rgba(139, 231, 220, 0.58)"
            animationDuration={0.72}
            pauseBetweenAnimations={1.15}
          />
        </div>
      </div>
    </section>
  )
}
