'use client'
import { useState, useEffect } from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'


export default function Auth() {

    // if you want to add more SSO stuff should just add below this google one but this is taking so much time lets just not
    // dont worry this clientid is not a secret everything is fine
    const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    return (
        <div className='flex flex-col h-1/3 w-1/3 bg-slate-50 p-4 px-10 rounded-lg shadow-md'>

            <span className="px-4 py-6 text-black justify-center text-center font-semibold">I will put some Super Cool Text</span>
            <span className="px-4 py-6 text-black justify-center text-center font-semibold">Right freaking here and it will look so polished!</span>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                <GoogleLogin 
                    onSuccess={async (credResponse) => {
                        console.log(credResponse)
                        const response = await fetch('/api/auth/callback', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({credential: credResponse.credential})
                        })
                    }}
                    onError={() => {
                        console.error('Login failed');
                    }}
                    theme="filled_blue"
                    shape="rectangular"
                    flow='auth-code'
                    useOneTap
                    ></GoogleLogin>
            </GoogleOAuthProvider>
        </div>
    )
}