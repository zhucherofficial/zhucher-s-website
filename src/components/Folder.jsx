import { useRef, useState } from 'react'
import './Folder.css'

const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex
  if (color.length === 3) {
    color = color
      .split('')
      .map((c) => c + c)
      .join('')
  }
  const num = parseInt(color, 16)
  let r = (num >> 16) & 0xff
  let g = (num >> 8) & 0xff
  let b = num & 0xff
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))))
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))))
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))))
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
}

export default function Folder({ color = '#5227FF', size = 1, items = [], className = '' }) {
  const maxItems = 3
  const papers = items.slice(0, maxItems)
  while (papers.length < maxItems) {
    papers.push(null)
  }

  const [open, setOpen] = useState(false)
  const [paperOffsets, setPaperOffsets] = useState(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })),
  )
  const lastToggleAtRef = useRef(0)

  const folderBackColor = darkenColor(color, 0.08)
  const paper1 = darkenColor('#ffffff', 0.1)
  const paper2 = darkenColor('#ffffff', 0.05)
  const paper3 = '#ffffff'

  const toggleFolder = () => {
    setOpen((prevOpen) => {
      if (prevOpen) {
        setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })))
      }
      return !prevOpen
    })
  }

  const handleActivation = () => {
    const now = window.performance.now()
    if (now - lastToggleAtRef.current < 90) return
    lastToggleAtRef.current = now
    toggleFolder()
  }

  const handlePaperMouseMove = (event, index) => {
    if (!open) return
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const offsetX = (event.clientX - centerX) * 0.15
    const offsetY = (event.clientY - centerY) * 0.15
    setPaperOffsets((prev) => {
      const next = [...prev]
      next[index] = { x: offsetX, y: offsetY }
      return next
    })
  }

  const handlePaperMouseLeave = (index) => {
    setPaperOffsets((prev) => {
      const next = [...prev]
      next[index] = { x: 0, y: 0 }
      return next
    })
  }

  const folderStyle = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3,
  }

  const folderClassName = `folder ${open ? 'open' : ''}`.trim()
  const scaleStyle = { transform: `scale(${size})` }

  return (
    <div style={scaleStyle} className={className}>
      <div
        className={folderClassName}
        style={folderStyle}
        onPointerDown={handleActivation}
        onMouseDown={handleActivation}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            handleActivation()
          }
        }}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-label={open ? 'Close folder' : 'Open folder'}
      >
        <div className="folder__back">
          {papers.map((item, index) => (
            <div
              key={index}
              className={`paper paper-${index + 1}`}
              onMouseMove={(event) => handlePaperMouseMove(event, index)}
              onMouseLeave={() => handlePaperMouseLeave(index)}
              style={
                open
                  ? {
                      '--magnet-x': `${paperOffsets[index]?.x || 0}px`,
                      '--magnet-y': `${paperOffsets[index]?.y || 0}px`,
                    }
                  : {}
              }
            >
              {item}
            </div>
          ))}
          <div className="folder__front" />
          <div className="folder__front right" />
        </div>
      </div>
    </div>
  )
}
