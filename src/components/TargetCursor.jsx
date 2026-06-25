import { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import './TargetCursor.css'

const getContainingBlock = (element) => {
  let node = element?.parentElement

  while (node && node !== document.documentElement) {
    const style = getComputedStyle(node)

    if (
      style.transform !== 'none' ||
      style.perspective !== 'none' ||
      style.filter !== 'none' ||
      style.willChange.includes('transform') ||
      style.willChange.includes('perspective') ||
      style.willChange.includes('filter') ||
      /paint|layout|strict|content/.test(style.contain)
    ) {
      return node
    }

    node = node.parentElement
  }

  return null
}

const getContainingBlockOffset = (block) => {
  if (!block) return { x: 0, y: 0 }

  const rect = block.getBoundingClientRect()
  return { x: rect.left + block.clientLeft, y: rect.top + block.clientTop }
}

export function TargetCursor({
  targetSelector = '.target-cursor-hit',
  color = '#8be7dc',
  activeColor = '#d6ed6f',
  cursorColor,
  cursorColorOnTarget,
  spinDuration = 2.2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true,
}) {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const cornersRef = useRef(null)
  const spinTimelineRef = useRef(null)
  const containingBlockRef = useRef(null)
  const targetCornerPositionsRef = useRef(null)
  const tickerFnRef = useRef(null)
  const activeStrengthRef = useRef(0)

  const baseColor = cursorColor ?? color
  const targetColor = cursorColorOnTarget ?? activeColor

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false

    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isSmallScreen = window.innerWidth <= 768
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
    const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase())

    return (hasTouchScreen && isSmallScreen) || isMobileUserAgent
  }, [])

  const constants = useMemo(
    () => ({
      borderWidth: 2,
      cornerSize: 13,
    }),
    []
  )

  useEffect(() => {
    if (isMobile || !cursorRef.current) return undefined

    const cursor = cursorRef.current
    const dot = dotRef.current
    const originalCursor = document.body.style.cursor
    cornersRef.current = cursor.querySelectorAll('.target-cursor-corner')
    containingBlockRef.current = getContainingBlock(cursor)

    if (hideDefaultCursor) {
      document.body.style.cursor = 'none'
    }

    let activeTarget = null
    let currentLeaveHandler = null
    let resumeTimeout = null
    let pointerFrame = 0
    const pointerRef = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const cursorQuickX = gsap.quickTo(cursor, 'x', { duration: 0.12, ease: 'power3.out' })
    const cursorQuickY = gsap.quickTo(cursor, 'y', { duration: 0.12, ease: 'power3.out' })

    const getOffset = () => getContainingBlockOffset(containingBlockRef.current)

    const cleanupTarget = (target) => {
      if (target && currentLeaveHandler) {
        target.removeEventListener('mouseleave', currentLeaveHandler)
      }

      currentLeaveHandler = null
    }

    const resetTicker = () => {
      if (tickerFnRef.current) {
        gsap.ticker.remove(tickerFnRef.current)
      }
    }

    const initialOffset = getOffset()
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2 - initialOffset.x,
      y: window.innerHeight / 2 - initialOffset.y,
      rotation: 0,
      scale: 1,
    })

    const createSpinTimeline = () => {
      spinTimelineRef.current?.kill()
      spinTimelineRef.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' })
    }

    createSpinTimeline()

    tickerFnRef.current = () => {
      if (!targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current) {
        return
      }

      const strength = activeStrengthRef.current
      if (strength === 0) return

      const cursorX = gsap.getProperty(cursorRef.current, 'x')
      const cursorY = gsap.getProperty(cursorRef.current, 'y')

      Array.from(cornersRef.current).forEach((corner, index) => {
        const currentX = gsap.getProperty(corner, 'x')
        const currentY = gsap.getProperty(corner, 'y')
        const targetX = targetCornerPositionsRef.current[index].x - cursorX
        const targetY = targetCornerPositionsRef.current[index].y - cursorY
        const follow = parallaxOn ? Math.max(0.12, strength * 0.2) : strength
        const finalX = currentX + (targetX - currentX) * follow
        const finalY = currentY + (targetY - currentY) * follow

        gsap.set(corner, {
          x: finalX,
          y: finalY,
        })
      })
    }

    const leaveTarget = () => {
      resetTicker()

      targetCornerPositionsRef.current = null
      activeTarget = null
      gsap.killTweensOf(activeStrengthRef)
      gsap.set(activeStrengthRef, { current: 0 })

      const corners = Array.from(cornersRef.current ?? [])

      gsap.to(corners, {
        borderColor: baseColor,
        duration: 0.15,
        ease: 'power2.out',
      })

      if (dotRef.current) {
        gsap.to(dotRef.current, {
          backgroundColor: baseColor,
          scale: 1,
          duration: 0.15,
          ease: 'power2.out',
        })
      }

      gsap.to(cursor, { scale: 1, duration: 0.18, ease: 'power2.out' })
      gsap.killTweensOf(corners, 'x,y')

      const positions = [
        { x: constants.cornerSize * -1.5, y: constants.cornerSize * -1.5 },
        { x: constants.cornerSize * 0.5, y: constants.cornerSize * -1.5 },
        { x: constants.cornerSize * 0.5, y: constants.cornerSize * 0.5 },
        { x: constants.cornerSize * -1.5, y: constants.cornerSize * 0.5 },
      ]

      corners.forEach((corner, index) => {
        gsap.to(corner, {
          x: positions[index].x,
          y: positions[index].y,
          duration: 0.3,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      })

      resumeTimeout = window.setTimeout(() => {
        if (!activeTarget && spinTimelineRef.current) {
          spinTimelineRef.current.restart()
        }

        resumeTimeout = null
      }, 50)
    }

    const activateTarget = (target) => {
      if (!target || !cursorRef.current || !cornersRef.current) return
      if (activeTarget === target) return

      if (activeTarget) {
        cleanupTarget(activeTarget)
        resetTicker()
      }

      if (resumeTimeout) {
        window.clearTimeout(resumeTimeout)
        resumeTimeout = null
      }

      activeTarget = target

      const corners = Array.from(cornersRef.current)
      corners.forEach((corner) => gsap.killTweensOf(corner, 'x,y'))

      spinTimelineRef.current?.pause()
      gsap.killTweensOf(cursor, 'rotation')
      gsap.to(cursor, { rotation: 0, scale: 1.02, duration: 0.16, ease: 'power2.out' })

      gsap.to(corners, {
        borderColor: targetColor,
        duration: 0.15,
        ease: 'power2.out',
      })

      if (dotRef.current) {
        gsap.to(dotRef.current, {
          backgroundColor: targetColor,
          scale: 0.82,
          duration: 0.15,
          ease: 'power2.out',
        })
      }

      const rect = target.getBoundingClientRect()
      const { borderWidth, cornerSize } = constants
      const { x: offsetX, y: offsetY } = getOffset()
      const cursorX = gsap.getProperty(cursor, 'x')
      const cursorY = gsap.getProperty(cursor, 'y')

      targetCornerPositionsRef.current = [
        { x: rect.left - borderWidth - offsetX, y: rect.top - borderWidth - offsetY },
        { x: rect.right + borderWidth - cornerSize - offsetX, y: rect.top - borderWidth - offsetY },
        {
          x: rect.right + borderWidth - cornerSize - offsetX,
          y: rect.bottom + borderWidth - cornerSize - offsetY,
        },
        { x: rect.left - borderWidth - offsetX, y: rect.bottom + borderWidth - cornerSize - offsetY },
      ]

      gsap.ticker.add(tickerFnRef.current)

      gsap.to(activeStrengthRef, {
        current: 1,
        duration: hoverDuration,
        ease: 'power2.out',
        overwrite: true,
      })

      corners.forEach((corner, index) => {
        gsap.to(corner, {
          x: targetCornerPositionsRef.current[index].x - cursorX,
          y: targetCornerPositionsRef.current[index].y - cursorY,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })

      currentLeaveHandler = () => {
        leaveTarget()
        cleanupTarget(target)
      }

      target.addEventListener('mouseleave', currentLeaveHandler)
    }

    const syncTargetAtPoint = (point) => {
      const target = document.elementFromPoint(point.x, point.y)?.closest?.(targetSelector)

      if (target) {
        activateTarget(target)
      } else if (activeTarget) {
        currentLeaveHandler?.()
      }
    }

    const applyPointerMove = () => {
      pointerFrame = 0
      const { x: offsetX, y: offsetY } = getOffset()

      cursorQuickX(pointerRef.x - offsetX)
      cursorQuickY(pointerRef.y - offsetY)
      syncTargetAtPoint(pointerRef)
    }

    const moveHandler = (event) => {
      pointerRef.x = event.clientX
      pointerRef.y = event.clientY

      if (!pointerFrame) {
        pointerFrame = window.requestAnimationFrame(applyPointerMove)
      }
    }

    window.addEventListener('mousemove', moveHandler, { passive: true })

    const scrollHandler = () => {
      if (!activeTarget || !cursorRef.current) return

      const { x: offsetX, y: offsetY } = getOffset()
      const mouseX = gsap.getProperty(cursorRef.current, 'x') + offsetX
      const mouseY = gsap.getProperty(cursorRef.current, 'y') + offsetY
      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY)
      const isStillOverTarget =
        elementUnderMouse &&
        (elementUnderMouse === activeTarget || elementUnderMouse.closest(targetSelector) === activeTarget)

      if (!isStillOverTarget) {
        currentLeaveHandler?.()
      } else {
        const rect = activeTarget.getBoundingClientRect()
        const { borderWidth, cornerSize } = constants

        targetCornerPositionsRef.current = [
          { x: rect.left - borderWidth - offsetX, y: rect.top - borderWidth - offsetY },
          { x: rect.right + borderWidth - cornerSize - offsetX, y: rect.top - borderWidth - offsetY },
          {
            x: rect.right + borderWidth - cornerSize - offsetX,
            y: rect.bottom + borderWidth - cornerSize - offsetY,
          },
          { x: rect.left - borderWidth - offsetX, y: rect.bottom + borderWidth - cornerSize - offsetY },
        ]
      }
    }

    window.addEventListener('scroll', scrollHandler, { passive: true })

    const mouseDownHandler = () => {
      if (!dotRef.current) return

      gsap.to(dotRef.current, { scale: 0.7, duration: 0.2, ease: 'power2.out' })
      gsap.to(cursor, { scale: 0.92, duration: 0.16, ease: 'power2.out' })
    }

    const mouseUpHandler = () => {
      if (!dotRef.current) return

      gsap.to(dotRef.current, { scale: activeTarget ? 0.82 : 1, duration: 0.2, ease: 'power2.out' })
      gsap.to(cursor, { scale: activeTarget ? 1.02 : 1, duration: 0.16, ease: 'power2.out' })
    }

    window.addEventListener('mousedown', mouseDownHandler)
    window.addEventListener('mouseup', mouseUpHandler)

    const enterHandler = (event) => {
      activateTarget(event.target.closest?.(targetSelector))
    }

    window.addEventListener('mouseover', enterHandler, { passive: true })

    const resizeHandler = () => {
      containingBlockRef.current = getContainingBlock(cursor)
    }

    window.addEventListener('resize', resizeHandler)

    return () => {
      window.removeEventListener('mousemove', moveHandler)
      window.removeEventListener('mouseover', enterHandler)
      window.removeEventListener('scroll', scrollHandler)
      window.removeEventListener('resize', resizeHandler)
      window.removeEventListener('mousedown', mouseDownHandler)
      window.removeEventListener('mouseup', mouseUpHandler)

      if (resumeTimeout) {
        window.clearTimeout(resumeTimeout)
      }
      if (pointerFrame) {
        window.cancelAnimationFrame(pointerFrame)
      }

      if (activeTarget) {
        cleanupTarget(activeTarget)
      }

      resetTicker()
      spinTimelineRef.current?.kill()
      gsap.killTweensOf([cursor, dot, activeStrengthRef, ...(cornersRef.current ?? [])])
      document.body.style.cursor = originalCursor

      targetCornerPositionsRef.current = null
      activeStrengthRef.current = 0
    }
  }, [
    activeColor,
    baseColor,
    constants,
    hideDefaultCursor,
    hoverDuration,
    isMobile,
    parallaxOn,
    spinDuration,
    targetColor,
    targetSelector,
  ])

  useEffect(() => {
    if (isMobile || !cursorRef.current || !spinTimelineRef.current) return
    if (!spinTimelineRef.current.isActive()) return

    spinTimelineRef.current.kill()
    spinTimelineRef.current = gsap
      .timeline({ repeat: -1 })
      .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' })
  }, [isMobile, spinDuration])

  if (isMobile) return null

  return (
    <div className="target-cursor-wrapper" ref={cursorRef} aria-hidden="true">
      <div className="target-cursor-dot" ref={dotRef} style={{ backgroundColor: baseColor }} />
      <div className="target-cursor-corner corner-tl" style={{ borderColor: baseColor }} />
      <div className="target-cursor-corner corner-tr" style={{ borderColor: baseColor }} />
      <div className="target-cursor-corner corner-br" style={{ borderColor: baseColor }} />
      <div className="target-cursor-corner corner-bl" style={{ borderColor: baseColor }} />
    </div>
  )
}
