import React from 'react'
import assets from '../assets/assets'
import { logout } from '../config/firebase'

const RightSideBar = () => {
    return (
        <>
            <div className='rs flex flex-col items-center bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white h-[88.2vh] p-2 sm:p-4 space-y-4 border-l border-black relative overflow-y-scroll scrollbar-thin'>
                <div className="rs-profile flex flex-col items-center text-center">
                    <img src={assets.profile_img} alt="Profile_Image" className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-2 sm:mb-3" />
                    <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">Chris Taylor<span className="w-2 h-2 bg-green-500 rounded-full"></span></h3>
                    <p className="text-gray-400 text-xs sm:text-sm">Hey, I am Chris Taylor using Talk Flow.</p>
                </div>
                <hr className="w-full border-gray-400" />
                <div className="rs-media w-full">
                    <p className="text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3">Media :</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <img src={assets.pic1} alt="Media_Image" className="w-full h-[60px] sm:h-[80px] rounded-lg object-cover hover:border cursor-pointer" />
                        <img src={assets.pic2} alt="Media_Image" className="w-full h-[60px] sm:h-[80px] rounded-lg object-cover hover:border cursor-pointer" />
                        <img src={assets.pic3} alt="Media_Image" className="w-full h-[60px] sm:h-[80px] rounded-lg object-cover hover:border cursor-pointer" />
                        <img src={assets.pic4} alt="Media_Image" className="w-full h-[60px] sm:h-[80px] rounded-lg object-cover hover:border cursor-pointer" />
                        <img src={assets.pic5} alt="Media_Image" className="w-full h-[60px] sm:h-[80px] rounded-lg object-cover hover:border cursor-pointer" />
                        <img src={assets.pic6} alt="Media_Image" className="w-full h-[60px] sm:h-[80px] rounded-lg object-cover hover:border cursor-pointer" />
                    </div>
                </div>
                <button onClick={() => logout()} className='btn btn-outline-dark text-white border px-3 sm:px-4 py-1 rounded-lg absolute bottom-3 sm:bottom-5'>Log-Out</button>
            </div>
        </>
    )
}

export default RightSideBar
