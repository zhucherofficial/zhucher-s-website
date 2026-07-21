import { useEffect, useRef, useState } from 'react'

const canRenderPickCursor = () => {
  if (typeof window === 'undefined') return false

  return (
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function GuitarPickCursor({ active = true, scopeRef }) {
  const cursorRef = useRef(null)
  const [canUsePick, setCanUsePick] = useState(canRenderPickCursor)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncCapability = () => setCanUsePick(finePointer.matches && !reducedMotion.matches)

    finePointer.addEventListener('change', syncCapability)
    reducedMotion.addEventListener('change', syncCapability)

    return () => {
      finePointer.removeEventListener('change', syncCapability)
      reducedMotion.removeEventListener('change', syncCapability)
    }
  }, [])

  useEffect(() => {
    const scope = scopeRef.current
    const cursor = cursorRef.current

    if (!scope || !active) return undefined

    scope.dataset.pickCursor = canUsePick ? 'true' : 'false'

    let frame = 0
    let lastX = 0
    let nextX = 0
    let nextY = 0
    let nextTarget = null

    const clearBodyScope = () => {
      document.body.classList.remove('guitar-pick-scope-active')
      cursor?.classList.remove('guitar-pick-cursor--visible', 'guitar-pick-cursor--pressed')
    }

    const drawCursor = () => {
      frame = 0
      if (!cursor || !canUsePick) return

      const deltaX = nextX - lastX
      const rotation = Math.max(-13, Math.min(13, deltaX * 0.7 - 7))
      const stringTarget = nextTarget?.closest?.('[data-pick-accent]')

      cursor.style.setProperty('--pick-accent', stringTarget?.dataset.pickAccent ?? '#1546ff')
      cursor.style.transform = `translate3d(${nextX}px, ${nextY}px, 0) translate(-50%, -94%) rotate(${rotation}deg)`
      cursor.dataset.overString = stringTarget ? 'true' : 'false'
      cursor.classList.add('guitar-pick-cursor--visible')

      lastX = nextX
    }

    const handlePointerEnter = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return

      document.body.classList.add('guitar-pick-scope-active')
    }

    const handlePointerMove = (event) => {
      if (!canUsePick || (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen')) {
        return
      }

      document.body.classList.add('guitar-pick-scope-active')
      nextX = event.clientX
      nextY = event.clientY
      nextTarget = event.target

      if (!frame) {
        frame = window.requestAnimationFrame(drawCursor)
      }
    }

    const handlePointerDown = (event) => {
      if (!canUsePick || event.button !== 0) return
      cursor?.classList.add('guitar-pick-cursor--pressed')
    }

    const handlePointerUp = () => cursor?.classList.remove('guitar-pick-cursor--pressed')

    const handleVisibility = () => {
      if (document.hidden) clearBodyScope()
    }

    scope.addEventListener('pointerenter', handlePointerEnter)
    scope.addEventListener('pointermove', handlePointerMove, { passive: true })
    scope.addEventListener('pointerleave', clearBodyScope)
    scope.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('blur', clearBodyScope)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      scope.removeEventListener('pointerenter', handlePointerEnter)
      scope.removeEventListener('pointermove', handlePointerMove)
      scope.removeEventListener('pointerleave', clearBodyScope)
      scope.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('blur', clearBodyScope)
      document.removeEventListener('visibilitychange', handleVisibility)

      if (frame) window.cancelAnimationFrame(frame)
      delete scope.dataset.pickCursor
      clearBodyScope()
    }
  }, [active, canUsePick, scopeRef])

  if (!active || !canUsePick) return null

  return (
    <div className="guitar-pick-cursor" ref={cursorRef} aria-hidden="true">
      <svg viewBox="0 0 48 58" focusable="false">
        <path
          className="guitar-pick-cursor__shadow"
          d="M24 4C34 4 43 8 44 16C45 25 36 43 26 54C25 55 23 55 22 54C12 43 3 25 4 16C5 8 14 4 24 4Z"
        />
        <path
          className="guitar-pick-cursor__body"
          d="M24 2C35 2 45 7 46 16C47 26 37 45 26 56C25 57 23 57 22 56C11 45 1 26 2 16C3 7 13 2 24 2Z"
        />
        <path className="guitar-pick-cursor__paint" d="M10 15C19 9 30 9 39 14" />
        <path className="guitar-pick-cursor__mark" d="M16 23C22 19 29 20 34 25M19 31L30 28" />
      </svg>
    </div>
  )
}
