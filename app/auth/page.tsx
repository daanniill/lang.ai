'use client'
import { useState, useEffect } from 'react';
import Auth from '../../components/Auth.jsx';



export default function SignUp() {

    return (
        <div id="sso-wrapper" className="flex flex-col justify-center h-screen w-screen bg-slate-950">
            <Auth />
        </div>
    )

}