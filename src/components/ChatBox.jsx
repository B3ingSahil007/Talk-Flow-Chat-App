import React, { useContext, useEffect, useState } from 'react'
// import assets from '../assets/assets'
import { CiImageOn } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";
import { AppContext } from '../context/AppContext';
import SloganChanger from './SloganChanger';
import { SiImessage } from 'react-icons/si';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { arrayUnion } from 'firebase/firestore';
import { toast } from 'react-toastify';
import upload from '../lib/upload';
import { BsExclamationCircle } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";

const ChatBox = () => {
    const { userData, messageId, chatUser, messages, setMessages, chatVisible, setChatVisible } = useContext(AppContext)
    const [input, setInput] = useState("")

    // Function to handle sending a text message
    const sendMessage = async () => {
        try {
            if (input && messageId) {
                // Add the new message to the 'messages' document in Firestore
                await updateDoc(doc(db, 'messages', messageId), {
                    messages: arrayUnion({
                        sId: userData.id, // Sender ID
                        text: input, // Message text
                        createdAt: new Date() // Timestamp
                    })
                });

                // Update the last message and timestamp for each user in the chat
                const userIds = [chatUser.rId, userData.id]
                userIds.forEach(async (id) => {
                    const userChatsRef = doc(db, 'chats', id)
                    const userChatsSnapshot = await getDoc(userChatsRef)

                    if (userChatsSnapshot.exists()) {
                        const userChatData = userChatsSnapshot.data()
                        const chatIndex = userChatData.chatsData.findIndex((c) => c.messageId === messageId)
                        userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30)  // Store the first 30 characters of the message
                        userChatData.chatsData[chatIndex].updatedAt = Date.now()    // Update the timestamp
                        if (userChatData.chatsData[chatIndex].rId === userData.id) {
                            userChatData.chatsData[chatIndex].messageSeen = false   // Mark as unseen for the receiver
                        }
                        await updateDoc(userChatsRef, {
                            chatsData: userChatData.chatsData
                        })
                    }
                })
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)  // Show error notification
        }
        setInput("")    // Clear the input field
    }

    // Function to handle sending an image message
    const sendImage = async (e) => {
        try {
            const fileUrl = await upload(e.target.files[0]) // Upload the image and get the file URL
            if (fileUrl && messageId) {
                // Add the new image message to the 'messages' document in Firestore
                await updateDoc(doc(db, 'messages', messageId), {
                    messages: arrayUnion({
                        sId: userData.id, // Sender ID
                        image: fileUrl, // Image URL
                        createdAt: new Date() // Timestamp
                    })
                });

                // Update the last message and timestamp for each user in the chat
                const userIds = [chatUser.rId, userData.id]
                userIds.forEach(async (id) => {
                    const userChatsRef = doc(db, 'chats', id)
                    const userChatsSnapshot = await getDoc(userChatsRef)

                    if (userChatsSnapshot.exists()) {
                        const userChatData = userChatsSnapshot.data()
                        const chatIndex = userChatData.chatsData.findIndex((c) => c.messageId === messageId)
                        userChatData.chatsData[chatIndex].lastMessage = "Image" // Indicate that the last message was an image
                        userChatData.chatsData[chatIndex].updatedAt = Date.now()    // Update the timestamp
                        if (userChatData.chatsData[chatIndex].rId === userData.id) {
                            userChatData.chatsData[chatIndex].messageSeen = false   // Mark as unseen for the receiver
                        }
                        await updateDoc(userChatsRef, {
                            chatsData: userChatData.chatsData
                        })
                    }
                })
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)  // Show error notification
        }
    }

    // Function to convert Firestore timestamps to readable time format
    const convertTimeStamp = (timestamp) => {
        let date = timestamp.toDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        if (hour > 12) {
            return hour - 12 + ":" + minute + " PM"
        } else {
            return hour + ":" + minute + " AM"
        }
    }

    // Listen for real-time updates to the chat messages
    useEffect(() => {
        if (messageId) {
            const unSub = onSnapshot(doc(db, 'messages', messageId), (res) => {
                setMessages(res.data().messages.reverse())  // Update messages state with the latest data
                // console.log(res.data().messages.reverse());
            })
            return () => {
                unSub() // Clean up the listener on component unmount
            }
        }
    }, [messageId])

    return chatUser ? (
        <>
            {/* Chat Box UI */}
            <div className={`chat-box h-[89vh] sm:h-[88.5vh] relative bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white border-l border-black ${chatVisible ? "block" : "hidden"} lg:block sm:hidden`}>
                {/* Chat User Header */}
                <div className="chat-user flex items-center gap-[10px] py-3 px-[15px] border-b border-black">
                    <img src={chatUser.userData.avatar} alt="Profile_Image" className='first:w-[38px] first:aspect-[1/1] rounded-full' />
                    {/* <p>Chris Taylor <img src={assets.green_dot} alt="" /></p> */}
                    <p className='flex-1 font-bold text-base sm:text-lg text-gray-600 flex items-center gap-2'>{chatUser.userData.name} {Date.now() - chatUser.userData.lastSeen <= 70000 ? <span className="w-2 h-2 bg-green-500 rounded-full "></span> : null}</p>
                    {/* <img src={assets.help_icon} className='help w-8' alt="Help_Icon" /> */}
                    <BsExclamationCircle className="help w-7 h-7 cursor-pointer hidden sm:block" />
                    <IoIosArrowBack onClick={() => setChatVisible(false)} className="arrow-back w-7 h-7 cursor-pointer sm:hidden" />
                </div>
                {/* Chat Messages Section */}
                <div className="chat-message space-y-2 flex flex-col-reverse h-[calc(100%-70px)] pb-[50px] overflow-y-auto scrollbar-thin">
                    {messages && messages.map((msg, index) => {
                        return (
                            <div key={index} className={msg.sId === userData.id ? "sender-message flex items-end gap-2 justify-end mr-2" : "receiver-message flex items-end gap-2 ml-2"} >
                                {/* For Sender Messages */}
                                {msg.sId === userData.id ? (
                                    <>
                                        {msg.image ? (
                                            <>
                                                <div className="bg-gray-700 text-white p-[3px] rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px] max-w-[60%] mb-2">
                                                    <img
                                                        className="message-image w-[180px] max-w-[230px] sm:w-[250px] sm:max-w-[250px] mb-2 rounded object-cover"
                                                        src={msg.image}
                                                        alt="Sent_Image"
                                                    />
                                                    {/* <p className="text-gray-300 text-sm italic ml-1">Photo by {userData.name}</p> */}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                                    <p>{convertTimeStamp(msg.createdAt)}</p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="bg-gray-700 text-white p-2 rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px] max-w-[60%] mb-1">
                                                    <p className="message text-sm">{msg.text}</p>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                                    <p>{convertTimeStamp(msg.createdAt)}</p>
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    /* For Receiver Messages */
                                    <>
                                        {msg.image ? (
                                            <>
                                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                                    <p>{convertTimeStamp(msg.createdAt)}</p>
                                                </div>
                                                <div className="bg-gray-500 text-black p-[3px] rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] max-w-[60%] mb-2">
                                                    <img className="message-image w-[180px] max-w-[230px] sm:w-[250px] sm:max-w-[250px] mb-2 rounded object-cover" src={msg.image} alt="Received_Image" />
                                                    {/* <p className="text-gray-900 text-sm italic ml-1">Photo by {chatUser.userData.name}</p> */}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                                    <p>{convertTimeStamp(msg.createdAt)}</p>
                                                </div>
                                                <div className="bg-gray-500 text-black p-2 rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] max-w-[60%] mb-1">
                                                    <p className="message text-sm">{msg.text}</p>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
                {/* Chat Input Section */}
                <div className="chat-input flex items-center gap-3 px-[10px] py-[10px] bg-gray-700 absolute bottom-0 left-0 right-0">
                    <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Write Message . . ." className="bg-transparent flex-1 border-none outline-none text-sm sm:text-base" />
                    <input onChange={sendImage} type="file" id="image" accept="image/png, image/jpeg, image/jpg" className="hidden" />
                    <label htmlFor="image" className="flex">
                        <CiImageOn className="text-xl sm:text-2xl cursor-pointer text-gray-400 hover:text-gray-900" />
                    </label>
                    <IoIosSend onClick={sendMessage} className="text-xl sm:text-2xl cursor-pointer text-gray-400 hover:text-gray-900" />
                </div>
            </div>
        </>
    ) : (<div className={`chat-welcome flex flex-col items-center justify-center text-center h-[88.5vh] bg-gradient-to-b from-gray-800 via-gray-900 to-black border-l border-black ${chatVisible ? "hidden" : "block"} lg:block sm:hidden`}>
        <div className="flex flex-col justify-center items-center h-full">
            <SiImessage className="text-5xl md:text-7xl text-black animate-bounce mb-2" />
            <SloganChanger />
        </div>
    </div>

    )
}

export default ChatBox
