'use client'
import {
    useVoiceAssistant,
    BarVisualizer,
    VoiceAssistantControlBar,
    useTrackTranscription,
    useLocalParticipant
} from "@livekit/components-react"

import { LocalParticipant, Track } from "livekit-client"
import { useEffect, useState} from "react";

const SimpleChatBot = () => {
    return <div className="chatbot-visualizer">
        <div className="Visualizer-container"></div>
        <div className="control-section">
            <VoiceAssistantControlBar/>
            <div className="conversation">

            </div>
        </div>
    </div>
}

export default SimpleChatBot