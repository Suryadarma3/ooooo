'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField() {
  const ref = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20

      // Mix of purple and cyan particles
      const isPurple = Math.random() > 0.5
      if (isPurple) {
        colors[i3] = 0.44 + Math.random() * 0.2
        colors[i3 + 1] = 0.11 + Math.random() * 0.1
        colors[i3 + 2] = 0.57 + Math.random() * 0.2
      } else {
        colors[i3] = 0.04 + Math.random() * 0.1
        colors[i3 + 1] = 0.74 + Math.random() * 0.2
        colors[i3 + 2] = 0.78 + Math.random() * 0.2
      }
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })

  return (
    <Points ref={ref} positions={particles.positions} colors={particles.colors}>
      <PointMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  )
}

function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null)

  const orbs = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 5 - 3,
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 1.5,
      speed: 0.2 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      color: i % 2 === 0 ? '#711c91' : '#0abdc6',
    }))
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const time = state.clock.elapsedTime
        child.position.y += Math.sin(time * orbs[i].speed + orbs[i].offset) * 0.002
        child.position.x += Math.cos(time * orbs[i].speed * 0.5 + orbs[i].offset) * 0.001
      })
    }
  })

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position} scale={orb.scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color={orb.color}
            transparent
            opacity={0.08}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.1} />
        <ParticleField />
        <FloatingOrbs />
      </Canvas>
      {/* CSS Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black/80 via-transparent to-cyber-black/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/5 via-transparent to-cyber-cyan/5 pointer-events-none" />
    </div>
  )
}
