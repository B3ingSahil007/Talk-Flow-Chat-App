import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { SiImessage } from "react-icons/si";
import { auth, db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import upload from '../lib/upload';
import { AppContext } from '../context/AppContext';

const ProfileUpdate = () => {
    const navigate = useNavigate(); // React Router navigation hook
    const [image, setImage] = useState(false); // State for new image to be uploaded
    const [name, setName] = useState(""); // State for the user's name
    const [bio, setBio] = useState(""); // State for the user's bio
    const [uid, setUid] = useState(""); // State for storing the user's unique ID
    const [prevImage, setPrevImage] = useState(""); // State for previously uploaded image URL
    const { setUserData } = useContext(AppContext); // Context function to update user data globally

    const profileUpdate = async (event) => {
        event.preventDefault()  // Prevent form's default submission behavior
        try {
            // Validate if an image (new or previous) is provided
            if (!prevImage && !image) {
                toast.error("Upload Your Profile Picture")  // Show error if no image is uploaded
                return
            }
            const docRef = doc(db, 'users', uid)    // Reference to the Firestore document of the user
            if (image) {
                // If a new image is uploaded
                const imageUrl = await upload(image); // Upload the image and get the URL
                setPrevImage(imageUrl); // Set the new image as the previous image
                await updateDoc(docRef, {
                    avatar: imageUrl, // Update avatar in Firestore
                    bio: bio, // Update bio in Firestore
                    name: name, // Update name in Firestore
                });
            } else {
                // If no new image is uploaded
                await updateDoc(docRef, {
                    bio: bio, // Update bio in Firestore
                    name: name, // Update name in Firestore
                });
            }
            const snap = await getDoc(docRef); // Get the updated user document
            setUserData(snap.data()); // Update the user data in the global context
            navigate('/chat'); // Navigate to the chat page

        } catch (error) {
            console.log(error); // Log the error for debugging
            toast.error(error.message); // Show error message
        }
    }

    // console.log(image);
    // useEffect to fetch and initialize user data on component load
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // If the user is authenticated
                setUid(user.uid); // Set the user's UID
                const docRef = doc(db, "users", user.uid); // Reference to the user's Firestore document
                const docSnap = await getDoc(docRef); // Fetch the user's document
                if (docSnap.data().name) {
                    setName(docSnap.data().name); // Initialize name if it exists
                }
                if (docSnap.data().bio) {
                    setBio(docSnap.data().bio); // Initialize bio if it exists
                }
                if (docSnap.data().avatar) {
                    setPrevImage(docSnap.data().avatar); // Initialize avatar if it exists
                }
            } else {
                navigate('/');  // Redirect to the login page if not authenticated
            }
        })
    }, [])

    return (
        <>
            <div className="profile bg-gradient-to-b from-gray-800 via-gray-900 to-black min-h-[100vh] text-white flex items-center justify-center">
                {/* Background Text */}
                <h1 className="absolute text-[4rem] sm:text-[7rem] md:text-[10rem] lg:text-[15rem] font-bold text-gray-600 opacity-10 z-0 select-none animate-pulse top-0">
                    Text Flow
                </h1>

                {/* Profile Update Form */}
                <div className="profile-container flex flex-col lg:flex-row items-center justify-between w-[90%] sm:w-[80%] md:w-[700px] lg:w-[800px] rounded border-2 border-black shadow-2xl bg-gradient-to-b from-transparent to-gray-900 relative z-10 p-6">
                    <form onSubmit={profileUpdate} className='flex flex-col gap-3 w-full lg:w-[60%]'>
                        <h3 className="text-lg md:text-xl lg:text-2xl">Profile Details :</h3>

                        {/* Upload Profile Image */}
                        <label className='flex items-center gap-2 text-gray-400 cursor-pointer border p-2 rounded border-black' htmlFor="avatar">
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
                            {image ? (
                                <><img src={URL.createObjectURL(image)} alt="Profile" className="w-8 h-8 sm:w-9 sm:h-9 object-cover rounded-full" /><p className=''>Upload Profile Image</p></>
                            ) : (
                                <>
                                    <FaUserCircle className='text-3xl sm:text-4xl' /> Upload Profile Image
                                </>
                            )}
                        </label>
                        {/* Input Fields */}
                        <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Your Name . . .' className='bg-transparent p-2 border border-black rounded' required />
                        <textarea onChange={(e) => setBio(e.target.value)} value={bio} placeholder='Write Profile Bio . . .' className='bg-transparent p-2 border border-black rounded' required></textarea>
                        <button type='submit' className='btn btn-outline-light py-2'>Save</button>
                        <button onClick={() => navigate('/chat')} className='btn btn-outline-light py-2'>Cancel</button>
                    </form>
                    {/* Profile Image Preview */}
                    {image ? (
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Profile"
                            className="w-44 h-44 sm:w-72 sm:h-72 mt-4 object-cover rounded-full"
                        />
                    ) : prevImage ? (
                        <img
                            src={prevImage}
                            alt="Profile"
                            className="w-44 h-44 sm:w-72 sm:h-72 mt-4 object-cover rounded-full"
                        />
                    ) : (
                        <SiImessage className='profile_pic w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 text-gray-500 mt-6 lg:mt-0' />
                    )}
                </div>
            </div>
        </>
    );
};

export default ProfileUpdate;
