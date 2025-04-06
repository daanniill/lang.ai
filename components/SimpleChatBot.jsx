'use client'
import {
    useVoiceAssistant,
    BarVisualizer,
    VoiceAssistantControlBar,
    useTrackTranscription,
    useLocalParticipant
} from "@livekit/components-react"

import { LocalParticipant, Participant, Track } from "livekit-client"
import { useEffect, useState} from "react";

// the chat log that shows live transcription of the audio
const Message = ({type, text}) => {
    return <div className="message">
        <strong className={`message-${type}`}>
            {type === "agent" ? "Agent: " : "You: "}
        </strong>
        <span className="message-text">{text}</span>
    </div>
}

const SimpleChatBot = () => {
    // gets the audio track and transcription from the agent
    const {state, audioTrack, agentTranscriptions} = useVoiceAssistant()
    // gets the track from the local participant
    const localParticipant = useLocalParticipant()
    // gives us the transcription of any track, in this case we want that of the user(participant)
    const {segments: userTranscriptions} = useTrackTranscription (
        {
            publication: localParticipant.microphoneTrack,
            source: Track.Source.Microphone,
            participant: localParticipant.localParticipant
        }
    )

    const [messages, setMessages] = useState([])

    // maps all the incoming tracks to their respective source: agent or user, anytime either of them say anything
    useEffect(() => {
        const allMessages = [
          ...(agentTranscriptions?.map((t) => ({ ...t, type: "agent" })) ?? []),
          ...(userTranscriptions?.map((t) => ({ ...t, type: "user" })) ?? []),
        ].sort((a, b) => a.firstReceivedTime - b.firstReceivedTime);
        setMessages(allMessages);
    }, [agentTranscriptions, userTranscriptions]);

    return (
        <div className="flex flex-col space-y-4 p-4 bg-blue-800 rounded-lg shadow-md">
          <div className="flex justify-center items-center">
            <div className="w-full max-w-lg">
              <BarVisualizer
                state={state}
                barCount={7}
                trackRef={audioTrack}
              />
            </div>
          </div>
      
          <div className="flex flex-col space-y-4">
            <VoiceAssistantControlBar />
            <div className="space-y-2 overflow-y-auto max-h-96 bg-white p-4 rounded-lg shadow-sm border border-gray-300 text-black">
              {messages.map((msg, index) => (
                <Message key={msg.id || index} type={msg.type} text={msg.text} />
              ))}
            </div>
          </div>
        </div>
      );
    }

export default SimpleChatBot