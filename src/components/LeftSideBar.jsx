import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { CiMenuKebab } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { logout } from '../config/firebase'

const LeftSideBar = () => {
    const navigate = useNavigate()
    const { userData, chatData, chatUser, setChatUser, setMessageId, messageId, chatVisible, setChatVisible } = useContext(AppContext)
    const [user, setUser] = useState(null)  // State to store searched user
    const [showSearch, setShowSearch] = useState(false) // State to toggle search results

    // Handles input changes in the search bar
    const inputHandle = async (e) => {
        try {
            const input = e.target.value
            if (input) {
                setShowSearch(true) // Show search results
                const userRef = collection(db, 'users')
                const q = query(userRef, where("username", "==", input.toLowerCase()))
                const querySnap = await getDocs(q)

                // Check if user exists and is not the current user
                if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
                    setUser(querySnap.docs[0].data())
                    let userExist = false

                    // Check if user already exists in chat
                    chatData && chatData.map((user) => {
                        if (user.rId === querySnap.docs[0].data().id) {
                            userExist = true
                        }
                    })
                    if (!userExist) {
                        setUser(querySnap.docs[0].data())   // Set searched user
                    }
                } else {
                    setUser(null)   // No user found
                }
            } else {
                setShowSearch(false)    // Hide search results
            }

        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Error fetching user data!");   // Show error toast
        }
    }

    // Adds a new chat for the searched user
    const addChat = async () => {
        const messagesRef = collection(db, 'messages')
        const chatsRef = collection(db, 'chats')
        try {
            // Create a new message document
            const newMessageRef = doc(messagesRef)
            await setDoc(newMessageRef, {
                createAt: serverTimestamp(),
                messages: []
            })

            // Update chat references for both users
            await updateDoc(doc(chatsRef, user.id), {
                chatsData: arrayUnion({
                    messageId: newMessageRef.id,
                    lastMessage: "",
                    rId: userData.id,
                    updatedAt: Date.now(),
                    messageSeen: true
                })
            })

            await updateDoc(doc(chatsRef, userData.id), {
                chatsData: arrayUnion({
                    messageId: newMessageRef.id,
                    lastMessage: "",
                    rId: user.id,
                    updatedAt: Date.now(),
                    messageSeen: true
                })
            })

            // Fetch user data for the new chat
            const uSnap = await getDoc(doc(db, 'users', user.id))
            const uData = uSnap.data()

            // Update the UI to reflect the new chat
            setChat({
                messageId: newMessageRef.id,
                lastMessage: "",
                rId: user.id,
                updatedAt: Date.now(),
                messageSeen: true,
                userData: uData
            })
            setShowSearch(false); // Hide search results
            setChatVisible(true); // Show chat

        } catch (error) {
            toast.error(error.message)  // Show error toast
            console.log(error)
        }
    }

    // Sets the selected chat as active
    const setChat = async (item) => {
        try {
            // console.log(item);
            setMessageId(item.messageId); // Set the active chat ID
            setChatUser(item); // Set the active chat user

            // Update messageSeen status for the active chat
            const userChatsRef = doc(db, 'chats', userData.id)
            const userChatsSnapshot = await getDoc(userChatsRef)
            const userChatsData = userChatsSnapshot.data()
            const chatIndex = userChatsData.chatsData.findIndex((c) => c.messageId === item.messageId)
            userChatsData.chatsData[chatIndex].messageSeen = true
            await updateDoc(userChatsRef, {
                chatsData: userChatsData.chatsData
            })
            setChatVisible(true); // Show chat

        } catch (error) {
            console.log(error);
            toast.error(error); // Show error toast
        }
    }

    // Update user data for the current active chat
    useEffect(() => {
        const updateChatUserData = async () => {
            if (chatUser) {
                const userRef = doc(db, 'users', chatUser.userData.id)
                const userSnap = await getDoc(userRef)
                const userData = userSnap.data()
                setChatUser(prev => ({ ...prev, userData: userData }))
            }
        }
        updateChatUserData()
    }, [chatData])

    return (
        <>
            {/* Left sidebar container */}
            <div className={`ls bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white h-[89vh] sm:h-[88.5vh] ${chatVisible ? "hidden" : "block"} lg:block sm:hidden`}>
                <div className="ls-top p-2 sm:p-[10px] h-full flex flex-col">
                    {/* Navigation bar */}
                    <div className="ls-nav flex justify-between items-center">
                        <div className="flex items-center w-full">
                            {/* Search bar */}
                            <div className="ls-search bg-gray-700 flex items-center gap-2 px-2 py-2 mx-0 rounded w-full">
                                <IoMdSearch className="text-xl sm:text-2xl" />
                                <input onChange={inputHandle} type="text" className="bg-transparent border-none outline-none text-[12px] sm:text-[15px] w-full" placeholder="Search User's Name Here . . ." />
                            </div>
                            {/* Menu with profile and logout options */}
                            <div className="menu ml-5 sm:ml-7 relative p-2 group">
                                <CiMenuKebab className="cursor-pointer text-xl sm:text-2xl" />
                                <div className='sub-menu absolute top-[100%] right-0 w-[120px] sm:w-[140px] p-[10px] bg-gray-500 text-black rounded hidden group-hover:block'>
                                    <p onClick={() => navigate('/profile')} className='hover:text-gray-200 cursor-pointer'>Edit Profile</p>
                                    <hr className='border-none h-[1px] bg-black' />
                                    <p onClick={() => logout()} className='hover:text-gray-200 cursor-pointer'>Log Out</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* User list section */}
                    <div className="ls-list flex flex-col overflow-y-auto mt-3 scrollbar-thin rounded">
                        {showSearch && user ?
                            // Display searched user
                            <div onClick={addChat} className='friends group flex items-center gap-3 px-3 py-2 cursor-pointer text-xs sm:text-sm hover:bg-gray-600 rounded-lg'>
                                <img className='logo w-8 sm:w-10 aspect-[1/1] rounded-full' src={user.avatar ? user.avatar : assets.avatar_icon} alt="User_Avatar_Image" />
                                <p>{user.name}</p>
                            </div> :
                            // Display chat data
                            chatData && chatData.map((item, index) => (
                                <div onClick={() => setChat(item)} key={index} className={`friends group flex items-center gap-3 px-3 py-2 cursor-pointer text-xs sm:text-sm hover:bg-gray-600 rounded-lg ${item.messageSeen || item.messageId === messageId ? "" : "border border-black"}`} >
                                    <img src={item.userData.avatar} className="logo w-8 sm:w-10 aspect-[1/1] rounded-full" alt="Profile Icon" />
                                    <div className="flex flex-col">
                                        <p>{item.userData.name}</p>
                                        <span className={`text-[10px] sm:text-xs text-gray-500 group-hover:text-gray-400 ${item.messageSeen || item.messageId === messageId ? "" : "animate-pulse text-cyan-400"}`}>
                                            {item.lastMessage}
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeftSideBar;