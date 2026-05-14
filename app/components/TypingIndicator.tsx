'use client'

import { motion } from 'framer-motion'
import { Bot } from 'lucide-react'

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-start gap-3 mb-5"
    >
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-surface-hover border border-border-subtle flex items-center justify-center">
        <Bot className="w-4 h-4 text-text-secondary" />
      </div>

      {/* Typing bubble */}
      <div className="glass-bubble-ai rounded-2xl rounded-tl-md px-5 py-4 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -4, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
            className="w-1.5 h-1.5 rounded-full bg-text-tertiary"
          />
        ))}
      </div>
    </motion.div>
  )
}
