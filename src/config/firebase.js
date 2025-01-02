import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyBRo7AvceIKZWhlghRLsJ_Awrw8caVpLes",
    authDomain: "talkflow-8527b.firebaseapp.com",
    projectId: "talkflow-8527b",
    storageBucket: "talkflow-8527b.firebasestorage.app",
    messagingSenderId: "129434198787",
    appId: "1:129434198787:web:12bd56bb84e83542ccff36"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password, mobilenumber) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user
        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email,
            password,
            mobilenumber: mobilenumber,
            name: "",
            avatar: "",
            bio: "Hey, I'm using TalkFlow Chat App",
            lastSeen: Date.now()
        })
        await setDoc(doc(db, "chats", user.uid), {
            chatsData: []
        })
        toast.success("User Successfully Created")

    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        toast.success("Log In Successfull")

    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = async () => {
    try {
        await signOut(auth)
        toast.success("LogOut Successfull, Visit Again...")

    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const resetPassword = async (email) => {
    if (!email) {
        toast.error("Enter Your Email")
        return null
    }
    try {
        const userRef = collection(db, "users")
        const q = query(userRef, where("email", "==", email))
        const querySnap = await getDocs(q)
        if (!querySnap.empty) {
            await sendPasswordResetEmail(auth, email)
            toast.success("Reset Email Sent")
        } else {
            toast.error("Email Doesn't Exists")
        }

    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

export { signup, login, logout, resetPassword, auth, db }