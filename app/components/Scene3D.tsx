'use client'

import { useRef, useMemo, memo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshTransmissionMaterial, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { useCursorParallax } from '../hooks/useCursorParallax'

// ─── Cinematic Particle Field ───────────────────────────────────────────────────
function ParticleField({ count = 800, mousePosition }: { count?: number; mousePosition: { x: number; y: number } }) {
  const mesh = useRef<THREE.Points>(null)

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Distribute particles in a sphere with bias toward edges
      const radius = 4 + Math.random() * 12
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i3 + 2] = radius * Math.cos(phi) - 8
      s[i] = Math.random() * 0.5 + 0.1
    }
    return [pos, s]
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    const time = state.clock.elapsedTime
    mesh.current.rotation.y = time * 0.008 + mousePosition.x * 0.05
    mesh.current.rotation.x = Math.sin(time * 0.003) * 0.1 + mousePosition.y * 0.03
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#a78bfa"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ─── Neural Energy Core ─────────────────────────────────────────────────────────
function NeuralCore({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return
    const time = state.clock.elapsedTime
    
    // Slow elegant rotation
    meshRef.current.rotation.x = time * 0.1 + mousePosition.y * 0.2
    meshRef.current.rotation.y = time * 0.15 + mousePosition.x * 0.2
    
    // Subtle breathing scale
    const breathe = 1 + Math.sin(time * 0.5) * 0.03
    meshRef.current.scale.setScalar(breathe)
    
    // Glow pulse
    glowRef.current.scale.setScalar(breathe * 1.4 + Math.sin(time * 0.8) * 0.05)
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={[0, 0.2, -3]}>
        {/* Outer glow sphere */}
        <mesh ref={glowRef} scale={1.4}>
          <icosahedronGeometry args={[1, 4]} />
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.02}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Main core sphere with distortion */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.8, 8]} />
          <MeshDistortMaterial
            color="#1a1025"
            emissive="#6d28d9"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.9}
            distort={0.15}
            speed={1.5}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Inner energy glow */}
        <mesh scale={0.6}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color="#a78bfa"
            transparent
            opacity={0.08}
          />
        </mesh>
      </group>
    </Float>
  )
}

// ─── Holographic Ring ───────────────────────────────────────────────────────────
function HolographicRing({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ringRef.current) return
    const time = state.clock.elapsedTime
    ringRef.current.rotation.x = Math.PI * 0.35 + Math.sin(time * 0.2) * 0.05 + mousePosition.y * 0.1
    ringRef.current.rotation.z = time * 0.08 + mousePosition.x * 0.1
  })

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={ringRef} position={[0, 0.2, -3]}>
        <torusGeometry args={[1.8, 0.015, 16, 100]} />
        <meshBasicMaterial
          color="#67e8f9"
          transparent
          opacity={0.25}
        />
      </mesh>
    </Float>
  )
}

// ─── Second Holographic Ring ────────────────────────────────────────────────────
function HolographicRingSecond({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ringRef.current) return
    const time = state.clock.elapsedTime
    ringRef.current.rotation.x = Math.PI * 0.55 + Math.sin(time * 0.15) * 0.04 + mousePosition.y * 0.08
    ringRef.current.rotation.z = -time * 0.05 + mousePosition.x * 0.08
    ringRef.current.rotation.y = time * 0.03
  })

  return (
    <Float speed={0.6} rotationIntensity={0.08} floatIntensity={0.2}>
      <mesh ref={ringRef} position={[0, 0.2, -3]}>
        <torusGeometry args={[2.2, 0.008, 16, 120]} />
        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  )
}

