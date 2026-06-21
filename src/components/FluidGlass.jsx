import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Preload } from '@react-three/drei'
import { easing } from 'maath'
import { useRef } from 'react'

function FloatingLens({ position, rotation, scale, color, speed = 1, mode = 'lens' }) {
  const ref = useRef(null)

  useFrame((state, delta) => {
    if (!ref.current) return
    const time = state.clock.elapsedTime * speed
    const targetX = position[0] + Math.sin(time * 0.46) * 0.26 + state.pointer.x * 0.18
    const targetY = position[1] + Math.cos(time * 0.38) * 0.2 + state.pointer.y * 0.14
    easing.damp3(ref.current.position, [targetX, targetY, position[2]], 0.16, delta)
    easing.dampE(ref.current.rotation, [rotation[0] + Math.sin(time * 0.22) * 0.08, rotation[1], rotation[2] + Math.cos(time * 0.28) * 0.05], 0.18, delta)
  })

  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
      {mode === 'bar' ? <boxGeometry args={[2.8, 0.26, 0.18, 24, 8, 8]} /> : <sphereGeometry args={[1, 72, 28]} />}
      <MeshTransmissionMaterial
        color={color}
        transmission={1}
        roughness={0.08}
        thickness={1.8}
        ior={1.18}
        chromaticAberration={0.08}
        anisotropy={0.05}
        attenuationColor={color}
        attenuationDistance={1.2}
        distortion={0.16}
        distortionScale={0.24}
        temporalDistortion={0.08}
        transparent
        opacity={0.82}
      />
    </mesh>
  )
}

export default function FluidGlass({ mode = 'lens', className = '' }) {
  return (
    <div className={`fluid-glass ${className}`} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 7], fov: 38 }} gl={{ alpha: true, antialias: true }} dpr={[1, 1.6]}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 5, 4]} intensity={1.2} />
        <pointLight position={[-4, -2, 5]} intensity={12} color="#8be7dc" />
        <FloatingLens
          color="#d6ed6f"
          mode={mode === 'bar' ? 'bar' : 'lens'}
          position={[-1.85, 0.88, 0]}
          rotation={[0.28, -0.2, -0.48]}
          scale={[1.65, 0.34, 0.12]}
          speed={0.92}
        />
        <FloatingLens
          color="#8be7dc"
          mode="lens"
          position={[1.55, -0.72, -0.2]}
          rotation={[0.16, 0.16, 0.38]}
          scale={[1.2, 0.28, 0.1]}
          speed={1.1}
        />
        <FloatingLens
          color="#ff8d61"
          mode="bar"
          position={[0.4, 1.45, -0.35]}
          rotation={[0.08, -0.18, 0.12]}
          scale={[1.35, 1, 1]}
          speed={0.72}
        />
        <Preload />
      </Canvas>
    </div>
  )
}
