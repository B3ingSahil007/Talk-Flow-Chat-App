import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRo7AvceIKZWhlghRLsJ_Awrw8caVpLes",
    authDomain: "talkflow-8527b.firebaseapp.com",
    projectId: "talkflow-8527b",
    storageBucket: "talkflow-8527b.firebasestorage.app",
    messagingSenderId: "129434198787",
    appId: "1:129434198787:web:12bd56bb84e83542ccff36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Function to sign up a new user
const signup = async (username, email, password, mobilenumber) => {
    try {
        // Create a user with email and password
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user

        // Add user data to Firestore in 'users' collection
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

        // Initialize empty chat data for the new user
        await setDoc(doc(db, "chats", user.uid), {
            chatsData: []
        })
        toast.success("User Successfully Created")

    } catch (error) {
        console.error(error)
        // Show error message from Firebase error code
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

// Function to log in an existing user
const login = async (email, password) => {
    try {
        // Sign in the user with email and password
        await signInWithEmailAndPassword(auth, email, password)
        toast.success("Log In Successfull")

    } catch (error) {
        console.error(error)
        // Show error message from Firebase error code
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

// Function to log out the user
const logout = async () => {
    try {
        // Sign out the user
        await signOut(auth)
        toast.success("LogOut Successfull, Visit Again...")

    } catch (error) {
        console.error(error)
        // Show error message from Firebase error code
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

// Function to reset the user's password
const resetPassword = async (email) => {
    if (!email) {
        toast.error("Enter Your Email")
        return null
    }
    try {
        // Query Firestore for the user with the provided email
        const userRef = collection(db, "users")
        const q = query(userRef, where("email", "==", email))
        const querySnap = await getDocs(q)

        // If email exists in the Firestore, send a password reset email
        if (!querySnap.empty) {
            await sendPasswordResetEmail(auth, email)
            toast.success("Reset Email Sent")
        } else {
            toast.error("Email Doesn't Exists")
        }

    } catch (error) {
        console.error(error)
        // Show error message from Firebase error code
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

// Export functions and Firestore instances for use in other parts of the app
export { signup, login, logout, resetPassword, auth, db }