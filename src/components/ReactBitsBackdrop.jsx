import { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import './ReactBitsBackdrop.css'

const TWO_PI = Math.PI * 2
const FRAME_INTERVAL = 1000 / 30

const hexToRgb = (hex) => {
  const value = hex.replace('#', '')
  const expanded =
    value.length === 3
      ? value
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : value

  return {
    r: parseInt(expanded.slice(0, 2), 16),
    g: parseInt(expanded.slice(2, 4), 16),
    b: parseInt(expanded.slice(4, 6), 16),
  }
}

const pick = (items, index) => items[index % items.length]

function useCanvasRenderer(draw) {
  const canvasRef = useRef(null)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotionRef.current = mediaQuery.matches

    const handleMotionPreference = (event) => {
      reducedMotionRef.current = event.matches
    }

    mediaQuery.addEventListener('change', handleMotionPreference)
    return () => mediaQuery.removeEventListener('change', handleMotionPreference)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return undefined

    let width = 0
    let height = 0
    let frame = 0
    let raf = 0
    let previousTime = 0
    let isVisible = true
    let isDisposed = false
    let cleanupDraw
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cleanupDraw?.()
      cleanupDraw = draw({ canvas, ctx, width, height, reducedMotion: reducedMotionRef.current })
    }

    const tick = (time) => {
      if (isDisposed || !isVisible) {
        raf = 0
        return
      }

      raf = window.requestAnimationFrame(tick)
      const timePassed = time - previousTime
      if (timePassed < FRAME_INTERVAL) return

      previousTime = time - (timePassed % FRAME_INTERVAL)
      frame += 1
      draw({
        canvas,
        ctx,
        width,
        height,
        frame,
        time,
        reducedMotion: reducedMotionRef.current,
      })
    }

    const startAnimation = () => {
      if (raf) return
      previousTime = performance.now()
      raf = window.requestAnimationFrame(tick)
    }

    const stopAnimation = () => {
      if (!raf) return
      window.cancelAnimationFrame(raf)
      raf = 0
    }

    resize()
    window.addEventListener('resize', resize)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (entry.isIntersecting) {
          startAnimation()
        } else {
          stopAnimation()
        }
      },
      { rootMargin: '160px 0px' },
    )
    observer.observe(canvas)
    startAnimation()

    return () => {
      isDisposed = true
      stopAnimation()
      window.removeEventListener('resize', resize)
      observer.disconnect()
      cleanupDraw?.()
    }
  }, [draw])

  return canvasRef
}

function DotFieldCanvas({ palette, density = 1, interactive = true }) {
  const mouseRef = useRef({ x: -9999, y: -9999, px: -9999, py: -9999, speed: 0 })
  const dotsRef = useRef([])
  const paletteRgb = useMemo(() => palette.map(hexToRgb), [palette])

  const draw = useCallback(
    ({ canvas, ctx, width, height, frame, time, reducedMotion }) => {
      if (!frame) {
        const step = Math.max(18, Math.round(24 / density))
        const dots = []
        const cols = Math.ceil(width / step) + 1
        const rows = Math.ceil(height / step) + 1
        const offsetX = ((width % step) - step) / 2
        const offsetY = ((height % step) - step) / 2

        for (let row = 0; row < rows; row += 1) {
          for (let col = 0; col < cols; col += 1) {
            const x = offsetX + col * step
            const y = offsetY + row * step
            dots.push({
              x,
              y,
              sx: x,
              sy: y,
              phase: (row * 17 + col * 23) % 97,
              color: pick(paletteRgb, row + col),
            })
          }
        }
        dotsRef.current = dots

        const onMouseMove = (event) => {
          if (!interactive) return
          const rect = canvas.getBoundingClientRect()
          mouseRef.current.x = event.clientX - rect.left
          mouseRef.current.y = event.clientY - rect.top
        }
        const onMouseLeave = () => {
          mouseRef.current.x = -9999
          mouseRef.current.y = -9999
        }

        canvas.parentElement.addEventListener('mousemove', onMouseMove, { passive: true })
        canvas.parentElement.addEventListener('mouseleave', onMouseLeave, { passive: true })

        return () => {
          canvas.parentElement.removeEventListener('mousemove', onMouseMove)
          canvas.parentElement.removeEventListener('mouseleave', onMouseLeave)
        }
      }

      const mouse = mouseRef.current
      const dx = mouse.x - mouse.px
      const dy = mouse.y - mouse.py
      mouse.speed += (Math.hypot(dx, dy) - mouse.speed) * 0.24
      mouse.px = mouse.x
      mouse.py = mouse.y

      ctx.clearRect(0, 0, width, height)
      const wave = reducedMotion ? 0 : time * 0.00035
      const radius = 210
      const radiusSq = radius * radius

      for (const dot of dotsRef.current) {
        const distX = mouse.x - dot.x
        const distY = mouse.y - dot.y
        const distSq = distX * distX + distY * distY
        let shiftX = 0
        let shiftY = Math.sin(wave + dot.phase) * 1.8
        let alpha = 0.22
        let size = 1.6

        if (interactive && distSq < radiusSq) {
          const dist = Math.max(1, Math.sqrt(distSq))
          const pull = (1 - dist / radius) * Math.min(mouse.speed * 0.9, 58)
          shiftX -= (distX / dist) * pull
          shiftY -= (distY / dist) * pull
          alpha = 0.34 + (1 - dist / radius) * 0.42
          size = 1.8 + (1 - dist / radius) * 2.2
        }

        dot.sx += (dot.x + shiftX - dot.sx) * 0.12
        dot.sy += (dot.y + shiftY - dot.sy) * 0.12
        ctx.fillStyle = `rgba(${dot.color.r}, ${dot.color.g}, ${dot.color.b}, ${alpha})`
        ctx.beginPath()
        ctx.arc(dot.sx, dot.sy, size, 0, TWO_PI)
        ctx.fill()
      }

      return undefined
    },
    [density, interactive, paletteRgb],
  )

  const canvasRef = useCanvasRenderer(draw)

  return <canvas ref={canvasRef} />
}

