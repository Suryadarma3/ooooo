'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Trash2, Plus, Clock } from 'lucide-react'

interface ChatSession {
  id: string
  title: string
  timestamp: number
  messageCount: number
}

interface SidebarProps {
  isOpen: boolean
  sessions: ChatSession[]
  currentSessionId: string
  onSelectSession: (id: string) => void
  onNewChat: () => void
  onDeleteSession: (id: string) => void
  onClose: () => void
}

export default function Sidebar({
  isOpen,
  sessions,
  currentSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onClose,
}: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile - blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden"
          />

          {/* Sidebar Panel */}
          <motion.aside
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-14 bottom-0 w-72 z-40 bg-surface-secondary/95 backdrop-blur-2xl border-r border-border-subtle overflow-hidden flex flex-col"
          >
            {/* New Chat Button */}
            <div className="p-4">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNewChat}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border-default hover:border-border-hover bg-surface-elevated/50 hover:bg-surface-hover transition-all duration-200 group"
              >
                <div className="w-7 h-7 rounded-lg bg-accent-muted flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-200">
                  <Plus className="w-4 h-4 text-accent-light group-hover:rotate-90 transition-transform duration-300" />
                </div>
                <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">New Chat</span>
              </motion.button>
            </div>

            {/* Divider */}
            <div className="mx-4 h-px bg-border-subtle" />

            {/* Session List */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
              <div className="px-3 py-2 text-[11px] text-text-muted uppercase tracking-widest font-medium">
                Conversations
              </div>

              {sessions.length === 0 ? (
                <div className="px-3 py-12 text-center">
                  <div className="w-10 h-10 rounded-xl bg-surface-hover mx-auto mb-3 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-text-muted" />
                  </div>
                  <p className="text-sm text-text-tertiary">No conversations yet</p>
                  <p className="text-xs text-text-muted mt-1">Start a new chat to begin</p>
                </div>
              ) : (
                sessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button
                      onClick={() => onSelectSession(session.id)}
                      className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                        session.id === currentSessionId
                          ? 'bg-surface-hover border border-border-hover'
                          : 'hover:bg-surface-hover/50 border border-transparent'
                      }`}
                    >
                      {/* Active indicator */}
                      {session.id === currentSessionId && (
                        <motion.div
                          layoutId="activeSession"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-accent"
                          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                        />
                      )}

                      <MessageSquare className={`w-4 h-4 mt-0.5 flex-shrink-0 transition-colors ${
                        session.id === currentSessionId ? 'text-accent-light' : 'text-text-muted group-hover:text-text-tertiary'
                      }`} />

                      <div className="flex-1 min-w-0 text-left">
                        <p className={`text-sm truncate transition-colors ${
                          session.id === currentSessionId ? 'text-text-primary font-medium' : 'text-text-secondary group-hover:text-text-primary'
                        }`}>
                          {session.title}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Clock className="w-3 h-3 text-text-muted" />
                          <span className="text-[11px] text-text-muted">
                            {new Date(session.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="text-[11px] text-text-muted">
                            · {session.messageCount} msgs
                          </span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.85 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteSession(session.id)
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/10 transition-all duration-200"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-text-muted hover:text-red-400 transition-colors" />
                      </motion.button>
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border-subtle">
              <div className="flex items-center gap-2 text-[11px] text-text-muted">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />
                <span className="font-medium tracking-wide">Neural Lab v2.0</span>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
