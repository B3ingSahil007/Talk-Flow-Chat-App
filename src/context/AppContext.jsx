import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Create a context for app-wide state management
export const AppContext = createContext();

const AppContextProvider = (props) => {
    const navigate = useNavigate(); // To navigate between routes
    const [userData, setUserData] = useState(null); // Store user data
    const [chatData, setChatData] = useState(null); // Store chat data
    const [messageId, setMessageId] = useState(); // Store message id
    const [messages, setMessages] = useState([]); // Store messages in the chat
    const [chatUser, setChatUser] = useState(null); // Store the selected chat user
    const [msgImages, setMsgImages] = useState([]); // Store media/images from messages
    const [chatVisible, setChatVisible] = useState(false); // Track chat visibility

    // Function to load user data and update Firestore
    const loadUserData = async (uid) => {
        try {
            const userRef = doc(db, 'users', uid);   // Reference to the user document in Firestore
            const userSnap = await getDoc(userRef)  // Fetch user document data
            const userData = userSnap.data()
            // console.log(userData);
            setUserData(userData)

            // Navigate based on whether user has completed their profile
            if (userData.avatar && userData.name) {
                navigate('/chat')
            } else {
                navigate('/profile')
            }

            // Update lastSeen field to current timestamp in Firestore
            await updateDoc(userRef, {
                lastSeen: Date.now()
            })

            // Set an interval to update lastSeen every 60 seconds
            setInterval(async () => {
                if (auth.chatUser) {
                    await updateDoc(userRef, {
                        lastSeen: Date.now()
                    })
                }
            }, 60000);

        } catch (error) {
            console.log(error);
            toast.error(error.message || error);    // Show error message to the user
        }
    }

    // UseEffect to listen for changes in chat data for the logged-in user
    useEffect(() => {
        if (userData) {
            const chatRef = doc(db, 'chats', userData.id);  // Reference to the user's chat data in Firestore
            const unSub = onSnapshot(chatRef, async (res) => {
                const chatItems = res.data().chatsData  // Extract chat data
                // console.log(res.data());
                const tempData = []

                // Fetch the user data for each chat
                for (const item of chatItems) {
                    const userRef = doc(db, 'users', item.rId)  // Reference to the recipient user
                    const userSnap = await getDoc(userRef)  // Fetch recipient user data
                    const userData = userSnap.data()
                    tempData.push({ ...item, userData })
                }

                // Sort the chat data by the updated timestamp (most recent first)
                setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt))
            })
            return () => { unSub() }    // Cleanup the subscription when the component unmounts
        }
    }, [userData])  // Runs when userData changes

    // UseEffect to extract images from the messages array and store them in msgImages
    useEffect(() => {
        let tempVar = []
        messages && messages.map((msg) => {
            if (msg.image) {
                tempVar.push(msg.image) // If the message contains an image, push it to the array
            }
        })
        // console.log(tempVar)
        setMsgImages(tempVar)   // Set the msgImages state with the extracted images

    }, [messages])   // Runs when messages array changes

    // Provide context values to child components
    const value = {
        userData, setUserData, chatData, setChatData, loadUserData, navigate,
        messages, setMessages, messageId, setMessageId, chatUser, setChatUser,
        msgImages, setMsgImages, chatVisible, setChatVisible
    }
    
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;