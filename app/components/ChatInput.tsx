'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, Loader2 } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  isLoading: boolean
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return
    onSend(input.trim())
    setInput('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`
    }
  }, [input])

  const suggestions = [
    'Explain quantum computing',
    'Write a React component',
    'Debug this code',
    'Design a system',
  ]

  return (
    <div className="w-full">
      {/* Suggestions */}
      <AnimatePresence>
        {input === '' && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide"
          >
            {suggestions.map((suggestion, i) => (
              <motion.button
                key={suggestion}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setInput(suggestion)
                  textareaRef.current?.focus()
                }}
                className="flex-shrink-0 px-3.5 py-2 rounded-xl border border-border-subtle bg-surface-elevated/50 text-xs text-text-tertiary hover:text-text-secondary hover:border-border-hover hover:bg-surface-hover transition-all duration-200 whitespace-nowrap"
              >
                <Sparkles className="w-3 h-3 inline mr-1.5 text-accent/50" />
                {suggestion}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area - Premium floating glass */}
      <motion.div
        layout
        className={`relative rounded-2xl transition-all duration-300 ${
          isFocused
            ? 'glass-panel-elevated ring-1 ring-accent/20'
            : 'glass-panel hover:border-border-hover'
        }`}
      >
        {/* Subtle glow when focused */}
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-px rounded-2xl bg-gradient-to-r from-accent/5 via-transparent to-accent-cyan/5 pointer-events-none"
          />
        )}

        <div className="relative flex items-end gap-2 p-1.5">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask anything..."
            rows={1}
            className="flex-1 bg-transparent text-text-primary placeholder-text-muted px-3.5 py-2.5 resize-none outline-none text-sm min-h-[44px] max-h-[160px] leading-relaxed"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
              input.trim() && !isLoading
                ? 'btn-primary'
                : 'bg-surface-hover text-text-muted'
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-accent-light" />
            ) : (
              <Send className="w-4 h-4 text-white" />
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
