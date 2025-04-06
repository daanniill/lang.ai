'use client'
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';



export default function Home() {

  const router = useRouter();

  return (
    <div id='site-map' className="flex flex-row h-screen w-screen justify-center">
      <button onClick= {() => router.push('/auth')} className='m-x px-5 text-lg place-self-center h-20 transition-transform duration-250 ease-in-out hover:scale-110'>
        Sign-up
      </button>
      <button onClick= {() => router.push('/auth')} className='m-x px-5 text-lg place-self-center h-20 transition-transform duration-250 ease-in-out hover:scale-110'>
        Sign-in
      </button>

    </div>
  );
}