function PixelSnowCanvas({ palette, density = 1 }) {
  const flakesRef = useRef([])
  const paletteRgb = useMemo(() => palette.map(hexToRgb), [palette])

  const draw = useCallback(
    ({ ctx, width, height, frame, time, reducedMotion }) => {
      if (!frame) {
        const count = Math.round((width * height * density) / 8200)
        flakesRef.current = Array.from({ length: Math.max(40, count) }, (_, index) => ({
          x: Math.random() * width,
          y: Math.random() * height,
          z: 0.45 + Math.random() * 1.25,
          size: 2 + Math.random() * 4,
          drift: -0.42 + Math.random() * 0.84,
          phase: Math.random() * TWO_PI,
          color: pick(paletteRgb, index),
        }))
      }

      ctx.clearRect(0, 0, width, height)
      const speed = reducedMotion ? 0 : 0.18

      for (const flake of flakesRef.current) {
        flake.y += speed * flake.z
        flake.x += Math.sin(time * 0.0006 + flake.phase) * 0.18 + flake.drift * 0.05

        if (flake.y > height + 12) {
          flake.y = -12
          flake.x = Math.random() * width
        }
        if (flake.x < -16) flake.x = width + 16
        if (flake.x > width + 16) flake.x = -16

        const alpha = 0.16 + flake.z * 0.2
        ctx.fillStyle = `rgba(${flake.color.r}, ${flake.color.g}, ${flake.color.b}, ${alpha})`
        const s = flake.size * flake.z
        ctx.fillRect(Math.round(flake.x / 2) * 2, Math.round(flake.y / 2) * 2, s, s)

        if (flake.z > 1.15) {
          ctx.fillStyle = `rgba(238, 245, 244, ${alpha * 0.34})`
          ctx.fillRect(Math.round(flake.x / 2) * 2 - s, Math.round(flake.y / 2) * 2, s * 3, 1)
          ctx.fillRect(Math.round(flake.x / 2) * 2, Math.round(flake.y / 2) * 2 - s, 1, s * 3)
        }
      }

      return undefined
    },
    [density, paletteRgb],
  )

  const canvasRef = useCanvasRenderer(draw)

  return <canvas ref={canvasRef} />
}

