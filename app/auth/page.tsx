'use client'
import { useState, useEffect } from 'react';
import Auth from '../../components/Auth.jsx';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google'
import { useRouter } from 'next/navigation';



export default function SignUp() {
    

    const [error, setError] = useState('')
    const router = useRouter();
    const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

    const handleLogin = async (credResponse: CredentialResponse) => {
        try {
          const response = await fetch('/api/auth/callback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: credResponse.credential }),
          });
    
          if (response.ok) {
            router.push('/dashboard'); // or wherever your protected route is
          } else {
            setError('Authentication failed. Please try again.');
          }
        } catch (err) {
          console.error(err);
          setError('Something went wrong. Please try again later.');
        }
      }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-slate-950 text-white px-6 py-12 space-y-16">
          
          <section className="max-w-3xl text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Speak Freely.
            </h1>
            <p className="text-gray-300 text-lg md:text-xl">
              Polyglot AI is your intelligent language partner — ready to converse, correct, and coach you in real-time. Any time, any where.
            </p>
          </section>
    
          <section className="max-w-3xl space-y-4 text-center text-sm text-gray-400">
            <p>
              Built with AI voice agents, PolyglotAI helps you learn by doing. Instead of memorizing flashcards, you'll engage in realistic conversations that adapt to your pace and proficiency.
            </p>
            <p>
              Whether you're preparing for travel, improving for work, or just for fun — you'll get instant feedback, and grow your confidence with every interaction.
            </p>
          </section>
    
          <section className="w-full max-w-md bg-white text-slate-900 rounded-2xl shadow-xl p-8 space-y-4">
            <div className="text-center">
              <p className="text-base font-medium text-slate-800 mb-4">
                Sign in with Google to get started
              </p>
              <GoogleOAuthProvider clientId={client_id!}>
                <GoogleLogin
                  onSuccess={handleLogin}
                  onError={() => 'Login failed. Please try again.'}
                  theme="filled_blue"
                  shape="rectangular"
                  flow="auth-code"
                  useOneTap
                />
              </GoogleOAuthProvider>
            </div>
            <div className="text-xs text-center text-gray-500">
                No spam. No tracking. Just learning.
            </div>
          </section>
        </div>
      )
}