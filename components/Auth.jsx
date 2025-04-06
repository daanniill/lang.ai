'use client'
import { useState, useEffect } from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'


export default function Auth() {

    // if you want to add more SSO stuff should just add below this google one but this is taking so much time lets just not
    // dont worry this clientid is not a secret everything is fine
    const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-slate-950">
            <div className="flex flex-col items-center w-full max-w-md bg-white p-10 rounded-2xl shadow-xl space-y-6">
                <h1 className="text-2xl font-semibold text-gray-900 text-center">
                    Sign-up with Google
                </h1>
                <p className="text-gray-600 text-center text-sm">
                    Use your Google account to get started quickly.
                </p>
                <div className="w-full">
                    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                        <GoogleLogin
                            onSuccess={async (credResponse) => {
                                console.log(credResponse);
                                const response = await fetch('/api/auth/callback', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ credential: credResponse.credential }),
                                });
                            }}
                            onError={() => {
                                console.error('Login failed');
                            }}
                            theme="filled_blue"
                            shape="rectangular"
                            flow="auth-code"
                            useOneTap
                        />
                    </GoogleOAuthProvider>
                </div>
            </div>
        </div>
    )
}