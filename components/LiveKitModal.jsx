'use client'
import { useState, useCallback } from "react";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import SimpleChatBot from "./SimpleChatBot";

const LiveKitModal = ({}) =>{
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <LiveKitRoom
                    serverUrl=""
                    token=""
                    connect={true}
                    video={false}
                    audio={true}
                    >
                        <RoomAudioRenderer/>
                        <SimpleChatBot/>
                    </LiveKitRoom>
            </div>
        </div>
    
    )
}

export default LiveKitModal

