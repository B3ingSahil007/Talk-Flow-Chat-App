import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    const [chatData, setChatData] = useState(null)
    const [messageId, setMessageId] = useState()
    const [messages, setMessages] = useState([])
    const [chatUser, setChatUser] = useState(null)
    const [msgImages, setMsgImages] = useState([])
    const [chatVisible, setChatVisible] = useState(false)

    const loadUserData = async (uid) => {
        try {
            const userRef = doc(db, 'users', uid);
            const userSnap = await getDoc(userRef)
            const userData = userSnap.data()
            // console.log(userData);
            setUserData(userData)
            if (userData.avatar && userData.name) {
                navigate('/chat')
            } else {
                navigate('/profile')
            }
            await updateDoc(userRef, {
                lastSeen: Date.now()
            })
            setInterval(async () => {
                if (auth.chatUser) {
                    await updateDoc(userRef, {
                        lastSeen: Date.now()
                    })
                }
            }, 60000);

        } catch (error) {
            console.log(error);
            toast.error(error.message || error);
        }
    }

    useEffect(() => {
        if (userData) {
            const chatRef = doc(db, 'chats', userData.id);
            const unSub = onSnapshot(chatRef, async (res) => {
                const chatItems = res.data().chatsData
                // console.log(res.data());
                const tempData = []
                for (const item of chatItems) {
                    const userRef = doc(db, 'users', item.rId)
                    const userSnap = await getDoc(userRef)
                    const userData = userSnap.data()
                    tempData.push({ ...item, userData })
                }
                setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt))
            })
            return () => { unSub() }
        }
    }, [userData])

    useEffect(() => {
        let tempVar = []
        messages && messages.map((msg) => {
            if (msg.image) {
                tempVar.push(msg.image)
            }
        })
        // console.log(tempVar)
        setMsgImages(tempVar)

    }, [messages])

    const value = { userData, setUserData, chatData, setChatData, loadUserData, navigate, messages, setMessages, messageId, setMessageId, chatUser, setChatUser, msgImages, setMsgImages, chatVisible, setChatVisible }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;