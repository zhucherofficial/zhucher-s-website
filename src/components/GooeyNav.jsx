import { useEffect, useRef, useState } from 'react'
import './GooeyNav.css'

const noise = (n = 1) => n / 2 - Math.random() * n

function getXY(distance, pointIndex, totalPoints) {
  const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180)
  return [distance * Math.cos(angle), distance * Math.sin(angle)]
}

function createParticle(i, t, d, r, particleCount, colors) {
  const rotate = noise(r / 10)
  return {
    start: getXY(d[0], particleCount - i, particleCount),
    end: getXY(d[1] + noise(7), particleCount - i, particleCount),
    time: t,
    scale: 1 + noise(0.2),
    color: colors[Math.floor(Math.random() * colors.length)],
    rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
  }
}

const GooeyNav = ({
  items,
  onNavigate,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
}) => {
  const containerRef = useRef(null)
  const navRef = useRef(null)
  const filterRef = useRef(null)
  const textRef = useRef(null)
  const burstFrameRef = useRef(null)
  const burstIdRef = useRef(0)
  const burstResetRef = useRef(null)
  const particlesResetRef = useRef(null)
  const [particles, setParticles] = useState([])
  const [burstActive, setBurstActive] = useState(false)
  const [burstLabel, setBurstLabel] = useState('')
  const activeIndex = initialActiveIndex
  const activeLabel = items[activeIndex]?.label ?? ''

  const makeParticles = (label) => {
    const bubbleTime = animationTime * 2 + timeVariance
    burstIdRef.current += 1
    const burstId = burstIdRef.current
    const nextParticles = []

    for (let i = 0; i < particleCount; i += 1) {
      const t = animationTime * 2 + noise(timeVariance * 2)
      const p = createParticle(i, t, particleDistances, particleR, particleCount, colors)
      nextParticles.push({
        ...p,
        id: `${burstId}-${i}`,
      })
    }

    window.cancelAnimationFrame(burstFrameRef.current)
    window.clearTimeout(burstResetRef.current)
    window.clearTimeout(particlesResetRef.current)

    setParticles(nextParticles)
    setBurstLabel(label)
    setBurstActive(false)

    burstFrameRef.current = window.requestAnimationFrame(() => {
      setBurstActive(true)
    })

    burstResetRef.current = window.setTimeout(() => {
      setBurstActive(false)
    }, 360)

    particlesResetRef.current = window.setTimeout(() => {
      setParticles([])
      setBurstLabel('')
    }, bubbleTime + 180)
  }

  const updateEffectPosition = (element) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return
    const containerRect = containerRef.current.getBoundingClientRect()
    const pos = element.getBoundingClientRect()

    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    }
    Object.assign(filterRef.current.style, styles)
    Object.assign(textRef.current.style, styles)
  }

  const handleClick = (event, label) => {
    const liEl = event.currentTarget

    updateEffectPosition(liEl)

    makeParticles(label)
  }

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      const liEl = event.currentTarget.parentElement
      if (liEl) {
        handleClick({ currentTarget: liEl }, items[index].label)
      }
      event.preventDefault()
      onNavigate?.(items[index].href)
    }
  }

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return undefined
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex]
    if (activeLi) {
      updateEffectPosition(activeLi)
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex]
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi)
      }
    })

    resizeObserver.observe(containerRef.current)
    return () => {
      resizeObserver.disconnect()
    }
  }, [activeIndex])

  useEffect(
    () => () => {
      window.cancelAnimationFrame(burstFrameRef.current)
      window.clearTimeout(burstResetRef.current)
      window.clearTimeout(particlesResetRef.current)
    },
    [],
  )

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <nav aria-label="Primary navigation">
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li key={item.href} className={activeIndex === index ? 'active' : ''}>
              <a
                href={item.href}
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
                    return
                  }
                  event.preventDefault()
                  handleClick({ currentTarget: event.currentTarget.parentElement }, item.label)
                  if (index === initialActiveIndex && window.location.pathname + window.location.hash === item.href) {
                    return
                  }
                  onNavigate?.(item.href)
                }}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className={`effect filter ${burstActive ? 'active' : ''}`} ref={filterRef}>
        {particles.map((particle) => (
          <span
            className="particle"
            key={particle.id}
            style={{
              '--start-x': `${particle.start[0]}px`,
              '--start-y': `${particle.start[1]}px`,
              '--end-x': `${particle.end[0]}px`,
              '--end-y': `${particle.end[1]}px`,
              '--time': `${particle.time}ms`,
              '--scale': particle.scale,
              '--color': `var(--gooey-color-${particle.color}, white)`,
              '--rotate': `${particle.rotate}deg`,
            }}
          >
            <span className="point" />
          </span>
        ))}
      </span>
      <span className={`effect text ${burstActive ? 'active' : ''}`} ref={textRef}>
        {burstLabel || activeLabel}
      </span>
    </div>
  )
}

export default GooeyNav
