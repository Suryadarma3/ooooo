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
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const suggestions = [
    'Explain quantum computing',
    'Write a React component',
    'Debug this Python code',
    'Create a marketing strategy',
  ]

  return (
    <div className="w-full">
      {/* Suggestions */}
      <AnimatePresence>
        {input === '' && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide"
          >
            {suggestions.map((suggestion, i) => (
              <motion.button
                key={suggestion}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setInput(suggestion)
                  textareaRef.current?.focus()
                }}
                className="flex-shrink-0 px-4 py-2 rounded-xl glass-panel text-xs md:text-sm text-slate-300 hover:text-cyber-cyan-light hover:border-cyber-cyan/40 transition-all duration-300 whitespace-nowrap"
              >
                <Sparkles className="w-3 h-3 inline mr-1.5 text-cyber-purple-light" />
                {suggestion}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <motion.div
        layout
        className="glass-panel rounded-2xl p-1 flex items-end gap-2"
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          rows={1}
          className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 px-4 py-3 resize-none outline-none text-sm md:text-base min-h-[48px] max-h-[200px]"
        />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSubmit}
          disabled={!input.trim() || isLoading}
          className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
            input.trim() && !isLoading
              ? 'bg-gradient-to-br from-cyber-purple to-cyber-cyan shadow-lg shadow-cyber-purple/40 hover:shadow-cyber-cyan/40'
              : 'bg-slate-800/50 text-slate-500'
          }`}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-cyber-cyan-light" />
          ) : (
            <Send className="w-5 h-5 text-white" />
          )}
        </motion.button>
      </motion.div>
    </div>
  )
}
