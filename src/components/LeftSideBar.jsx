import React from 'react'
import assets from '../assets/assets'

const LeftSideBar = () => {
    return (
        <>
            <div className="ls bg-[#001030] text-white h-[75vh]">
                <ls className="ls-top p-[20px]">
                    <div className="ls-nav flex justify-between items-center">
                        <img className="logo w-[100px] w-max-[140px]" src={assets.logo_icon} alt="Logo_Image" />
                        <p className='text-3xl -ml-16'>Talk Flow</p>
                        <div className="menu self-start">
                            <img src={assets.menu_icon} className='h-[25px] opacity-[0.6] cursor-pointer' alt="Menu_Icon_Image" />
                        </div>
                    </div>
                    <div className="ls-search">
                        <img src={assets.search_icon} className='logo' alt="Search_Icon_Image" />
                        <input type="text" placeholder='Search Here . . .' />
                    </div>
                    <div className="ls-list">
                        <div className="friends">
                            <img src={assets.profile_img} className='logo' alt="Profile_Icon_Image" />
                            <div>
                                <p>Sahil</p>
                                <span>Hello, How Are You</span>
                                <p>Rizwana</p>
                                <span>Hello, How Are You</span>
                            </div>
                        </div>
                    </div>
                </ls>
            </div>
        </>
    )
}

export default LeftSideBar
