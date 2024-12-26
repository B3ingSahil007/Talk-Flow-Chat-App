import React from 'react'
import LeftSideBar from '../components/LeftSideBar'
import ChatBox from '../components/ChatBox'
import RightSideBar from '../components/RightSideBar'
import { SiImessage } from "react-icons/si";

const Chat = () => {
    return (
        <>
            <div className="chat-header gap-3 py-3 px-6 shadow-lg flex items-center bg-gradient-to-r from-gray-500 to-gray-900">
                <SiImessage className='text-6xl'/>
                <h2 className="text-2xl font-semibold prata-regular underline underline-offset-4">Talk Flow</h2>
            </div>
            <div className="Chat bg-gradient-to-r from-gray-500 to-gray-900 text-white grid items-center">
                <div className="chat-container w-full h-[86.3vh] grid grid-cols-[1fr,2fr,1fr]">
                    <div>
                        <LeftSideBar />
                    </div>
                    <div>
                        <ChatBox />
                    </div>
                    <div>
                        <RightSideBar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat
