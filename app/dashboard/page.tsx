'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! Ready to practice a conversation in your target language?' },
  ])

  const sendMessage = () => {
    if (!message.trim()) return
    const newMessages = [...messages, { sender: 'user', text: message }]
    setMessages(newMessages)
    setMessage('')
  }

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-white">
      <aside className="hidden md:flex w-64 flex-col bg-slate-900 p-6 border-r border-slate-800">
        <h2 className="text-xl font-bold mb-6">PolyglotAI</h2>
        <nav className="flex flex-col space-y-4 text-sm text-slate-400">
          <span className="hover:text-white cursor-pointer">🗣️ New Conversation</span>
          <span className="hover:text-white cursor-pointer">📈 Progress Report</span>
          <span className="hover:text-white cursor-pointer">⚙️ Preferences</span>
        </nav>
        <div className="mt-auto pt-6 border-t border-slate-800">
          <button
            onClick={() => router.push('/signup')}
            className="text-sm text-slate-400 hover:text-red-400"
          >
            Log out
          </button>
        </div>
      </aside>
    </div>
  )
}