function ParticlesCanvas({ palette, density = 1, interactive = true }) {
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const paletteRgb = useMemo(() => palette.map(hexToRgb), [palette])

  const draw = useCallback(
    ({ canvas, ctx, width, height, frame, time, reducedMotion }) => {
      if (!frame) {
        const count = Math.round((width * height * density) / 10500)
        particlesRef.current = Array.from({ length: Math.max(36, count) }, (_, index) => ({
          baseX: Math.random() * width,
          baseY: Math.random() * height,
          x: Math.random() * width,
          y: Math.random() * height,
          depth: 0.35 + Math.random() * 1.4,
          phase: Math.random() * TWO_PI,
          color: pick(paletteRgb, index),
        }))

        const onMouseMove = (event) => {
          if (!interactive) return
          const rect = canvas.getBoundingClientRect()
          mouseRef.current = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            active: true,
          }
        }
        const onMouseLeave = () => {
          mouseRef.current.active = false
        }

        canvas.parentElement.addEventListener('mousemove', onMouseMove, { passive: true })
        canvas.parentElement.addEventListener('mouseleave', onMouseLeave, { passive: true })

        return () => {
          canvas.parentElement.removeEventListener('mousemove', onMouseMove)
          canvas.parentElement.removeEventListener('mouseleave', onMouseLeave)
        }
      }

      ctx.clearRect(0, 0, width, height)
      const mouse = mouseRef.current
      const t = reducedMotion ? 0 : time * 0.00024

      for (const particle of particlesRef.current) {
        const orbitX = Math.cos(t * (1.2 + particle.depth) + particle.phase) * 36 * particle.depth
        const orbitY = Math.sin(t * (1.8 + particle.depth) + particle.phase) * 22 * particle.depth
        let targetX = particle.baseX + orbitX
        let targetY = particle.baseY + orbitY

        if (interactive && mouse.active) {
          const dx = mouse.x - targetX
          const dy = mouse.y - targetY
          const dist = Math.max(1, Math.hypot(dx, dy))
          if (dist < 260) {
            const pull = (1 - dist / 260) * 38 * particle.depth
            targetX -= (dx / dist) * pull
            targetY -= (dy / dist) * pull
          }
        }

        particle.x += (targetX - particle.x) * 0.045
        particle.y += (targetY - particle.y) * 0.045
        const alpha = 0.15 + particle.depth * 0.18
        const size = 1.4 + particle.depth * 1.8

        ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${alpha})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, TWO_PI)
        ctx.fill()
      }

      return undefined
    },
    [density, interactive, paletteRgb],
  )

  const canvasRef = useCanvasRenderer(draw)

  return <canvas ref={canvasRef} />
}

function PixelTrailCanvas({ palette, density = 1 }) {
  const pointsRef = useRef([])
  const paletteRgb = useMemo(() => palette.map(hexToRgb), [palette])

  const draw = useCallback(
    ({ canvas, ctx, width, height, frame }) => {
      if (!frame) {
        const onPointerMove = (event) => {
          const rect = canvas.getBoundingClientRect()
          const x = event.clientX - rect.left
          const y = event.clientY - rect.top
          const color = pick(paletteRgb, pointsRef.current.length)
          pointsRef.current.push({ x, y, life: 1, color })
          if (pointsRef.current.length > 140 * density) {
            pointsRef.current.shift()
          }
        }

        canvas.parentElement.addEventListener('pointermove', onPointerMove, { passive: true })
        return () => canvas.parentElement.removeEventListener('pointermove', onPointerMove)
      }

      ctx.clearRect(0, 0, width, height)

      for (const point of pointsRef.current) {
        point.life -= 0.016
        const size = Math.max(2, point.life * 16)
        ctx.fillStyle = `rgba(${point.color.r}, ${point.color.g}, ${point.color.b}, ${Math.max(0, point.life) * 0.5})`
        ctx.fillRect(Math.round(point.x / 6) * 6, Math.round(point.y / 6) * 6, size, size)
      }

      pointsRef.current = pointsRef.current.filter((point) => point.life > 0)
      return undefined
    },
    [density, paletteRgb],
  )

  const canvasRef = useCanvasRenderer(draw)

  return <canvas ref={canvasRef} />
}

export const ReactBitsBackdrop = memo(function ReactBitsBackdrop({
  variant = 'dotfield',
  palette = ['#8be7dc', '#d6ed6f', '#ff8d61'],
  density = 1,
  subtle = false,
  interactive = true,
  className = '',
}) {
  const backdropClass = [
    'reactbits-backdrop',
    `reactbits-backdrop--${variant}`,
    subtle ? 'reactbits-backdrop--subtle' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={backdropClass} aria-hidden="true">
      {variant === 'pixelsnow' ? <PixelSnowCanvas palette={palette} density={density} /> : null}
      {variant === 'particles' ? (
        <ParticlesCanvas palette={palette} density={density} interactive={interactive} />
      ) : null}
      {variant === 'pixeltrail' ? <PixelTrailCanvas palette={palette} density={density} /> : null}
      {variant === 'dotfield' ? (
        <DotFieldCanvas palette={palette} density={density} interactive={interactive} />
      ) : null}
    </div>
  )
})
