import { memo, useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import './PixelGeometricBackdrop.css'

const DARK_COLORS = {
  PURPLE: '#791ee3',
  RED: '#ff141e',
  CYAN: '#00b7f5',
  YELLOW: '#ffea00',
  ORANGE: '#ff7700',
  GREEN: '#00e62c',
  BG: '#000000',
}

const LIGHT_COLORS = {
  PURPLE: '#6b05d4',
  RED: '#d9001b',
  CYAN: '#0088cc',
  YELLOW: '#d9b800',
  ORANGE: '#e65c00',
  GREEN: '#009922',
  BG: '#ffffff',
}

function drawPill(ctx, x, y, width, height, color) {
  const radius = Math.min(width, height) / 2
  ctx.fillStyle = color
  ctx.beginPath()
  if (ctx.roundRect) {
    ctx.roundRect(x, y, width, height, radius)
  } else {
    ctx.rect(x, y, width, height)
  }
  ctx.fill()
}

function drawTriangle(ctx, x1, y1, x2, y2, x3, y3, color) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.lineTo(x3, y3)
  ctx.closePath()
  ctx.fill()
}

function drawCircle(ctx, cx, cy, r, color) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(cx, cy, Math.max(0, r), 0, Math.PI * 2)
  ctx.fill()
}

function drawPacman(ctx, cx, cy, r, color) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(cx, cy, Math.max(0, r), 0.25 * Math.PI, 1.75 * Math.PI, false)
  ctx.lineTo(cx, cy)
  ctx.closePath()
  ctx.fill()
}

export const PixelGeometricBackdrop = memo(function PixelGeometricBackdrop({ className = '' }) {
  const { theme } = useTheme()
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const themeRef = useRef(theme)

  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  useEffect(() => {
    const handlePointerMove = (e) => {
      const { innerWidth, innerHeight } = window
      mouseRef.current.targetX = (e.clientX / innerWidth - 0.5) * 2
      mouseRef.current.targetY = (e.clientY / innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return undefined

    // Low-resolution offscreen grid for authentic 8-bit pixel art rendering
    const offscreen = document.createElement('canvas')
    const offCtx = offscreen.getContext('2d', { alpha: false })
    if (!offCtx) return undefined

    const GW = 140
    const GH = 140
    offscreen.width = GW
    offscreen.height = GH

    let animationFrameId
    let startTime = performance.now()

    const render = (now) => {
      const elapsed = (now - startTime) * 0.0015
      const currentTheme = themeRef.current
      const palette = currentTheme === 'light' ? LIGHT_COLORS : DARK_COLORS

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05

      const mx = Math.round(mouseRef.current.x * 2)
      const my = Math.round(mouseRef.current.y * 2)
      const floatA = Math.round(Math.sin(elapsed) * 1.2)
      const floatB = Math.round(Math.cos(elapsed * 0.8) * 1.2)

      // Resize canvas to match display container
      const parent = canvas.parentElement
      if (parent) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const displayW = Math.max(1, parent.clientWidth)
        const displayH = Math.max(1, parent.clientHeight)
        if (canvas.width !== Math.floor(displayW * dpr) || canvas.height !== Math.floor(displayH * dpr)) {
          canvas.width = Math.floor(displayW * dpr)
          canvas.height = Math.floor(displayH * dpr)
        }
      }

      // 1. Clear offscreen pixel grid with background color
      offCtx.fillStyle = palette.BG
      offCtx.fillRect(0, 0, GW, GH)

      // 2. Minimal Shape 1: Top-Left Cyan Triangle
      drawTriangle(
        offCtx,
        Math.round(GW * 0.10 + mx),
        Math.round(GH * 0.10 + floatA),
        Math.round(GW * 0.38 + floatB),
        Math.round(GH * 0.28 + floatB),
        Math.round(GW * 0.10 + mx),
        Math.round(GH * 0.42 + floatA),
        palette.CYAN,
      )

      // 3. Minimal Shape 2: Top-Right Yellow Crescent / Pacman
      drawPacman(
        offCtx,
        Math.round(GW * 0.70 + mx + floatA),
        Math.round(GH * 0.14 + my),
        Math.round(GW * 0.11),
        palette.YELLOW,
      )

      // 4. Minimal Shape 3: Middle-Right Purple Horizontal Pill
      drawPill(
        offCtx,
        Math.round(GW * 0.65 + floatB),
        Math.round(GH * 0.45 + my),
        Math.round(GW * 0.28),
        Math.round(GH * 0.14),
        palette.PURPLE,
      )

      // 5. Minimal Shape 4: Lower-Left Orange Circle
      drawCircle(
        offCtx,
        Math.round(GW * 0.20 + floatA + mx),
        Math.round(GH * 0.72 + floatB + my),
        Math.round(GW * 0.16),
        palette.ORANGE,
      )

      // Copy low-res offscreen pixel canvas to full screen canvas with pixelated nearest-neighbor interpolation
      ctx.imageSmoothingEnabled = false
      ctx.webkitImageSmoothingEnabled = false
      ctx.mozImageSmoothingEnabled = false
      ctx.msImageSmoothingEnabled = false

      const displayW = canvas.width
      const displayH = canvas.height
      ctx.drawImage(offscreen, 0, 0, GW, GH, 0, 0, displayW, displayH)

      animationFrameId = window.requestAnimationFrame(render)
    }

    render(performance.now())

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className={`pixel-geometric-backdrop ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="pixel-geometric-backdrop__canvas" />
    </div>
  )
})
