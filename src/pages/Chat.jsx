import React from 'react'
import LeftSideBar from '../components/LeftSideBar'
import ChatBox from '../components/ChatBox'
import RightSideBar from '../components/RightSideBar'

const Chat = () => {
    return (
        <>
            <div className="chat-header py-4 px-6 bg-gray-600 shadow-lg">
                <h2 className="text-2xl font-semibold">Chat Room</h2>
            </div>
            <div className="Chat h-[88vh] bg-gradient-to-r from-gray-500 to-gray-700 text-white grid items-center">
                <div className="chat-container w-full h-[80vh] bg-slate-600 grid grid-cols-[1fr,2fr,1fr]">
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
