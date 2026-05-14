'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'
import Scene3D from './components/Scene3D'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import TypingIndicator from './components/TypingIndicator'
import { useLocalStorage } from './hooks/useLocalStorage'
import { Sparkles } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface ChatSession {
  id: string
  title: string
  timestamp: number
  messageCount: number
  messages: Message[]
}

const WELCOME_MESSAGES: Message[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: "# Welcome to Neural Lab\n\nI'm your advanced AI assistant, ready to help with:\n\n- **Code** - Write, debug, and explain any programming language\n- **Analysis** - Deep dive into complex topics and data\n- **Creativity** - Brainstorm ideas, write content, design solutions\n- **Learning** - Explain concepts from quantum physics to philosophy\n\nWhat would you like to explore today?",
    timestamp: Date.now(),
  },
]

// Simulated AI response function
const simulateAIResponse = async (userMessage: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

  const responses = [
    `I've analyzed your request about "${userMessage.slice(0, 30)}..." and here's what I found:\n\nThis is a fascinating topic that touches on several key areas. Let me break it down for you:\n\n## Key Points\n\n1. **First consideration** - The fundamental principles at play here involve complex interactions between multiple systems\n2. **Implementation** - When approaching this practically, you'll want to consider scalability and edge cases\n3. **Optimization** - There are several ways to optimize this depending on your specific constraints\n\n\`\`\`javascript\n// Example implementation\nfunction analyzeRequest(input) {\n  const tokens = input.split(' ');\n  const priority = tokens.length > 5 ? 'high' : 'low';\n  return { tokens, priority, timestamp: Date.now() };\n}\n\`\`\`\n\nWould you like me to dive deeper into any specific aspect?`,

    `Great question! Let me provide a comprehensive answer:\n\nThe concept you're asking about has evolved significantly over time. Here's the current state of understanding:\n\n> "The best way to predict the future is to invent it." - Alan Kay\n\n### Overview\n\n| Aspect | Description | Priority |\n|--------|-------------|----------|\n| Core Logic | Primary functionality | High |\n| Edge Cases | Boundary conditions | Medium |\n| Performance | Speed optimization | High |\n\n\`\`\`python\n# Python implementation\ndef process_query(query: str) -> dict:\n    \"\"\"Process and analyze user query\"\"\"\n    return {\n        'length': len(query),\n        'complexity': 'high' if len(query) > 50 else 'low',\n        'entities': extract_entities(query)\n    }\n\`\`\`\n\nLet me know if you need clarification on anything!`,

    `Interesting! Here's my analysis:\n\n## Understanding the Problem\n\nWhen we look at **"${userMessage.slice(0, 40)}"**, we need to consider:\n\n- The context and constraints\n- Available resources and limitations\n- Desired outcomes and success metrics\n\n## Solution Approach\n\n\`\`\`typescript\ninterface Solution {\n  approach: string;\n  complexity: 'O(1)' | 'O(n)' | 'O(n\u00B2)';\n  scalable: boolean;\n}\n\nconst solution: Solution = {\n  approach: 'Divide and conquer',\n  complexity: 'O(n)',\n  scalable: true\n};\n\`\`\`\n\n### Next Steps\n\n1. Validate the approach with test cases\n2. Implement the core algorithm\n3. Optimize for performance\n4. Add comprehensive documentation\n\nDoes this align with what you were looking for?`,
  ]

  return responses[Math.floor(Math.random() * responses.length)]
}

export default function Home() {
  const [sessions, setSessions] = useLocalStorage<ChatSession[]>('neural-lab-sessions', [])
  const [currentSessionId, setCurrentSessionId] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>(WELCOME_MESSAGES)
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Initialize session
  useEffect(() => {
    if (!currentSessionId) {
      const newId = uuidv4()
      setCurrentSessionId(newId)
      const newSession: ChatSession = {
        id: newId,
        title: 'New Conversation',
        timestamp: Date.now(),
        messageCount: 1,
        messages: WELCOME_MESSAGES,
      }
      setSessions((prev) => [newSession, ...prev])
    }
  }, [currentSessionId, setSessions])

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSend = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Update session title on first user message
    setSessions((prev) =>
      prev.map((s) =>
        s.id === currentSessionId
          ? {
              ...s,
              title: s.title === 'New Conversation' ? content.slice(0, 40) + (content.length > 40 ? '...' : '') : s.title,
              messageCount: s.messageCount + 1,
              messages: [...s.messages, userMessage],
            }
          : s
      )
    )

    try {
      const aiContent = await simulateAIResponse(content)
      const aiMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: aiContent,
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, aiMessage])

      setSessions((prev) =>
        prev.map((s) =>
          s.id === currentSessionId
            ? {
                ...s,
                messageCount: s.messageCount + 1,
                messages: [...s.messages, aiMessage],
              }
            : s
        )
      )
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }, [currentSessionId, setSessions])

  const handleNewChat = useCallback(() => {
    const newId = uuidv4()
    setCurrentSessionId(newId)
    setMessages(WELCOME_MESSAGES)
    const newSession: ChatSession = {
      id: newId,
      title: 'New Conversation',
      timestamp: Date.now(),
      messageCount: 1,
      messages: WELCOME_MESSAGES,
    }
    setSessions((prev) => [newSession, ...prev])
    setSidebarOpen(false)
  }, [setSessions])

  const handleSelectSession = useCallback((id: string) => {
    setCurrentSessionId(id)
    const session = sessions.find((s) => s.id === id)
    if (session) {
      setMessages(session.messages)
    }
    setSidebarOpen(false)
  }, [sessions])

  const handleDeleteSession = useCallback((id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id))
    if (id === currentSessionId) {
      handleNewChat()
    }
  }, [currentSessionId, setSessions, handleNewChat])

  const sessionList = sessions.map((s) => ({
    id: s.id,
    title: s.title,
    timestamp: s.timestamp,
    messageCount: s.messageCount,
  }))

  return (
    <div className="relative min-h-screen bg-surface-primary overflow-hidden">
      {/* Atmospheric Background System */}
      <Scene3D />

      {/* Header */}
      <Header sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        sessions={sessionList}
        currentSessionId={currentSessionId}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
        onDeleteSession={handleDeleteSession}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className={`pt-16 h-screen transition-all duration-500 ease-spring ${sidebarOpen ? 'md:pl-72' : ''}`}>
        <div className="h-full flex flex-col max-w-3xl mx-auto px-4 md:px-6">
          {/* Messages Area */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto py-8 space-y-1 scrollbar-thin"
          >
            <AnimatePresence mode="popLayout">
              {messages.map((message, index) => (
                <ChatMessage key={message.id} message={message} index={index} />
              ))}
            </AnimatePresence>

            {isLoading && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="pb-6 pt-2"
          >
            <ChatInput onSend={handleSend} isLoading={isLoading} />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center text-xs text-text-muted mt-4 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 opacity-50" />
              Neural Lab can make mistakes. Consider checking important information.
            </motion.p>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
