'use client'
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';



export default function Home() {

  const router = useRouter();

  return (
    <div id="site-map" className="flex flex-col items-center justify-center h-screen w-screen bg-slate-950 text-white px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Learn a second language With AI
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10">
          Practice real conversation with an AI that listens, speaks, and helps you grow. No pressure—just learning.
        </p>
      </div>

      <div className="flex gap-6">
        <button
          onClick={() => router.push('/auth')}
          className="px-6 py-3 text-lg bg-white text-slate-900 font-semibold rounded-xl shadow-md transition-transform duration-300 ease-in-out hover:scale-110"
        >
          Get Started
        </button>
        <button
          onClick={() => router.push('/auth')}
          className="px-6 py-3 text-lg border border-white text-white rounded-xl shadow-md transition-transform duration-300 ease-in-out hover:scale-110"
        >
          I Already Have an Account
        </button>
      </div>
    </div>
  );
}
