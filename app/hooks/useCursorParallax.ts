'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface CursorPosition {
  x: number
  y: number
}

interface UseCursorParallaxReturn {
  /** Raw pixel position of cursor */
  position: CursorPosition
  /** Normalized position from -1 to 1 (center is 0,0) */
  normalizedPosition: CursorPosition
  /** Smoothed normalized position with lerp (ideal for 3D camera) */
  smoothPosition: CursorPosition
  /** Whether cursor is currently over the viewport */
  isActive: boolean
}

/**
 * Premium cursor parallax hook for immersive 3D interaction.
 * 
 * - Tracks mouse position with smooth interpolation
 * - Works on desktop with mousemove
 * - Falls back to device orientation on mobile (gyroscope)
 * - Uses requestAnimationFrame for 60fps smooth updates
 * - Normalizes coordinates to -1 to 1 range
 */
export function useCursorParallax(smoothFactor = 0.05): UseCursorParallaxReturn {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [normalizedPosition, setNormalizedPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)

  const targetRef = useRef<CursorPosition>({ x: 0, y: 0 })
  const currentRef = useRef<CursorPosition>({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  // Smooth interpolation loop
  const animate = useCallback(() => {
    const target = targetRef.current
    const current = currentRef.current

    // Lerp towards target
    current.x += (target.x - current.x) * smoothFactor
    current.y += (target.y - current.y) * smoothFactor

    // Only update state if there's meaningful change (avoid re-renders)
    const dx = Math.abs(current.x - target.x)
    const dy = Math.abs(current.y - target.y)

    if (dx > 0.0001 || dy > 0.0001) {
      setSmoothPosition({ x: current.x, y: current.y })
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [smoothFactor])

  useEffect(() => {
    // Start animation loop
    rafRef.current = requestAnimationFrame(animate)

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      const width = window.innerWidth
      const height = window.innerHeight

      // Raw position
      setPosition({ x, y })

      // Normalized -1 to 1
      const normX = (x / width) * 2 - 1
      const normY = -(y / height) * 2 + 1 // Invert Y for 3D convention
      setNormalizedPosition({ x: normX, y: normY })

      // Update target for smooth interpolation
      targetRef.current = { x: normX, y: normY }
      setIsActive(true)
    }

    const handleMouseLeave = () => {
      // Gradually return to center when cursor leaves
      targetRef.current = { x: 0, y: 0 }
      setIsActive(false)
    }

    // Mobile: device orientation for parallax
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return

      // Gamma: -90 to 90 (left-right tilt)
      // Beta: -180 to 180 (front-back tilt)
      const normX = Math.max(-1, Math.min(1, (e.gamma || 0) / 30))
      const normY = Math.max(-1, Math.min(1, ((e.beta || 0) - 45) / 30))

      setNormalizedPosition({ x: normX, y: normY })
      targetRef.current = { x: normX, y: normY }
      setIsActive(true)
    }

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    // Only add device orientation on mobile
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    if (isMobile && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true })
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (isMobile) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation)
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [animate])

  return {
    position,
    normalizedPosition,
    smoothPosition,
    isActive,
  }
}
