'use client'

import { motion } from 'framer-motion'

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-3 mb-6"
    >
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-blue-electric shadow-lg shadow-cyber-cyan/30 flex items-center justify-center">
        <svg className="w-5 h-5 text-cyber-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>

      <div className="glass-bubble-ai rounded-2xl px-5 py-4 flex items-center gap-2">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: 0,
          }}
          className="w-2 h-2 rounded-full bg-cyber-cyan"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: 0.2,
          }}
          className="w-2 h-2 rounded-full bg-cyber-purple-light"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: 0.4,
          }}
          className="w-2 h-2 rounded-full bg-cyber-cyan"
        />
      </div>
    </motion.div>
  )
}
