'use client'
import { useState, useCallback } from "react";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import SimpleChatBot from "./SimpleChatBot";

const LiveKitModal = ({}) =>{
    const [isSubmittingName, setIsSubmittingName] = useState(true)
    const [name, setName] = useState("")
    const [token, setToken] = useState(null)

    const livekitApi = process.env.NEXT_PUBLIC_LIVEKIT_URL

    // getting the token from backend server so the agent can access the room
    const getToken = useCallback(async (userName) => {
        try {
            const response = await fetch(`/api/getToken?name=${encodeURIComponent(userName)}`)
            const token = await response.text()
            setToken(token);
            setIsSubmittingName(false)
        } catch (error) {
            console.error(error)
        }
    }, [])


    // need a name to submit to livekit to join room
    const handleNameSubmit = (e) => {
        e.preventDefault()
        if (name.trim()) {
            setIsSubmittingName(false)
            getToken(name)
        }
    }

    return (
        <div className="flex w-full h-full place-self-center">
            <div className="flex w-full h-full justify-center align-center">
                {isSubmittingName ? (
                   <form onSubmit={handleNameSubmit} className="place-self-center bg-cyan-600 p-3 rounded-lg">
                        <button onClick={() => {setName("participant")}} type="submit">Begin Session</button>
                   </form> 
                ) : token ? (
                    <LiveKitRoom className="w-full h-full"
                        serverUrl={livekitApi}
                        token={token}
                        connect={true}
                        video={false}
                        audio={true}
                        onDisconnected={() => {
                            setIsSubmittingName(true)
                        }}
                    >
                        <RoomAudioRenderer/>
                        <SimpleChatBot/>
                    </LiveKitRoom>
                ) : null}
                
            </div>
        </div>
    
    )
}

export default LiveKitModal

