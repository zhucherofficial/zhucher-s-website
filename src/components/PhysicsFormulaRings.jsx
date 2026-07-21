import { useEffect, useMemo, useRef, useState } from 'react'
import { Cylinder } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import './PhysicsFormulaRings.css'

const FONT_FAMILY = 'Roboto Mono'
const FONT_SIZE = 26
const FONT_SPEC = `200 ${FONT_SIZE}px "${FONT_FAMILY}"`
const CANVAS_FONT = `200 ${FONT_SIZE}px "${FONT_FAMILY}", ui-monospace, monospace`
const TEXTURE_WIDTH = 2048
const TEXTURE_HEIGHT = 34
const OUTER_RADIUS = 3.8
const RADIUS_TAPER = 0.05
const UPDATE_INTERVAL = 0.1
const CARET = '░▒▓██'

const RINGS = [
  {
    color: '#1546ff',
    content: 'F = ma  /  p = mv  /  τ = r × F  /  Eₖ = ½mv²  /  L = T - V  /  d/dt(∂L/∂q̇) - ∂L/∂q = 0  /  What I cannot create, I do not understand. - Richard Feynman',
  },
  {
    color: '#1546ff',
    content: '∇·E = ρ/ε₀  /  ∇·B = 0  /  ∇×E = -∂B/∂t  /  ∇×B = μ₀J + μ₀ε₀∂E/∂t  /  F = q(E + v × B)  /  V = IR  /  P = VI  /  ω₀ = 1/√(LC)  /  Nothing is too wonderful to be true. - Michael Faraday',
  },
  {
    color: '#1546ff',
    content: 'iℏ ∂ψ/∂t = Ĥψ  /  Δx Δp ≥ ℏ/2  /  E = hf  /  p = h/λ  /  E² = p²c² + m²c⁴  /  |ψ|² = ρ  /  Be less curious about people and more curious about ideas. - Marie Curie',
  },
  {
    color: '#1546ff',
    content: '∂²u/∂t² = c²∇²u  /  c = fλ  /  n₁ sin θ₁ = n₂ sin θ₂  /  d sin θ = mλ  /  F(k) = ∫ f(x)e⁻ⁱᵏˣ dx  /  The most incomprehensible thing about the universe is that it is comprehensible. - Albert Einstein',
  },
  {
    color: '#1546ff',
    content: 'PV = nRT  /  dU = δQ - δW  /  S = kᴮ ln Ω  /  P + ½ρv² + ρgh = constant  /  Δν = ν₀ - νₛ  /  Eᵥ = (v + ½)ℏω  /  Iᵣ ∝ |∂α/∂Q|²',
  },
  {
    color: '#1546ff',
    content: 'ẋ = Ax + Bu  /  y = Cx + Du  /  u = -Kx  /  u(t) = Kₚ e(t) + Kᵢ ∫ e(t)dt + Kₑ de(t)/dt  /  τ = Iα  /  V = IR  /  F = ma  /  build  /  test  /  measure  /  learn  /  repeat',
  },
]

const MOBILE_RINGS = [
  RINGS[0],
  RINGS[1],
  RINGS[2],
  {
    color: RINGS[3].color,
    content: `${RINGS[3].content}  /  ${RINGS[4].content}  /  ${RINGS[5].content}`,
  },
]

const DESKTOP_RADII = [3.8, 3.28, 2.76, 2.24, 1.72, 1.2]
const MOBILE_RADII = [3.8, 3, 2.2, 1.4]
const MATERIAL_OPACITY = [0.56, 0.51, 0.46, 0.41, 0.36, 0.31]

function redrawTextTexture(texture, cursorIndex) {
  const { context, textureLine } = texture.userData
  const safeIndex = cursorIndex % Math.max(1, textureLine.length - CARET.length)
  const visibleLine = `${textureLine.slice(0, safeIndex)}${CARET}${textureLine.slice(safeIndex + CARET.length)}`

  context.clearRect(0, 0, TEXTURE_WIDTH, TEXTURE_HEIGHT)
  context.fillText(visibleLine, 0, TEXTURE_HEIGHT / 2)
  texture.needsUpdate = true
}

function createTextTexture(content, color) {
  const canvas = document.createElement('canvas')
  canvas.width = TEXTURE_WIDTH
  canvas.height = TEXTURE_HEIGHT

  const context = canvas.getContext('2d')
  if (!context) return null

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.font = CANVAS_FONT
  context.textAlign = 'left'
  context.textBaseline = 'middle'
  context.fillStyle = color

  const phrase = `${content}  //  `
  let textureLine = phrase
  while (context.measureText(textureLine).width < TEXTURE_WIDTH * 1.15) {
    textureLine += phrase
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.flipY = false
  texture.generateMipmaps = false
  texture.magFilter = THREE.NearestFilter
  texture.minFilter = THREE.LinearFilter
  texture.premultiplyAlpha = true
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.userData = { context, textureLine, lastFrame: -1 }
  redrawTextTexture(texture, 0)
  return texture
}

function useRobotoMono() {
  const [fontVersion, setFontVersion] = useState(() => {
    if (typeof document === 'undefined' || !document.fonts) return 1
    return document.fonts.check(FONT_SPEC) ? 2 : 0
  })

  useEffect(() => {
    if (!document.fonts || fontVersion === 2) return undefined

    let cancelled = false
    const fallbackTimer = window.setTimeout(() => {
      if (!cancelled) setFontVersion((version) => version || 1)
    }, 1200)

    document.fonts.load(FONT_SPEC).then(() => {
      if (!cancelled) setFontVersion(2)
    }).catch(() => {
      if (!cancelled) setFontVersion(1)
    })

    return () => {
      cancelled = true
      window.clearTimeout(fallbackTimer)
    }
  }, [fontVersion])

  return fontVersion
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() => (
    typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ))

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = () => setReducedMotion(media.matches)
    media.addEventListener('change', syncPreference)
    return () => media.removeEventListener('change', syncPreference)
  }, [])

  return reducedMotion
}

