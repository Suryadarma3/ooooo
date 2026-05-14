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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: Math.min(index * 0.04, 0.3),
        ease: [0.16, 1, 0.3, 1]
      }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-5 group`}
    >
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: Math.min(index * 0.04, 0.3) + 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
          isUser 
            ? 'bg-accent/15 border border-accent/20' 
            : 'bg-surface-hover border border-border-subtle'
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-accent-light" />
        ) : (
          <Bot className="w-4 h-4 text-text-secondary" />
        )}
      </motion.div>

      {/* Message Bubble */}
      <div
        className={`max-w-[85%] md:max-w-[75%] ${
          isUser ? 'glass-bubble-user' : 'glass-bubble-ai'
        } rounded-2xl ${isUser ? 'rounded-tr-md' : 'rounded-tl-md'} px-4 py-3`}
      >
        <div className="markdown-content text-[0.9375rem] leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <div className="relative my-4">
                    <div className="absolute top-0 right-0 px-3 py-1.5 text-[10px] text-text-muted font-mono uppercase tracking-wider bg-surface-elevated rounded-bl-lg rounded-tr-xl border-b border-l border-border-subtle">
                      {match[1]}
                    </div>
                    <pre className="!mt-0 !bg-surface-primary/80 !border-border-subtle">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                ) : (
                  <code className="bg-surface-hover text-accent-soft px-1.5 py-0.5 rounded-md text-[0.8125rem] font-mono border border-border-subtle" {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        {/* Timestamp - shows on hover */}
        <div className={`mt-2 text-[11px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isUser ? 'text-right' : 'text-left'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  )
}
