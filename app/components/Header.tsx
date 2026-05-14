'use client'

import { motion } from 'framer-motion'
import { Zap, Menu, X, BrainCircuit } from 'lucide-react'

interface HeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export default function Header({ sidebarOpen, onToggleSidebar }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-cyber-purple/20"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleSidebar}
            className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center hover:border-cyber-cyan/40 transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-slate-300" />
            ) : (
              <Menu className="w-5 h-5 text-slate-300" />
            )}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2.5"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyber-purple to-cyber-cyan flex items-center justify-center shadow-lg shadow-cyber-purple/30">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold gradient-text tracking-tight">
                Neural Lab
              </h1>
              <p className="text-[10px] text-slate-500 -mt-0.5 tracking-widest uppercase">
                AI Assistant
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right: Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-cyber-cyan shadow-[0_0_8px_rgba(10,189,198,0.6)]"
            />
            <span className="text-xs text-cyber-cyan-light font-medium">Online</span>
          </div>

          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center"
          >
            <Zap className="w-4 h-4 text-cyber-purple-light" />
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  )
}
