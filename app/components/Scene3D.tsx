'use client'

import { memo } from 'react'

/**
 * Atmospheric background system using pure CSS.
 * Replaced Three.js particle field for dramatically better performance,
 * especially on mobile devices. Uses GPU-accelerated animations.
 */
function AtmosphericBackground() {
  return (
    <div className="atmospheric-bg" aria-hidden="true">
      {/* Floating ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      
      {/* Mesh gradient overlay for depth */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.08) 0%, transparent 100%),
            radial-gradient(ellipse 60% 40% at 100% 50%, rgba(6, 182, 212, 0.04) 0%, transparent 100%),
            radial-gradient(ellipse 50% 80% at 0% 100%, rgba(139, 92, 246, 0.05) 0%, transparent 100%)
          `,
        }}
      />

      {/* Subtle vignette for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(9, 9, 11, 0.6) 100%)',
        }}
      />

      {/* Top edge gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-surface-primary/80 to-transparent" />
      
      {/* Bottom edge gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-primary/60 to-transparent" />
    </div>
  )
}

// Memoize to prevent unnecessary re-renders
export default memo(AtmosphericBackground)
