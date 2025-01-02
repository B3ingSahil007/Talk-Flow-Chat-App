import React, { useContext, useEffect, useState } from 'react'
// import assets from '../assets/assets'
import { logout } from '../config/firebase'
import { AppContext } from '../context/AppContext'

const RightSideBar = () => {
    const { chatUser, messages, msgImages, setMsgImages, chatVisible, setChatVisible } = useContext(AppContext)

    return chatUser ? (
        <>
            <div className={`rs flex flex-col items-center bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white h-[89vh] sm:h-[88.5vh] p-2 sm:p-4 space-y-4 border-l border-black relative overflow-y-scroll scrollbar-thin ${chatVisible ? "block" : "hidden"} lg:block sm:hidden`}>
                <div className='flex flex-col justify-center items-center'>
                    <div className="rs-profile flex flex-col items-center text-center">
                        <img src={chatUser.userData.avatar} alt="Profile_Image" className="w-24 h-24 sm:w-24 sm:h-24 rounded-full mb-2 sm:mb-3 mt-2 sm:mt-3" />
                        <h3 className="text-lg sm:text-lg font-semibold flex items-center gap-2">{Date.now() - chatUser.userData.lastSeen <= 70000 ? <span className="w-2 h-2 bg-green-500 rounded-full "></span> : null}{chatUser.userData.name}</h3>
                        <p className="text-gray-400 text-sm sm:text-sm">{chatUser.userData.bio}</p>
                    </div>
                    <hr className="w-full border-gray-400 mt-2" />
                    <div className="rs-media w-full p-2">
                        <p className="text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3">Media :</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {msgImages && msgImages.map((url, index) => (
                                    <img onClick={() => window.open(url)} src={url} key={index} alt="Media_Image" className="w-full h-[60px] sm:h-[80px] rounded-lg object-cover hover:border cursor-pointer" />
                            ))}
                            {/* <img src={assets.pic1} alt="Media_Image" className="w-full h-[60px] sm:h-[80px] rounded-lg object-cover hover:border cursor-pointer" />
                        <img src={assets.pic2} alt="Media_Image" className="w-full h-[60px] sm:h-[80px] rounded-lg object-cover hover:border cursor-pointer" />
                        <img src={assets.pic3} alt="Media_Image" className="w-full h-[60px] sm:h-[80px] rounded-lg object-cover hover:border cursor-pointer" />
                        <img src={assets.pic4} alt="Media_Image" className="w-full h-[60px] sm:h-[80px] rounded-lg object-cover hover:border cursor-pointer" />
                        <img src={assets.pic5} alt="Media_Image" className="w-full h-[60px] sm:h-[80px] rounded-lg object-cover hover:border cursor-pointer" />
                        <img src={assets.pic6} alt="Media_Image" className="w-full h-[60px] sm:h-[80px] rounded-lg object-cover hover:border cursor-pointer" /> */}
                        </div>
                    </div>
                    <button onClick={() => logout()} className='btn btn-outline-light border px-3 sm:px-4 py-1 rounded-lg absolute bottom-3 sm:bottom-5'>Log-Out</button>
                </div>
            </div>
        </>
    ) : (
        <>
            <div className='rs sm:flex hidden flex-col items-center justify-center text-center h-[20vh] sm:h-[88.5vh] bg-gradient-to-b from-gray-800 via-gray-900 to-black border-l border-black'>
                <button onClick={() => logout()} className='btn btn-outline-light border px-3 sm:px-4 py-1 rounded-lg absolute'>Log-Out</button>
            </div>
        </>
    )
}

export default RightSideBar