// ─── Floating Glass Orbs ────────────────────────────────────────────────────────
function FloatingOrbs({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const orbs = useMemo(() => [
    { pos: [-3.5, 1.5, -6] as [number, number, number], scale: 0.3, speed: 0.8, color: '#8b5cf6' },
    { pos: [4, -1.2, -8] as [number, number, number], scale: 0.25, speed: 0.6, color: '#06b6d4' },
    { pos: [-2, -2, -5] as [number, number, number], scale: 0.2, speed: 1.0, color: '#a78bfa' },
    { pos: [3, 2.5, -7] as [number, number, number], scale: 0.15, speed: 0.7, color: '#67e8f9' },
    { pos: [1.5, -3, -9] as [number, number, number], scale: 0.35, speed: 0.5, color: '#7c3aed' },
  ], [])

  return (
    <>
      {orbs.map((orb, i) => (
        <Float key={i} speed={orb.speed} rotationIntensity={0.1} floatIntensity={0.8}>
          <mesh position={orb.pos} scale={orb.scale}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color={orb.color}
              emissive={orb.color}
              emissiveIntensity={0.4}
              transparent
              opacity={0.12}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
          {/* Soft glow around orbs */}
          <mesh position={orb.pos} scale={orb.scale * 2}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial
              color={orb.color}
              transparent
              opacity={0.03}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

// ─── Volumetric Light Beams ─────────────────────────────────────────────────────
function VolumetricLights() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current) return
    const time = state.clock.elapsedTime
    group.current.rotation.z = time * 0.02
  })

  return (
    <group ref={group} position={[0, 0, -10]}>
      {/* Main light cone */}
      <mesh position={[0, 4, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[3, 10, 32, 1, true]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.008}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Secondary light cone */}
      <mesh position={[2, -3, 2]} rotation={[0.5, 0.3, 0.2]}>
        <coneGeometry args={[2, 8, 32, 1, true]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.005}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

// ─── Depth Fog Plane ────────────────────────────────────────────────────────────
function DepthFog() {
  return (
    <mesh position={[0, 0, -15]} scale={[40, 40, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        color="#09090b"
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

// ─── Camera Controller with parallax ────────────────────────────────────────────
function CameraRig({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  useFrame((state) => {
    // Smooth camera movement following cursor
    const targetX = mousePosition.x * 0.3
    const targetY = mousePosition.y * 0.2
    
    state.camera.position.x += (targetX - state.camera.position.x) * 0.02
    state.camera.position.y += (targetY - state.camera.position.y) * 0.02
    
    // Always look at center with slight offset
    state.camera.lookAt(0, 0, -3)
  })

  return null
}

// ─── Post-processing Effects ────────────────────────────────────────────────────
function Effects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette
        offset={0.3}
        darkness={0.7}
        blendFunction={BlendFunction.NORMAL}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0.0003, 0.0003)}
      />
    </EffectComposer>
  )
}

// ─── Adaptive Quality ───────────────────────────────────────────────────────────
function AdaptiveScene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      <CameraRig mousePosition={mousePosition} />
      
      {/* Cinematic lighting */}
      <ambientLight intensity={0.03} color="#a78bfa" />
      <pointLight position={[5, 5, -3]} intensity={0.15} color="#8b5cf6" distance={20} />
      <pointLight position={[-5, -3, -5]} intensity={0.08} color="#06b6d4" distance={15} />
      <pointLight position={[0, 0, -2]} intensity={0.05} color="#c4b5fd" distance={8} />
      
      {/* Scene elements */}
      <ParticleField mousePosition={mousePosition} count={600} />
      <NeuralCore mousePosition={mousePosition} />
      <HolographicRing mousePosition={mousePosition} />
      <HolographicRingSecond mousePosition={mousePosition} />
      <FloatingOrbs mousePosition={mousePosition} />
      <VolumetricLights />
      <DepthFog />
      
      {/* Post-processing */}
      <Effects />
    </>
  )
}

// ─── Main Scene Component ───────────────────────────────────────────────────────
function Scene3D() {
  const { normalizedPosition } = useCursorParallax()

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 100 }}
        dpr={[1, 1.5]} // Adaptive DPR for performance
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <AdaptiveScene mousePosition={normalizedPosition} />
        </Suspense>
      </Canvas>

      {/* CSS overlay gradients for depth blending */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top fade to blend with header */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-surface-primary via-surface-primary/60 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-surface-primary via-surface-primary/40 to-transparent" />
        {/* Side vignettes */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(9,9,11,0.5)_100%)]" />
      </div>
    </div>
  )
}

export default memo(Scene3D)
