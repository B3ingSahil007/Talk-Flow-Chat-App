import React, { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { SiImessage } from "react-icons/si";

const ProfileUpdate = () => {
    const [image, setImage] = useState(false)
    console.log(image);

    return (
        <>
            <div className="profile bg-gradient-to-b from-gray-800 via-gray-900 to-black min-h-[100vh] text-white flex items-center justify-center">
                <h1 className="absolute text-[4rem] sm:text-[7rem] md:text-[10rem] lg:text-[15rem] font-bold text-gray-600 opacity-10 z-0 select-none animate-pulse top-0">
                    Text Flow
                </h1>
                <div className="profile-container flex flex-col lg:flex-row items-center justify-between w-[90%] sm:w-[80%] md:w-[700px] lg:w-[800px] rounded border-2 border-black shadow-2xl bg-gray-900 relative z-10 p-6">
                    <form className='flex flex-col gap-4 w-full lg:w-[60%]'>
                        <h3 className="text-lg md:text-xl lg:text-2xl">Profile Details :</h3>
                        <label className='flex items-center gap-2 text-gray-400 cursor-pointer border p-2 rounded border-black' htmlFor="avatar">
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
                            {image ? (
                                <><img
                                    src={URL.createObjectURL(image)}
                                    alt="Profile"
                                    className="w-8 h-8 sm:w-9 sm:h-9 object-cover rounded-full"
                                /><p className=''>Upload Profile Image</p></>
                            ) : (
                                <>
                                    <FaUserCircle className='text-3xl sm:text-4xl' />
                                    Upload Profile Image
                                </>
                            )}
                        </label>
                        <input type="text" placeholder='Your Name . . .' className='bg-transparent p-2 border border-black rounded' required />
                        <textarea placeholder='Write Profile Bio . . .' className='bg-transparent p-2 border border-black rounded' required></textarea>
                        <button type='submit' className='btn btn-outline-light py-2'>Save</button>
                    </form>
                    {image ? (
                        <><img
                            src={URL.createObjectURL(image)}
                            alt="Profile"
                            className="w-44 h-44 sm:w-72 sm:h-72 mt-4 object-cover rounded-full"
                        /></>
                    ) : (
                        <>
                            <SiImessage className='profile_pic w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 text-gray-500 mt-6 lg:mt-0' />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProfileUpdate;
