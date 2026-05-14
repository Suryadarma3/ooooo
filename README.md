# Neural Lab - Futuristic AI Chat

A premium cyberpunk-themed AI chat application built with Next.js, Three.js, and Framer Motion.

## Features

- **No Login Required** - Start chatting immediately
- **3D Animated Background** - Floating particles and orbs with Three.js
- **Glassmorphism UI** - Premium frosted glass chat bubbles
- **Local Chat History** - Conversations saved in localStorage
- **Markdown & Code Highlighting** - Full support with syntax highlighting
- **Smooth Animations** - Framer Motion + GSAP powered transitions
- **Responsive Design** - Mobile and desktop optimized
- **Auto-scroll** - Smooth scrolling to latest messages
- **Typing Indicator** - Animated AI typing animation

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- TailwindCSS
- Three.js / React Three Fiber
- Framer Motion
- GSAP
- React Markdown
- Highlight.js

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Color Palette

- **Black**: `#050508` - Deep space black
- **Purple Neon**: `#711c91`, `#ea00d9` - Primary accent
- **Cyan**: `#0abdc6`, `#7df9ff` - Secondary accent
- **Electric Blue**: `#00d4ff` - Highlights

## Project Structure

```
app/
  components/
    Scene3D.tsx         # Three.js background scene
    Header.tsx          # Top navigation bar
    Sidebar.tsx         # Chat history sidebar
    ChatMessage.tsx     # Individual message bubble
    ChatInput.tsx       # Message input with suggestions
    TypingIndicator.tsx # AI typing animation
  hooks/
    useLocalStorage.ts  # Local storage hook
  page.tsx              # Main chat page
  layout.tsx            # Root layout
  globals.css           # Global styles & cyberpunk theme
```

## License

MIT
