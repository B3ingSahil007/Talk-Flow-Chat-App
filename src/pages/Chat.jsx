import React, { useContext, useEffect, useState } from 'react'
import LeftSideBar from '../components/LeftSideBar'
import ChatBox from '../components/ChatBox'
import RightSideBar from '../components/RightSideBar'
import { SiImessage } from "react-icons/si";
import { AppContext } from '../context/AppContext';

const Chat = () => {
    const { chatData, userData } = useContext(AppContext)    // Retrieve chat data and user data from context
    const [loading, setLoading] = useState(true)

    // Effect to set loading to false once chatData and userData are available
    useEffect(() => {
        if (chatData && userData) {
            setLoading(false)
        }
    }, [chatData, userData])

    return (
        <>
            {/* Chat Header */}
            <div className="chat-header gap-3 py-3 px-6 shadow-lg flex items-center justify-center bg-gradient-to-r from-gray-500 to-gray-900">
                <SiImessage className="text-4xl md:text-5xl text-black animate-pulse" />
                <h2 style={{ textShadow: '1px 5px 5px rgba(0, 0, 0, 0.5)' }} className="text-2xl md:text-3xl font-bold uppercase tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-slate-700 via-black to-slate-700"> Talk Flow </h2>
            </div>
            {/* Main Chat Area */}
            <div className="Chat bg-gradient-to-r from-gray-500 to-gray-900 text-white grid items-center h-[89vh] ">
                {loading ? <p className="text-black text-2xl md:text-4xl font-medium text-center mx-auto animate-ping">Loading . . .</p> :
                    <div className="chat-container w-full grid grid-cols-1 lg:grid-cols-[1fr,2fr,1fr]">
                        <div>
                            {/* Left Sidebar Component */}
                            <LeftSideBar />
                        </div>
                        <div>
                            {/* ChatBox Component */}
                            <ChatBox />
                        </div>
                        <div>
                            {/* Right Sidebar Component */}
                            <RightSideBar />
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Chat
