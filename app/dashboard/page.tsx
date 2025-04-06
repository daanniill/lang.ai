'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import LiveKitModal from "../../components/LiveKitModal.jsx"
import SkillModal from '../../components/SkillsModal.tsx';

export default function Dashboard() {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! Ready to practice a conversation in your target language?' },
  ])
  const [showSkillModal, setShowSkillModal]= useState(false);
  const [skillLevel, setSkillLevel] = useState('');
  const [strengths, setStrengths] = useState('');
  const [weaknesses, setWeaknesses] = useState('');
  const [userLanguage, setLanguage] = useState('');

  const sendMessage = () => {
    if (!message.trim()) return
    const newMessages = [...messages, { sender: 'user', text: message }]
    setMessages(newMessages)
    setMessage('')
  }

  const getUserPreferences = async () => {
    const userEmail = sessionStorage.getItem('userEmail');

    if (userEmail) {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({email: userEmail})
      })

      if (response.ok) {
        const data = await response.json();

        const {email, language_used, name, skill_level, strengths, weaknesses, student_id} = data;

        if (!skill_level || !strengths || !weaknesses) {
          setSkillLevel(skillLevel)
          setStrengths(strengths || '')
          setWeaknesses(weaknesses || '');
          setShowSkillModal(true);
        }


      } else {
        console.error("I dont even know what else could it possibly be ")
      }
    } else {
      console.error("no email in session storage, something went wrong big time")
    }

  }

  const handleSkillSubmit = async (skillsData) => {
    const userEmail = sessionStorage.getItem('userEmail');

    if (userEmail) {
      const response = await fetch('/api/users/updateSkills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          skill_level: skillsData.skillLevel,
          strengths: skillsData.strengths,
          weaknesses: skillsData.weaknesses,
          userLanguage: skillsData.userLanguage
        })
      });

      if (response.ok) {
        const data = await response.json();
        setShowSkillModal(false);
        // close modal and then render the rest of the ui for the chatting
      } else {
        console.error("Error updating skills");
      }
    }
  };

  useEffect(()=> {
    getUserPreferences();

  }, [])

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
      <main>
        <LiveKitModal/>
        {showSkillModal && (
          <SkillModal
            userLanguage={userLanguage}
            skillLevel={skillLevel}
            strengths={strengths}
            weaknesses={weaknesses}
            setLanguage={setLanguage}
            setSkillLevel={setSkillLevel}
            setStrengths={setStrengths}
            setWeaknesses={setWeaknesses}
            onClose={() => setShowSkillModal(false)}
            onSubmit={handleSkillSubmit}
          />
        )}
      </main>
    </div>
  )
}