function FormulaRing({ content, color, depth, direction, ellipseScale, index, radius, reducedMotion, repeats }) {
  const ringRef = useRef(null)
  const materialRef = useRef(null)
  const textureRef = useRef(null)
  const texture = useMemo(() => {
    const nextTexture = createTextTexture(content, color)
    nextTexture?.repeat.set(repeats, 1)
    return nextTexture
  }, [color, content, repeats])

  useEffect(() => {
    if (!texture) return undefined

    textureRef.current = texture

    return () => {
      if (textureRef.current === texture) textureRef.current = null
      texture.dispose()
    }
  }, [texture])

  useFrame(({ clock }, delta) => {
    const texture = textureRef.current
    if (!ringRef.current || !materialRef.current || !texture) return

    const elapsed = clock.getElapsedTime()
    if (!reducedMotion) {
      const speed = 0.52 + index * 0.085
      texture.offset.x = index * 0.137 + (elapsed / 60) * speed * direction

      const textureFrame = Math.floor(elapsed / UPDATE_INTERVAL)
      if (texture.userData.lastFrame !== textureFrame) {
        texture.userData.lastFrame = textureFrame
        redrawTextTexture(texture, textureFrame + index * 29)
      }
    }

    const delayedTime = Math.max(0, elapsed - index * 0.07)
    const targetScale = reducedMotion ? 1 : 1 - Math.exp(-delayedTime * 6.5)
    const scale = THREE.MathUtils.damp(ringRef.current.scale.x, targetScale, 10, delta)
    ringRef.current.scale.setScalar(Math.max(scale, 0.001))
    materialRef.current.opacity = MATERIAL_OPACITY[index] * Math.max(targetScale, 0.001)
  })

  if (!texture) return null

  return (
    <group ref={ringRef} scale={reducedMotion ? 1 : 0.001}>
      <Cylinder
        args={[radius, radius - RADIUS_TAPER, 0.08, 96, 1, true]}
        position={[0, depth, 0]}
        scale={[ellipseScale, 1, 1]}
      >
        <meshBasicMaterial
          alphaTest={0.01}
          depthWrite={false}
          map={texture}
          opacity={reducedMotion ? MATERIAL_OPACITY[index] : 0}
          ref={materialRef}
          side={THREE.BackSide}
          toneMapped={false}
          transparent
        />
      </Cylinder>
    </group>
  )
}

function FormulaRingScene({ fontVersion, reducedMotion }) {
  const { size, viewport } = useThree()
  const isMobile = size.width <= 720
  const rings = isMobile ? MOBILE_RINGS : RINGS
  const radii = isMobile ? MOBILE_RADII : DESKTOP_RADII
  const ellipseScale = isMobile ? 0.82 : 1.66
  const sceneScale = isMobile
    ? (viewport.width / (OUTER_RADIUS * 2 * ellipseScale)) * 1.5
    : Math.min(
      (viewport.width / (OUTER_RADIUS * 2 * ellipseScale)) * 1.08,
      (viewport.height / (OUTER_RADIUS * 2)) * 1.05,
    )
  const depthStep = isMobile ? -0.28 : -0.14

  return (
    <group
      position={[0, isMobile ? viewport.height * 0.07 : 0, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={sceneScale}
    >
      {rings.map((ring, index) => (
        <FormulaRing
          color={ring.color}
          content={ring.content}
          depth={index * depthStep}
          direction={index % 2 === 0 ? -1 : 1}
          ellipseScale={ellipseScale}
          index={index}
          key={`${fontVersion}-${ring.color}-${index}`}
          radius={radii[index]}
          reducedMotion={reducedMotion}
          repeats={Math.max(4 - Math.floor(index / 2), 1)}
        />
      ))}
    </group>
  )
}

const rendererOptions = {
  alpha: true,
  antialias: true,
  powerPreference: 'low-power',
}

export function PhysicsFormulaRings({ active = true, className = '' }) {
  const fontVersion = useRobotoMono()
  const reducedMotion = useReducedMotion()
  const rootClass = ['physics-formula-rings', active ? 'is-active' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClass} aria-hidden="true">
      {active && fontVersion > 0 ? (
        <Canvas
          camera={{ fov: 44, near: 0.1, far: 30, position: [0, 0, 10] }}
          dpr={[1, 1.35]}
          fallback={null}
          frameloop={reducedMotion ? 'demand' : 'always'}
          gl={rendererOptions}
        >
          <FormulaRingScene fontVersion={fontVersion} reducedMotion={reducedMotion} />
        </Canvas>
      ) : null}
    </div>
  )
}
