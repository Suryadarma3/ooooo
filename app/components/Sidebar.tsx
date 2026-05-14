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
}

export default function Sidebar({
  isOpen,
  sessions,
  currentSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
}: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {}}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-16 bottom-0 w-72 z-40 glass-panel border-r border-cyber-purple/20 overflow-hidden flex flex-col"
          >
            {/* New Chat Button */}
            <div className="p-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNewChat}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-cyber-purple/20 to-cyber-cyan/20 border border-cyber-purple/30 hover:border-cyber-cyan/40 transition-all duration-300 group"
              >
                <Plus className="w-5 h-5 text-cyber-cyan-light group-hover:rotate-90 transition-transform duration-300" />
                <span className="text-sm font-medium text-slate-200">New Chat</span>
              </motion.button>
            </div>

            {/* Session List */}
            <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
              <div className="px-3 py-2 text-xs text-slate-500 uppercase tracking-wider font-medium">
                Recent Conversations
              </div>

              {sessions.length === 0 ? (
                <div className="px-3 py-8 text-center">
                  <MessageSquare className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">No conversations yet</p>
                </div>
              ) : (
                sessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => onSelectSession(session.id)}
                      className={`w-full flex items-start gap-3 px-3 py-3 rounded-xl transition-all duration-300 group ${
                        session.id === currentSessionId
                          ? 'bg-cyber-purple/20 border border-cyber-purple/40'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <MessageSquare className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        session.id === currentSessionId ? 'text-cyber-cyan-light' : 'text-slate-500'
                      }`} />

                      <div className="flex-1 min-w-0 text-left">
                        <p className={`text-sm truncate ${
                          session.id === currentSessionId ? 'text-cyber-cyan-light' : 'text-slate-300'
                        }`}>
                          {session.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-slate-600" />
                          <span className="text-xs text-slate-500">
                            {new Date(session.timestamp).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-slate-600">
                            {session.messageCount} msgs
                          </span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteSession(session.id)
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/20 transition-all duration-200"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </motion.button>
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-cyber-purple/10">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
                <span>Neural Lab v1.0</span>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
