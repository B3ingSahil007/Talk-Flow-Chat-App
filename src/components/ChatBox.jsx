import React from 'react'
import assets from '../assets/assets'
import { CiImageOn } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";

const ChatBox = () => {
    return (
        <>
            <div className="chat-box h-[86.3vh] relative bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white border-l border-black">
                <div className="chat-user flex items-center gap-[10px] py-3 px-[15px] border-b border-black">
                    <img src={assets.profile_img} alt="Profile_Image" className='first:w-[38px] first:aspect-[1/1] rounded-full' />
                    {/* <p>Chris Taylor <img src={assets.green_dot} alt="" /></p> */}
                    <p className='flex-1 font-bold text-lg text-gray-600 flex items-center gap-2'>Chris Taylor <span className="w-2 h-2 bg-green-500 rounded-full "></span></p>
                    <img src={assets.help_icon} className='help w-8' alt="" />
                </div>
                <div className="chat-message space-y-2 flex flex-col-reverse h-[calc(100%-70px)] pb-[50px] overflow-y-auto scrollbar-thin">
                    {/* Sender Message */}
                    <div className="sender-message flex items-end gap-2 justify-end mr-2">
                        <div className="bg-gray-700 text-white p-2 rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px] max-w-[60%]">
                            <p className="message text-sm">{`Lorem ipsum dolor sit amet consectetur.`}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <p>11:32</p>
                        </div>
                    </div>

                    <div className="sender-message flex items-end gap-2 justify-end mr-2 mb-2 ">
                        <div className="bg-gray-700 text-white p-1 rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px] max-w-[60%]">
                            {/* <img className='message-image' src={assets.pic1} alt="Sender_Image" />
                            <img className='message-image' src={assets.pic2} alt="Sender_Image" />
                            <img className='message-image' src={assets.pic3} alt="Sender_Image" />
                            <img className='message-image' src={assets.pic4} alt="Sender_Image" />
                            <img className='message-image' src={assets.pic5} alt="Sender_Image" /> */}
                            <img className='message-image w-[230px] w-max-[230px] mb-[5px]' src={assets.pic6} alt="Sender_Image" />
                            <p className="text-gray-500 text-sm italic">Photo by @ChrisTaylor</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <p>11:32</p>
                        </div>
                    </div>
                    {/* Receiver Message */}
                    <div className="recever-message flex items-end gap-2 ml-2">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <p>11:30</p>
                        </div>
                        <div className="bg-gray-500 text-black p-2 rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] max-w-[60%]">
                            <p className="message text-sm">{`Lorem ipsum dolor sit amet consectetur.`}</p>
                        </div>
                    </div>
                </div>
                <div className="chat-input flex items-center gap-3 px-[10px] py-[10px] bg-gray-700 absolute bottom-0 left-0 right-0">
                    <input type="text" placeholder='Write Message . . .' className='bg-transparent flex-1 border-none outline-none' />
                    <input type="file" id='image' accept='image/png, image/jpeg, image/jpg' className='flex-1 border-none outline-none' hidden />
                    <label htmlFor="image" className='flex'>
                        <CiImageOn className='text-2xl cursor-pointer text-gray-400 hover:text-gray-900' />
                    </label>
                    <IoIosSend className='text-2xl cursor-pointer text-gray-400 hover:text-gray-900' />
                </div>
            </div>
        </>
    )
}

export default ChatBox
