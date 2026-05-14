'use client'

import { motion } from 'framer-motion'
import { User, Bot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css'

interface ChatMessageProps {
  message: {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: number
  }
  index: number
}

export default function ChatMessage({ message, index }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-6`}
    >
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.05 + 0.1, type: 'spring', stiffness: 300 }}
        className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${
          isUser 
            ? 'bg-gradient-to-br from-cyber-purple to-cyber-purple-neon shadow-lg shadow-cyber-purple/30' 
            : 'bg-gradient-to-br from-cyber-cyan to-cyber-blue-electric shadow-lg shadow-cyber-cyan/30'
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-cyber-black" />
        )}
      </motion.div>

      {/* Message Bubble */}
      <motion.div
        initial={{ opacity: 0, x: isUser ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 + 0.15, duration: 0.3 }}
        className={`max-w-[80%] md:max-w-[70%] ${
          isUser ? 'glass-bubble-user' : 'glass-bubble-ai'
        } rounded-2xl px-5 py-4`}
      >
        <div className="markdown-content text-sm md:text-base leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <div className="relative my-3">
                    <div className="absolute top-0 right-0 px-3 py-1 text-xs text-cyber-cyan/60 font-mono bg-cyber-dark/80 rounded-bl-lg rounded-tr-lg">
                      {match[1]}
                    </div>
                    <pre className="!mt-0 !bg-cyber-dark/90 !border-cyber-purple/20">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                ) : (
                  <code className="bg-cyber-dark/60 text-cyber-cyan-light px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        {/* Timestamp */}
        <div className={`mt-2 text-xs text-slate-500 ${isUser ? 'text-right' : 'text-left'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </motion.div>
    </motion.div>
  )
}
