'use client'
import { useState, useEffect } from 'react';
import Auth from '../../components/Auth.jsx';



export default function SignUp() {

    return (
        <div id="sso-wrapper" className="flex flex-col h-screen w-screen">
            <Auth />
        </div>
    )

}