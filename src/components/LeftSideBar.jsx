import React from 'react'
import assets from '../assets/assets'
import { CiMenuKebab } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";

const LeftSideBar = () => {

    return (
        <>
            <div className="ls bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white h-[86.3vh]">
                <div className="ls-top p-[10px] h-full flex flex-col">
                    <div className="ls-nav flex justify-between items-center">
                        <div className="flex items-center w-full">
                            <div className="ls-search bg-gray-700 flex items-center gap-2 px-2 py-2 mx-0 rounded w-full">
                                <IoMdSearch className="text-2xl" />
                                <input type="text" className="bg-transparent border-none outline-none text-[15px] w-full" placeholder="Search Here . . ." />
                            </div>
                            <div className="menu ml-7 relative p-2 group">
                                <CiMenuKebab className="cursor-pointer text-2xl" />
                                <div className='sub-menu absolute top-[100%] right-0 w-[140px] p-[10px] bg-gray-500 text-black rounded hidden group-hover:block'>
                                    <p className='hover:text-gray-200 cursor-pointer'>Edit Profile</p>
                                    <hr className='border-none h-[1px] bg-black' />
                                    <p className='hover:text-gray-200 cursor-pointer'>Log Out</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ls-list flex flex-col overflow-y-auto mt-3">
                        {Array(12).fill("").map((item, index) => (
                            <div key={index} className="friends group flex items-center gap-3 px-3 py-2 cursor-pointer text-sm hover:bg-gray-600 rounded-lg" >
                                <img src={assets.profile_img} className="logo w-10 aspect-[1/1] rounded-full" alt="Profile Icon" />
                                <div className="flex flex-col">
                                    <p>Chris Taylor</p>
                                    <span className="text-xs text-gray-500 group-hover:text-gray-400">
                                        Hello, How Are You?
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
