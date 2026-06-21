import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import './TrueFocus.css'

const TrueFocus = ({
  sentence = 'True Focus',
  separator = ' ',
  manualMode = false,
  blurAmount = 5,
  borderColor = 'green',
  glowColor = 'rgba(0, 255, 0, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  className = '',
}) => {
  const words = sentence.split(separator)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lastActiveIndex, setLastActiveIndex] = useState(null)
  const containerRef = useRef(null)
  const wordRefs = useRef([])
  const focusFrameRef = useRef(null)
  const [focusRect, setFocusRect] = useState(null)

  const updateFocusRect = useCallback(() => {
    if (currentIndex === null || currentIndex === -1) return
    if (!wordRefs.current[currentIndex] || !containerRef.current) return

    const parentRect = containerRef.current.getBoundingClientRect()
    const activeRect = wordRefs.current[currentIndex].getBoundingClientRect()

    const nextRect = {
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    }

    if (focusFrameRef.current) {
      focusFrameRef.current.style.transform = `translateX(${nextRect.x}px) translateY(${nextRect.y}px)`
      focusFrameRef.current.style.width = `${nextRect.width}px`
      focusFrameRef.current.style.height = `${nextRect.height}px`
      focusFrameRef.current.style.opacity = '1'
    }

    setFocusRect(nextRect)
  }, [currentIndex])

  useEffect(() => {
    if (manualMode) return undefined

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, (animationDuration + pauseBetweenAnimations) * 1000)

    return () => clearInterval(interval)
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length])

  useLayoutEffect(() => {
    updateFocusRect()
  }, [updateFocusRect, words.length])

  useEffect(() => {
    updateFocusRect()
    const resizeObserver = new ResizeObserver(() => {
      updateFocusRect()
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    const frame = window.requestAnimationFrame(updateFocusRect)

    return () => {
      resizeObserver.disconnect()
      window.cancelAnimationFrame(frame)
    }
  }, [updateFocusRect])

  const handleMouseEnter = (index) => {
    if (manualMode) {
      setLastActiveIndex(index)
      setCurrentIndex(index)
    }
  }

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex)
    }
  }

  return (
    <div className={`focus-container ${className}`} ref={containerRef}>
      {words.map((word, index) => {
        const isActive = index === currentIndex
        return (
          <span
            key={word}
            ref={(el) => {
              wordRefs.current[index] = el
            }}
            className={`focus-word ${manualMode ? 'manual' : ''} ${isActive && !manualMode ? 'active' : ''}`}
            style={{
              filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
              '--border-color': borderColor,
              '--glow-color': glowColor,
              transition: `filter ${animationDuration}s ease`,
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        )
      })}

      <motion.div
        ref={focusFrameRef}
        className="focus-frame"
        animate={{
          x: focusRect?.x ?? 0,
          y: focusRect?.y ?? 0,
          width: focusRect?.width ?? 0,
          height: focusRect?.height ?? 0,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{
          duration: animationDuration,
        }}
        style={{
          '--border-color': borderColor,
          '--glow-color': glowColor,
        }}
      >
        <span className="corner top-left" />
        <span className="corner top-right" />
        <span className="corner bottom-left" />
        <span className="corner bottom-right" />
      </motion.div>
    </div>
  )
}

export default TrueFocus
